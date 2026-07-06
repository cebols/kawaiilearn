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

/** Uma fala nos dois registros; *Kana = mesma fala sem kanji (para iniciantes). */
export interface SpeechPair {
  polite: string;
  casual: string;
  politeKana?: string;
  casualKana?: string;
  translation: L10n;
}

export interface DialogueLine extends SpeechPair {
  speaker: string; // character id, "crush" (resolvido pelo perfil) ou "you"
  /** opções de resposta quando speaker === "you" */
  choices?: SpeechPair[];
}

export interface Dialogue {
  id: string;
  title: L10n;
  scene: L10n;
  /** registro predominante da cena — o toggle sempre mostra os dois */
  register: Register;
  characterId: string;
  /** nível sugerido: os chats acompanham o vocabulário que o usuário já viu */
  week: number;
  /** contexto do chat: conversa presencial ou por mensagem (muda a UI/vibe) */
  medium?: "irl" | "text";
  lines: DialogueLine[];
}

export interface Week {
  num: number;
  title: L10n;
  goals: L10n[];
  /** 1–6: Fundação, Estrutura, Comunicação, Consolidação, Expansão (N4), Fluência */
  phase: number;
  /** faixa aproximada de dificuldade, para a curva de aprendizado */
  level: "N5-" | "N5" | "N5+" | "N4-" | "N4";
  available: boolean;
}
