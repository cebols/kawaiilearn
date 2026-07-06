import { getKV, setKV } from "../db/db";

/** Contagem de atividades do dia — reseta sozinho na virada (chave por data). */
export interface DailyProgress {
  cards: number;
  convos: number;
  sentences: number;
}

/** Meta diária mínima para ficar "on par" com o currículo do dia. */
export const DAILY_GOAL: DailyProgress = { cards: 15, convos: 1, sentences: 3 };

const keyFor = () => `daily:${new Date().toDateString()}`;

export async function getDaily(): Promise<DailyProgress> {
  const raw = await getKV(keyFor());
  return raw ? (JSON.parse(raw) as DailyProgress) : { cards: 0, convos: 0, sentences: 0 };
}

// Persistência serializada: várias atividades em sequência rápida não se
// atropelam (evita read-modify-write concorrente perdendo incrementos).
let chain: Promise<void> = Promise.resolve();
export function persistDaily(d: DailyProgress): Promise<void> {
  chain = chain.then(() => setKV(keyFor(), JSON.stringify(d)));
  return chain;
}

/** 0–100: quão perto a pessoa está de cumprir a meta do dia (média das três trilhas). */
export function dailyPercent(d: DailyProgress): number {
  const parts = [
    Math.min(d.cards / DAILY_GOAL.cards, 1),
    Math.min(d.convos / DAILY_GOAL.convos, 1),
    Math.min(d.sentences / DAILY_GOAL.sentences, 1),
  ];
  return Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100);
}
