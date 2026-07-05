import type { L10n } from "../types";

/**
 * Exercício de construção de frase (gramática): o aluno monta a frase
 * arrastando/tocando as peças na ordem certa. Progressão real de gramática
 * ao longo das semanas — de partículas a adjetivos e convites.
 * As peças são em kana (app kana-first); `note` ensina o ponto gramatical.
 */
export interface SentenceItem {
  id: string;
  week: number;
  /** ordem correta das peças */
  tiles: string[];
  translation: L10n;
  /** ponto gramatical que a frase treina */
  note: L10n;
}

export const SENTENCES: SentenceItem[] = [
  // Semana 3 — partículas は・を・に
  {
    id: "s3-1",
    week: 3,
    tiles: ["これ", "は", "ペン", "です"],
    translation: { pt: "Isto é uma caneta.", en: "This is a pen." },
    note: { pt: "は marca o tópico da frase (lê-se 'wa').", en: "は marks the topic (read 'wa')." },
  },
  {
    id: "s3-2",
    week: 3,
    tiles: ["わたし", "は", "コーヒー", "を", "のみます"],
    translation: { pt: "Eu bebo café.", en: "I drink coffee." },
    note: { pt: "を marca o objeto direto (o que sofre a ação).", en: "を marks the direct object." },
  },
  {
    id: "s3-3",
    week: 3,
    tiles: ["がっこう", "に", "いきます"],
    translation: { pt: "Vou para a escola.", en: "I go to school." },
    note: { pt: "に marca o destino do movimento.", en: "に marks the destination of movement." },
  },
  // Semana 4 — verbos ます + partícula で (local da ação)
  {
    id: "s4-1",
    week: 4,
    tiles: ["カフェ", "で", "ともだち", "に", "あいます"],
    translation: { pt: "Encontro um amigo no café.", en: "I meet a friend at the café." },
    note: { pt: "で = onde a ação acontece; に = com quem/alvo.", en: "で = where the action happens; に = the target." },
  },
  {
    id: "s4-2",
    week: 4,
    tiles: ["あした", "えいが", "を", "みます"],
    translation: { pt: "Amanhã assisto a um filme.", en: "Tomorrow I'll watch a movie." },
    note: { pt: "Forma ます serve pro presente e pro futuro.", en: "The ます form covers present and future." },
  },
  // Semana 5 — passado e negativo
  {
    id: "s5-1",
    week: 5,
    tiles: ["きのう", "すし", "を", "たべました"],
    translation: { pt: "Ontem comi sushi.", en: "Yesterday I ate sushi." },
    note: { pt: "〜ました = passado polido.", en: "〜ました = polite past." },
  },
  {
    id: "s5-2",
    week: 5,
    tiles: ["コーヒー", "を", "のみませんでした"],
    translation: { pt: "Não bebi café.", en: "I didn't drink coffee." },
    note: { pt: "〜ませんでした = passado negativo polido.", en: "〜ませんでした = polite past negative." },
  },
  // Semana 6 — forma て
  {
    id: "s6-1",
    week: 6,
    tiles: ["ちょっと", "まって", "ください"],
    translation: { pt: "Espere um pouco, por favor.", en: "Please wait a moment." },
    note: { pt: "〜てください = pedido educado.", en: "〜てください = polite request." },
  },
  {
    id: "s6-2",
    week: 6,
    tiles: ["いま", "ごはん", "を", "たべて", "います"],
    translation: { pt: "Estou comendo agora.", en: "I'm eating right now." },
    note: { pt: "〜ています = ação em progresso.", en: "〜ています = action in progress." },
  },
  // Semana 7 — adjetivos + が (mas)
  {
    id: "s7-1",
    week: 7,
    tiles: ["この", "ラーメン", "は", "おいしい", "です"],
    translation: { pt: "Este ramen é gostoso.", en: "This ramen is delicious." },
    note: { pt: "Adjetivo い vem antes de です, sem mudar.", en: "い-adjective sits right before です, unchanged." },
  },
  {
    id: "s7-2",
    week: 7,
    tiles: ["にほんご", "は", "むずかしい", "です", "が", "たのしい", "です"],
    translation: { pt: "Japonês é difícil, mas divertido.", en: "Japanese is hard, but fun." },
    note: { pt: "が no fim de frase = 'mas' (contraste).", en: "が after a clause = 'but' (contrast)." },
  },
  // Semana 8 — querer + convidar
  {
    id: "s8-1",
    week: 8,
    tiles: ["すし", "を", "たべたい", "です"],
    translation: { pt: "Quero comer sushi.", en: "I want to eat sushi." },
    note: { pt: "〜たい = querer fazer algo.", en: "〜たい = want to do something." },
  },
  {
    id: "s8-2",
    week: 8,
    tiles: ["いっしょ", "に", "いきませんか"],
    translation: { pt: "Vamos juntos? (convite)", en: "Shall we go together? (invitation)" },
    note: { pt: "〜ませんか = convite educado.", en: "〜ませんか = polite invitation." },
  },
];

export const sentencesForWeek = (week: number): SentenceItem[] => SENTENCES.filter((s) => s.week === week);
