import type { L10n } from "../types";
import { HIRAGANA } from "./hiragana";
import { KATAKANA } from "./katakana";
import { DAKUTEN_HIRA, DAKUTEN_KATA } from "./dakuten";
import { sentencesForWeek } from "./sentences";
import { DIALOGUES } from "./dialogues";

/**
 * Testes de passagem de semana. Rigorosos: 100% para avançar.
 * Regra pedagógica: o teste da semana N SÓ pode cobrar o que foi ENSINADO
 * até a semana N. Semana 1–2 = apenas kana. Frases só a partir da semana 3
 * (depois das lições de partículas). Transformação polido⇄casual só a partir
 * da 4 (depois de ver ます/です). Kanji nas questões só a partir da 7.
 */

export type Question =
  | { kind: "kana"; prompt: string; options: string[]; answer: string }
  | { kind: "kana2r"; prompt: string; options: string[]; answer: string; direction: "kanaToRomaji" | "romajiToKana" }
  | { kind: "sentence"; prompt: L10n; tiles: string[]; answer: string[] }
  | { kind: "register"; prompt: L10n; source: string; direction: "toCasual" | "toPolite"; options: string[]; answer: string };

export interface WeekTest {
  week: number;
  title: L10n;
  questions: Question[];
}

/** RNG determinístico por seed. */
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

/** Pares visualmente confundíveis — bons distratores em kana. */
const CONFUSING = new Map<string, string[]>([
  ["ぬ", ["め", "ね", "の"]],
  ["め", ["ぬ", "ゆ", "の"]],
  ["は", ["ほ", "ま", "は"]],
  ["ほ", ["は", "ま", "ば"]],
  ["ね", ["れ", "わ", "ぬ"]],
  ["れ", ["ね", "わ", "を"]],
  ["わ", ["ね", "れ", "ろ"]],
  ["ろ", ["る", "わ", "ら"]],
  ["る", ["ろ", "ら", "り"]],
  ["さ", ["ち", "き", "ら"]],
  ["ち", ["さ", "ら", "き"]],
  ["シ", ["ツ", "ソ", "ン"]],
  ["ツ", ["シ", "ソ", "ン"]],
  ["ソ", ["ン", "シ", "ノ"]],
  ["ン", ["ソ", "シ", "ノ"]],
  ["ク", ["ワ", "ケ", "ラ"]],
  ["ワ", ["ク", "ウ", "ラ"]],
]);

function pickDistractors<T extends { kana: string; romaji: string }>(target: T, pool: T[], rnd: () => number): T[] {
  const preferred = CONFUSING.get(target.kana);
  if (preferred) {
    const found = preferred.map((k) => pool.find((p) => p.kana === k)).filter((x): x is T => !!x);
    const remaining = pool.filter((p) => p.romaji !== target.romaji && !found.includes(p));
    const extra = pick(remaining, Math.max(0, 3 - found.length), rnd);
    return [...found.slice(0, 3), ...extra].slice(0, 3);
  }
  return pick(
    pool.filter((p) => p.romaji !== target.romaji),
    3,
    rnd
  );
}

/** Kana esperados por semana (a curva sobe kana básico → +katakana → +sonoros). */
function kanaSetForWeek(week: number) {
  if (week === 1) return HIRAGANA;
  if (week === 2) return [...HIRAGANA, ...KATAKANA];
  if (week === 3) return [...HIRAGANA, ...KATAKANA];
  return [...HIRAGANA, ...KATAKANA, ...DAKUTEN_HIRA, ...DAKUTEN_KATA];
}

/** Questão kana → romaji com distratores próximos. */
function qKanaToRomaji(target: { kana: string; romaji: string }, pool: { kana: string; romaji: string }[], rnd: () => number): Question {
  const distractors = pickDistractors(target, pool, rnd).map((d) => d.romaji);
  return {
    kind: "kana",
    prompt: target.kana,
    options: shuffled([target.romaji, ...distractors], rnd),
    answer: target.romaji,
  };
}

/** Questão romaji → kana com distratores visualmente próximos. */
function qRomajiToKana(target: { kana: string; romaji: string }, pool: { kana: string; romaji: string }[], rnd: () => number): Question {
  const distractors = pickDistractors(target, pool, rnd).map((d) => d.kana);
  return {
    kind: "kana2r",
    prompt: target.romaji,
    options: shuffled([target.kana, ...distractors], rnd),
    answer: target.kana,
    direction: "romajiToKana",
  };
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

/** Pares polido⇄casual — SÓ pares curtos e sem kanji (mesma frase base, só o final muda). */
function registerQuestions(week: number, rnd: () => number, count: number): Question[] {
  const pairs: { polite: string; casual: string }[] = [];
  for (const d of DIALOGUES.filter((d) => d.week <= week)) {
    for (const line of d.lines) {
      // filtra pares longos ou com kanji — semana 4-6 só deve cobrar transformação limpa
      const short = (s: string) => s.length <= 12 && !/[一-龯]/.test(s);
      if (line.polite && line.casual && line.polite !== line.casual && short(line.polite) && short(line.casual)) {
        pairs.push({ polite: line.polite, casual: line.casual });
      }
      if (line.choices) {
        for (const c of line.choices) {
          if (c.polite && c.casual && c.polite !== c.casual && short(c.polite) && short(c.casual)) {
            pairs.push({ polite: c.polite, casual: c.casual });
          }
        }
      }
    }
  }
  if (pairs.length === 0) return [];
  const chosen = pick(pairs, Math.min(count, pairs.length), rnd);
  return chosen.map((p) => {
    const toCasual = rnd() > 0.5;
    const source = toCasual ? p.polite : p.casual;
    const answer = toCasual ? p.casual : p.polite;
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

/** Monta o teste da semana respeitando o que já foi ensinado. */
export function testForWeek(week: number, seed = String(week)): WeekTest {
  const rnd = seeded(seed);
  const questions: Question[] = [];
  const kanaSet = kanaSetForWeek(week);

  if (week === 1) {
    // Só hiragana. 8 kana→romaji + 4 romaji→kana. Nada mais.
    const targets1 = pick(HIRAGANA, 8, rnd);
    const targets2 = pick(HIRAGANA, 4, rnd);
    questions.push(...targets1.map((t) => qKanaToRomaji(t, HIRAGANA, rnd)));
    questions.push(...targets2.map((t) => qRomajiToKana(t, HIRAGANA, rnd)));
  } else if (week === 2) {
    // Katakana + revisão de hiragana. 8 katakana→romaji + 3 romaji→katakana + 2 hiragana→romaji.
    const kata1 = pick(KATAKANA, 8, rnd);
    const kata2 = pick(KATAKANA, 3, rnd);
    const hira = pick(HIRAGANA, 2, rnd);
    questions.push(...kata1.map((t) => qKanaToRomaji(t, KATAKANA, rnd)));
    questions.push(...kata2.map((t) => qRomajiToKana(t, KATAKANA, rnd)));
    questions.push(...hira.map((t) => qKanaToRomaji(t, HIRAGANA, rnd)));
  } else if (week === 3) {
    // Introdução à gramática: 4 kana (revisão) + 3 frases SIMPLES (partículas は/を/に).
    // SEM transformação de registro ainda — os alunos acabaram de ver o que é uma frase.
    const kana = pick(kanaSet, 4, rnd);
    questions.push(...kana.map((t) => qKanaToRomaji(t, kanaSet, rnd)));
    questions.push(...sentenceQuestions(week, rnd, 3));
  } else if (week === 4) {
    // Verbos ます. 3 kana + 3 frases + 1 registro leve (só です → だ).
    const kana = pick(kanaSet, 3, rnd);
    questions.push(...kana.map((t) => qKanaToRomaji(t, kanaSet, rnd)));
    questions.push(...sentenceQuestions(week, rnd, 3));
    questions.push(...registerQuestions(week, rnd, 1));
  } else if (week === 5) {
    // Passado/negativo. 2 kana + 3 frases + 2 registro.
    const kana = pick(kanaSet, 2, rnd);
    questions.push(...kana.map((t) => qKanaToRomaji(t, kanaSet, rnd)));
    questions.push(...sentenceQuestions(week, rnd, 3));
    questions.push(...registerQuestions(week, rnd, 2));
  } else {
    // Semana 6+ : só 1 kana revisão, foco em frase e registro. Kanji começa a aparecer.
    const kana = pick(kanaSet, 1, rnd);
    questions.push(...kana.map((t) => qKanaToRomaji(t, kanaSet, rnd)));
    questions.push(...sentenceQuestions(week, rnd, 4));
    questions.push(...registerQuestions(week, rnd, 3));
  }

  return {
    week,
    title: { pt: `Teste da semana ${week}`, en: `Week ${week} test` },
    questions: questions.filter(Boolean),
  };
}

/** Semana tem material suficiente para um teste. */
export function testAvailable(week: number): boolean {
  return testForWeek(week).questions.length >= 5;
}
