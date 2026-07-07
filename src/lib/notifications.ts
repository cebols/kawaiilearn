import { getKV, setKV } from "../db/db";
import { NUDGES, type Nudge } from "../content/nudges";

/**
 * Sistema de nudges do KawaiiLearn. Estratégia:
 * 1. Ao ativar (ou abrir o app), planeja até MAX_PER_DAY nudges para HOJE.
 * 2. Enquanto a aba está aberta, `setTimeout` dispara na hora certa.
 * 3. Ao (re)abrir o app, primeiro dispara os que estão atrasados
 *    (catch-up); depois arma o próximo timer.
 * 4. Cooldown: um mesmo template não repete em <5 dias.
 * 5. "Não perturbe": nada antes das 7h ou depois das 22h.
 */

const MAX_PER_DAY = 2;
const QUIET_START = 22;
const QUIET_END = 7;
const COOLDOWN_DAYS = 5;
const KEY_PLAN = "nudgePlan";
const KEY_SENT = "nudgeSent";
const KEY_COOLDOWN = "nudgeCooldown";
const KEY_ENABLED = "nudgesEnabled";

interface PlannedNudge {
  templateIdx: number;
  at: number; // epoch ms
}

interface Plan {
  date: string; // toDateString()
  items: PlannedNudge[];
}

interface SentRecord {
  date: string;
  templateIdxs: number[];
}

type Cooldown = Record<number, number>; // templateIdx -> last sent day (yyyyMMdd)

function today(): string {
  return new Date().toDateString();
}
function dayNum(d = new Date()): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

export function notificationsSupported(): boolean {
  return typeof Notification !== "undefined" && "serviceWorker" in navigator;
}

export function permissionState(): NotificationPermission | "unsupported" {
  if (!notificationsSupported()) return "unsupported";
  return Notification.permission;
}

async function getSW(): Promise<ServiceWorkerRegistration | null> {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return await navigator.serviceWorker.ready;
  } catch {
    return null;
  }
}

async function loadCooldown(): Promise<Cooldown> {
  const raw = await getKV(KEY_COOLDOWN);
  return raw ? (JSON.parse(raw) as Cooldown) : {};
}

/** Elegível: dentro da janela do dia, respeita quiet hours e dias úteis. */
function eligibleAt(template: Nudge, when: Date): boolean {
  const h = when.getHours();
  if (h < QUIET_END || h >= QUIET_START) return false;
  if (template.weekdaysOnly && (when.getDay() === 0 || when.getDay() === 6)) return false;
  const [start, end] = template.window;
  return h >= start && h < end;
}

/** Sorteia um horário dentro da janela do template, hoje. */
function pickTimeInWindow(template: Nudge): number {
  const now = new Date();
  const [start, end] = template.window;
  const hour = Math.max(start, Math.min(end - 1, start + Math.floor(Math.random() * Math.max(1, end - start))));
  const minute = Math.floor(Math.random() * 60);
  const at = new Date(now);
  at.setHours(hour, minute, 0, 0);
  return at.getTime();
}

/** Planeja os nudges de hoje (não substitui se já existir plano do dia). */
async function planToday(): Promise<Plan> {
  const raw = await getKV(KEY_PLAN);
  const existing = raw ? (JSON.parse(raw) as Plan) : null;
  if (existing && existing.date === today()) return existing;

  const cooldown = await loadCooldown();
  const now = new Date();
  const currentDay = dayNum(now);

  // filtra templates fora do cooldown, embaralha, pega até MAX_PER_DAY variando personagem
  const usableIdx = NUDGES.map((_, i) => i).filter((i) => {
    const last = cooldown[i];
    return !last || currentDay - last >= COOLDOWN_DAYS;
  });
  // shuffle simples
  for (let i = usableIdx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [usableIdx[i], usableIdx[j]] = [usableIdx[j], usableIdx[i]];
  }
  const chosen: PlannedNudge[] = [];
  const seenChars = new Set<string>();
  for (const idx of usableIdx) {
    if (chosen.length >= MAX_PER_DAY) break;
    const t = NUDGES[idx];
    if (seenChars.has(t.who)) continue; // um personagem só por dia
    // janela precisa ainda estar por acontecer OU em curso
    const at = pickTimeInWindow(t);
    if (at + 15 * 60_000 < Date.now()) continue; // já passou faz muito tempo
    seenChars.add(t.who);
    chosen.push({ templateIdx: idx, at });
  }
  chosen.sort((a, b) => a.at - b.at);
  const plan: Plan = { date: today(), items: chosen };
  await setKV(KEY_PLAN, JSON.stringify(plan));
  return plan;
}

async function markSent(templateIdx: number): Promise<void> {
  const rawSent = await getKV(KEY_SENT);
  const sent: SentRecord = rawSent ? JSON.parse(rawSent) : { date: today(), templateIdxs: [] };
  if (sent.date !== today()) {
    sent.date = today();
    sent.templateIdxs = [];
  }
  if (!sent.templateIdxs.includes(templateIdx)) sent.templateIdxs.push(templateIdx);
  await setKV(KEY_SENT, JSON.stringify(sent));

  const cooldown = await loadCooldown();
  cooldown[templateIdx] = dayNum();
  await setKV(KEY_COOLDOWN, JSON.stringify(cooldown));
}

async function isSent(templateIdx: number): Promise<boolean> {
  const raw = await getKV(KEY_SENT);
  if (!raw) return false;
  const sent = JSON.parse(raw) as SentRecord;
  return sent.date === today() && sent.templateIdxs.includes(templateIdx);
}

async function fireNudge(idx: number): Promise<void> {
  if (Notification.permission !== "granted") return;
  if (await isSent(idx)) return;
  const t = NUDGES[idx];
  if (!eligibleAt(t, new Date())) return;
  const sw = await getSW();
  if (!sw || !sw.active) return;
  const url = `/kawaiilearn/?dialogue=${encodeURIComponent(t.dialogueId)}`;
  sw.active.postMessage({
    type: "notify",
    title: `${t.jp}`,
    body: t.body[navigator.language.startsWith("pt") ? "pt" : "en"],
    tag: `kawaii-${idx}`,
    url,
  });
  await markSent(idx);
}

let armedTimer: ReturnType<typeof setTimeout> | null = null;

/** Dispara o próximo nudge quando chegar a hora, e re-arma pro seguinte. */
async function armNext(): Promise<void> {
  if (armedTimer) {
    clearTimeout(armedTimer);
    armedTimer = null;
  }
  if (Notification.permission !== "granted") return;

  const plan = await planToday();
  const now = Date.now();
  const upcoming = plan.items.filter((i) => i.at > now);
  if (upcoming.length === 0) return;
  const next = upcoming[0];
  const wait = Math.max(500, next.at - now);
  armedTimer = setTimeout(async () => {
    await fireNudge(next.templateIdx);
    void armNext();
  }, wait);
}

/** Ao abrir o app: dispara os que já deviam ter saído e re-arma o próximo. */
export async function catchUpAndArm(): Promise<void> {
  if (!notificationsSupported()) return;
  if (Notification.permission !== "granted") return;
  if ((await getKV(KEY_ENABLED)) !== "1") return;

  const plan = await planToday();
  const now = Date.now();
  const overdue = plan.items.filter((i) => i.at <= now && i.at > now - 4 * 3600_000);
  for (const item of overdue) {
    // só dispara se ainda estiver na janela do personagem
    const t = NUDGES[item.templateIdx];
    if (eligibleAt(t, new Date())) await fireNudge(item.templateIdx);
  }
  void armNext();
}

/** Botão "ativar notificações" chama isto. */
export async function enableNotifications(): Promise<NotificationPermission> {
  if (!notificationsSupported()) return "denied";
  try {
    await navigator.serviceWorker.register(new URL("/kawaiilearn/sw.js", location.origin).pathname);
  } catch {
    // ignora — o browser pode ter cacheado uma versão anterior
  }
  const result = await Notification.requestPermission();
  if (result === "granted") {
    await setKV(KEY_ENABLED, "1");
    void catchUpAndArm();
  }
  return result;
}

export async function isEnabled(): Promise<boolean> {
  return (await getKV(KEY_ENABLED)) === "1" && permissionState() === "granted";
}

/** Envia um nudge de amostra pra confirmar que está funcionando. */
export async function fireSample(): Promise<void> {
  if (Notification.permission !== "granted") return;
  const sw = await getSW();
  if (!sw || !sw.active) return;
  const sample = NUDGES[Math.floor(Math.random() * NUDGES.length)];
  sw.active.postMessage({
    type: "notify",
    title: sample.jp,
    body: sample.body[navigator.language.startsWith("pt") ? "pt" : "en"],
    tag: "kawaii-sample",
    url: `/kawaiilearn/?dialogue=${encodeURIComponent(sample.dialogueId)}`,
  });
}
