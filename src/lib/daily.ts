import { getKV, setKV } from "../db/db";
import { sentencesForWeek } from "../content/sentences";
import { DIALOGUES } from "../content/dialogues";

/** Contagem de atividades do dia — reseta sozinho na virada (chave por data). */
export interface DailyProgress {
  cards: number;
  convos: number;
  sentences: number;
}

/**
 * Meta diária derivada da semana sugerida do currículo: só cobra as
 * atividades que EXISTEM naquela semana (semana 1 não tem "montar frases").
 */
export function goalForWeek(week: number): DailyProgress {
  return {
    cards: 15,
    convos: DIALOGUES.some((d) => d.week <= week) ? 1 : 0,
    sentences: sentencesForWeek(week).length > 0 ? 3 : 0,
  };
}

const keyFor = () => `daily:${new Date().toDateString()}`;

export async function getDaily(): Promise<DailyProgress> {
  const raw = await getKV(keyFor());
  return raw ? (JSON.parse(raw) as DailyProgress) : { cards: 0, convos: 0, sentences: 0 };
}

// Persistência serializada: várias atividades em sequência rápida não se
// atropelam (evita read-modify-write concorrente perdendo incrementos).
// O catch mantém a corrente viva mesmo se uma escrita falhar.
let chain: Promise<void> = Promise.resolve();
export function persistDaily(d: DailyProgress): Promise<void> {
  chain = chain.then(() => setKV(keyFor(), JSON.stringify(d))).catch(() => {});
  return chain;
}

/** 0–100: quão perto a pessoa está da meta do dia (só trilhas com meta > 0). */
export function dailyPercent(d: DailyProgress, goal: DailyProgress): number {
  const parts: number[] = [];
  for (const k of ["cards", "convos", "sentences"] as const) {
    if (goal[k] > 0) parts.push(Math.min(d[k] / goal[k], 1));
  }
  if (parts.length === 0) return 100;
  return Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100);
}
