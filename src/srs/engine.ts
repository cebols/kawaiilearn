import { fsrs, generatorParameters, createEmptyCard, Rating, State, type Grade } from "ts-fsrs";
import db, { getKV, setKV, type StoredCard } from "../db/db";
import type { Skill } from "../types";

/** FSRS: o estado da arte em spaced repetition (mesmo algoritmo do Anki moderno). */
const scheduler = fsrs(generatorParameters({ enable_fuzz: true }));

export { Rating };

/** Limite DIÁRIO de cards novos (não por sessão — recarregar não libera mais). */
export const NEW_PER_DAY = 10;

export function cardId(deck: string, itemId: string, skill: Skill): string {
  return `${deck}:${itemId}:${skill}`;
}

/** Garante que todos os itens de um deck existem como cards no banco. */
export async function ensureDeck(deck: string, itemIds: string[], skill: Skill): Promise<void> {
  const now = Date.now();
  const existing = new Set(await db.cards.where("deck").equals(deck).primaryKeys());
  const missing = itemIds
    .filter((itemId) => !existing.has(cardId(deck, itemId, skill)))
    .map((itemId, i) => ({
      id: cardId(deck, itemId, skill),
      deck,
      itemId,
      skill,
      fsrs: createEmptyCard(new Date(now)),
      // preserva a ordem pedagógica do deck (gojūon, não alfabética)
      addedAt: now + i,
    }));
  // corrida benigna (ex.: StrictMode monta 2x): duplicatas são ignoradas
  if (missing.length) await db.cards.bulkAdd(missing).catch(() => {});
}

function todayKey(): string {
  return new Date().toDateString();
}

/** Quantos cards novos ainda cabem hoje. */
export async function newQuotaToday(): Promise<number> {
  const date = await getKV("introDate");
  if (date !== todayKey()) return NEW_PER_DAY;
  const count = Number((await getKV("introCount")) ?? 0);
  return Math.max(0, NEW_PER_DAY - count);
}

async function bumpIntroCount(): Promise<void> {
  const date = await getKV("introDate");
  const count = date === todayKey() ? Number((await getKV("introCount")) ?? 0) : 0;
  await setKV("introDate", todayKey());
  await setKV("introCount", String(count + 1));
}

/** Card em fase de aprendizado (passos curtos) — entra na fila mesmo com due no futuro próximo. */
function isLearning(c: StoredCard): boolean {
  return c.fsrs.state === State.Learning || c.fsrs.state === State.Relearning;
}

/** Fila da sessão: vencidos/aprendendo primeiro (anti-avalanche), depois novos até a cota do dia. */
export async function buildQueue(deck: string, skill: Skill): Promise<StoredCard[]> {
  const all = (await db.cards.where("deck").equals(deck).toArray()).filter((c) => c.skill === skill);
  const now = new Date();
  const due = all
    .filter((c) => c.fsrs.state !== State.New && (new Date(c.fsrs.due) <= now || isLearning(c)))
    .sort((a, b) => new Date(a.fsrs.due).getTime() - new Date(b.fsrs.due).getTime());
  const quota = await newQuotaToday();
  const fresh = all
    .filter((c) => c.fsrs.state === State.New)
    .sort((a, b) => a.addedAt - b.addedAt)
    .slice(0, quota);
  return [...due, ...fresh];
}

/** Aplica a avaliação do usuário e persiste o novo agendamento. */
export async function review(card: StoredCard, rating: Grade): Promise<StoredCard> {
  const wasNew = card.fsrs.state === State.New;
  const { card: next } = scheduler.next(card.fsrs, new Date(), rating);
  const updated = { ...card, fsrs: next };
  await db.cards.put(updated);
  await db.reviews.add({ cardId: card.id, rating, reviewedAt: Date.now() });
  if (wasNew) await bumpIntroCount();
  return updated;
}

export interface DeckStats {
  due: number;
  fresh: number;
  learning: number;
  mastered: number;
  total: number;
}

export async function deckStats(deck?: string): Promise<DeckStats> {
  const all = deck ? await db.cards.where("deck").equals(deck).toArray() : await db.cards.toArray();
  const now = new Date();
  let due = 0,
    fresh = 0,
    learning = 0,
    mastered = 0;
  for (const c of all) {
    const isMastered = c.fsrs.state === State.Review && c.fsrs.stability > 21;
    if (c.fsrs.state === State.New) fresh++;
    else if (new Date(c.fsrs.due) <= now || isLearning(c)) due++;
    if (isMastered) mastered++;
    else if (c.fsrs.state !== State.New) learning++;
  }
  const quota = await newQuotaToday();
  return { due, fresh: Math.min(fresh, quota), learning, mastered, total: all.length };
}

/** Streak: dias consecutivos com pelo menos uma revisão. */
export async function computeStreak(): Promise<number> {
  const reviews = await db.reviews.orderBy("reviewedAt").reverse().limit(2000).toArray();
  const days = new Set(reviews.map((r) => new Date(r.reviewedAt).toDateString()));
  let streak = 0;
  const cursor = new Date();
  if (!days.has(cursor.toDateString())) cursor.setDate(cursor.getDate() - 1);
  while (days.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
