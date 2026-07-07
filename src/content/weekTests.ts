import type { L10n } from "../types";
import { HIRAGANA } from "./hiragana";
import { KATAKANA } from "./katakana";
import { DAKUTEN_HIRA, DAKUTEN_KATA } from "./dakuten";
import { sentencesForWeek } from "./sentences";
import { DIALOGUES } from "./dialogues";

/**
 * Testes de passagem de semana. Rigorosos: 100% para avançar.
 * Cada teste é montado a partir do conteúdo REAL da semana em curso,
 * evitando decorar respostas — mistura kana/leitura, montagem de frase
 * e mapeamento polido⇄casual.
 */

export type Question =
  | { kind: "kana"; prompt: string; options: string[]; answer: string; hint?: L10n }
  | { kind: "sentence"; prompt: L10n; tiles: string[]; answer: string[] }
  | { kind: "register"; prompt: L10n; source: string; direction: "toCasual" | "toPolite"; options: string[]; answer: string };

export interface WeekTest {
  week: number;
  title: L10n;
  questions: Question[];
}

/** RNG determinístico por seed (mesmo teste toda hora, mas embaralhado). */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
}
function shuffled<T>(arr: T[], rnd: () => number): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pick<T>(arr: T[], n: number, rnd: () => number): T[] {
  return shuffled(arr, rnd).slice(0, n);
}

/** Kana esperados por semana. */
function kanaSetForWeek(week: number) {
  if (week === 1) return HIRAGANA;
  if (week === 2) return [...HIRAGANA, ...KATAKANA];
  // a partir da 3, cobra hiragana + katakana (com sonoros a partir da 4)
  if (week >= 4) return [...HIRAGANA, ...KATAKANA, ...DAKUTEN_HIRA, ...DAKUTEN_KATA];
  return [...HIRAGANA, ...KATAKANA];
}

function kanaQuestions(week: number, rnd: () => number, count: number): Question[] {
  const set = kanaSetForWeek(week);
  const chosen = pick(set, count, rnd);
  return chosen.map((k) => {
    const distractors = pick(
      set.filter((x) => x.romaji !== k.romaji),
      3,
      rnd
    ).map((d) => d.romaji);
    const options = shuffled([k.romaji, ...distractors], rnd);
    return { kind: "kana" as const, prompt: k.kana, options, answer: k.romaji };
  });
}

function sentenceQuestions(week: number, rnd: () => number, count: number): Question[] {
  const items = sentencesForWeek(week);
  const chosen = pick(items, Math.min(count, items.length), rnd);
  return chosen.map((s) => ({
    kind: "sentence" as const,
    prompt: s.translation,
    tiles: shuffled(s.tiles, rnd),
    answer: s.tiles,
  }));
}

/** Pares polido⇄casual tirados dos diálogos até esta semana. */
function registerQuestions(week: number, rnd: () => number, count: number): Question[] {
  const pairs: { polite: string; casual: string }[] = [];
  for (const d of DIALOGUES.filter((d) => d.week <= week)) {
    for (const line of d.lines) {
      if (line.polite && line.casual && line.polite !== line.casual) {
        pairs.push({ polite: line.polite, casual: line.casual });
      }
      if (line.choices) {
        for (const c of line.choices) {
          if (c.polite && c.casual && c.polite !== c.casual) {
            pairs.push({ polite: c.polite, casual: c.casual });
          }
        }
      }
    }
  }
  if (pairs.length === 0) return [];
  const chosen = pick(pairs, Math.min(count, pairs.length), rnd);
  return chosen.map((p) => {
    // metade converte polido→casual, metade o inverso
    const toCasual = rnd() > 0.5;
    const source = toCasual ? p.polite : p.casual;
    const answer = toCasual ? p.casual : p.polite;
    // distratores: outras 3 formas do mesmo lado
    const pool = pairs.filter((q) => q !== p).map((q) => (toCasual ? q.casual : q.polite));
    const distractors = pick(pool, 3, rnd);
    return {
      kind: "register" as const,
      prompt: toCasual
        ? { pt: "Deixe esta fala mais casual:", en: "Make this line more casual:" }
        : { pt: "Deixe esta fala mais polida:", en: "Make this line more polite:" },
      source,
      direction: toCasual ? "toCasual" : "toPolite",
      options: shuffled([answer, ...distractors], rnd),
      answer,
    };
  });
}

/** Monta o teste da semana: kana + frase + registro (variando por semana). */
export function testForWeek(week: number, seed = String(week)): WeekTest {
  const rnd = seeded(seed);
  const questions: Question[] = [];

  // Semana 1–2: peso em kana (leitura)
  // Semana 3+: kana + frase
  // Semana 4+ (diálogos maduros): kana + frase + registro
  if (week <= 2) {
    questions.push(...kanaQuestions(week, rnd, 6));
    const reg = registerQuestions(week, rnd, 2);
    questions.push(...reg);
  } else if (week === 3) {
    questions.push(...kanaQuestions(week, rnd, 4));
    questions.push(...sentenceQuestions(week, rnd, 3));
    questions.push(...registerQuestions(week, rnd, 2));
  } else {
    questions.push(...kanaQuestions(week, rnd, 3));
    questions.push(...sentenceQuestions(week, rnd, 3));
    questions.push(...registerQuestions(week, rnd, 3));
  }

  return {
    week,
    title: { pt: `Teste da semana ${week}`, en: `Week ${week} test` },
    questions,
  };
}

/** Se a semana tem material suficiente para um teste válido. */
export function testAvailable(week: number): boolean {
  return testForWeek(week).questions.length >= 5;
}
