import type { L10n } from "../types";
import { sentencesForWeek } from "./sentences";

/**
 * Frases de shadowing (ouvir → repetir) por semana.
 * Semanas 1–2: sons e palavras curtas (o aluno acabou de conhecer os kana).
 * Semana 3+: as frases da gramática da semana — falar o que acabou de montar.
 */
export interface ShadowItem {
  id: string;
  /** o que falar (e o que o reconhecedor compara) */
  jp: string;
  /** versão exibida (com espaços pedagógicos) */
  display: string;
  romaji?: string;
  translation: L10n;
}

const W1: ShadowItem[] = [
  { id: "sh1-1", jp: "おはよう", display: "おはよう", romaji: "ohayou", translation: { pt: "bom dia (casual)", en: "morning (casual)" } },
  { id: "sh1-2", jp: "ありがとう", display: "ありがとう", romaji: "arigatou", translation: { pt: "obrigado(a)", en: "thanks" } },
  { id: "sh1-3", jp: "こんにちは", display: "こんにちは", romaji: "konnichiwa", translation: { pt: "olá / boa tarde", en: "hello" } },
  { id: "sh1-4", jp: "すみません", display: "すみません", romaji: "sumimasen", translation: { pt: "com licença / desculpe", en: "excuse me" } },
  { id: "sh1-5", jp: "はじめまして", display: "はじめまして", romaji: "hajimemashite", translation: { pt: "prazer em conhecer", en: "nice to meet you" } },
  { id: "sh1-6", jp: "おやすみ", display: "おやすみ", romaji: "oyasumi", translation: { pt: "boa noite (casual)", en: "night (casual)" } },
  { id: "sh1-7", jp: "げんき", display: "げんき", romaji: "genki", translation: { pt: "bem / saudável", en: "well / fine" } },
  { id: "sh1-8", jp: "またね", display: "またね", romaji: "mata ne", translation: { pt: "até mais!", en: "see you!" } },
  { id: "sh1-9", jp: "ごめん", display: "ごめん", romaji: "gomen", translation: { pt: "foi mal (casual)", en: "sorry (casual)" } },
  { id: "sh1-10", jp: "よろしく", display: "よろしく", romaji: "yoroshiku", translation: { pt: "conto com você (casual)", en: "please treat me well" } },
];

const W2: ShadowItem[] = [
  { id: "sh2-1", jp: "コーヒー", display: "コーヒー", romaji: "koohii", translation: { pt: "café", en: "coffee" } },
  { id: "sh2-2", jp: "ラーメン", display: "ラーメン", romaji: "raamen", translation: { pt: "lámen", en: "ramen" } },
  { id: "sh2-3", jp: "ホテル", display: "ホテル", romaji: "hoteru", translation: { pt: "hotel", en: "hotel" } },
  { id: "sh2-4", jp: "タクシー", display: "タクシー", romaji: "takushii", translation: { pt: "táxi", en: "taxi" } },
  { id: "sh2-5", jp: "レストラン", display: "レストラン", romaji: "resutoran", translation: { pt: "restaurante", en: "restaurant" } },
  { id: "sh2-6", jp: "トイレ", display: "トイレ", romaji: "toire", translation: { pt: "banheiro", en: "toilet" } },
  { id: "sh2-7", jp: "メニュー", display: "メニュー", romaji: "menyuu", translation: { pt: "cardápio", en: "menu" } },
  { id: "sh2-8", jp: "バス", display: "バス", romaji: "basu", translation: { pt: "ônibus", en: "bus" } },
  { id: "sh2-9", jp: "コンビニ", display: "コンビニ", romaji: "konbini", translation: { pt: "loja de conveniência", en: "convenience store" } },
  { id: "sh2-10", jp: "スマホ", display: "スマホ", romaji: "sumaho", translation: { pt: "celular", en: "smartphone" } },
];

/** Frases da semana (3+): derivadas do exercício de montar frases. */
function fromSentences(week: number): ShadowItem[] {
  return sentencesForWeek(week).map((s) => ({
    id: `sh-${s.id}`,
    jp: s.tiles.join(""),
    display: s.tiles.join(" "),
    translation: s.translation,
  }));
}

export function shadowingForWeek(week: number): ShadowItem[] {
  if (week === 1) return W1;
  if (week === 2) return W2;
  return fromSentences(week);
}
