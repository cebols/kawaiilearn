import { HIRAGANA } from "./hiragana";
import { KATAKANA } from "./katakana";
import HIRA_STROKES from "./strokes/hiragana.json";
import KATA_STROKES from "./strokes/katakana.json";
import type { KanaItem, L10n } from "../types";

export type StrokeData = Record<string, { p: string[]; n: number[][] }>;

export interface KanaDeck {
  id: string;
  title: L10n;
  items: KanaItem[];
  strokes: StrokeData;
}

/** Decks de kana registrados por id. Flashcards e Escrita resolvem por aqui. */
export const KANA_DECKS: Record<string, KanaDeck> = {
  hiragana: {
    id: "hiragana",
    title: { pt: "Hiragana", en: "Hiragana" },
    items: HIRAGANA,
    strokes: HIRA_STROKES,
  },
  katakana: {
    id: "katakana",
    title: { pt: "Katakana", en: "Katakana" },
    items: KATAKANA,
    strokes: KATA_STROKES,
  },
};

export const kanaDeck = (id: string): KanaDeck => KANA_DECKS[id] ?? KANA_DECKS.hiragana;
export const isKanaDeck = (id: string): boolean => id in KANA_DECKS;
