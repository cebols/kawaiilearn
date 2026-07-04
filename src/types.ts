/** Registro de fala: a barrinha 55% polido / 45% casual do app. */
export type Register = "polite" | "neutral" | "casual";

/** Texto bilíngue (idiomas de interface do app). */
export interface L10n {
  pt: string;
  en: string;
}

export type Skill = "reading" | "writing" | "listening" | "vocab";

export interface KanaItem {
  id: string;
  kana: string;
  romaji: string;
  /** dica mnemônica específica por idioma (não traduzida — escrita para cada língua) */
  mnemonic: L10n;
  row: string;
}

export interface VocabItem {
  id: string;
  /** forma polida (ou única, se neutra) */
  polite: string;
  politeReading?: string;
  /** forma casual equivalente, quando existir */
  casual?: string;
  casualReading?: string;
  register: Register;
  meaning: L10n;
  note?: L10n;
}

export interface DialogueLine {
  speaker: string; // character id, ou "you"
  polite: string;
  casual: string;
  translation: L10n;
  /** opções de resposta quando speaker === "you" */
  choices?: { polite: string; casual: string; translation: L10n }[];
}

export interface Dialogue {
  id: string;
  title: L10n;
  scene: L10n;
  /** registro predominante da cena — o toggle sempre mostra os dois */
  register: Register;
  characterId: string;
  lines: DialogueLine[];
}

export interface Week {
  num: number;
  title: L10n;
  goals: L10n[];
  phase: 1 | 2 | 3 | 4;
  available: boolean;
}
