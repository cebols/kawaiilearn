import type { L10n } from "../types";

/**
 * Notificações espontâneas dos personagens: cada um só manda mensagem
 * quando faz sentido pra ele. Yuki de manhã cedo com energia, Kenji
 * em horário comercial, Hana no meio da tarde, Aiko à noite pro estudo,
 * a paquera no fim do dia. Os templates giram — quem manda hoje não
 * repete a mesma frase amanhã.
 */

export interface Nudge {
  /** id do personagem (resolvido com resolveChar para a paquera) */
  who: string;
  /** o preview curto em japonês, como se fosse uma prévia de mensagem no push */
  jp: string;
  /** o "corpo" da notificação em PT/EN — contexto para quem ainda não lê 100% */
  body: L10n;
  /** id do diálogo a abrir quando a pessoa clica na notificação */
  dialogueId: string;
  /** janela do dia em que essa mensagem faz sentido (24h, hora local) */
  window: [number, number];
  /** só em dias úteis? (Kenji, colega de trabalho) */
  weekdaysOnly?: boolean;
}

export const NUDGES: Nudge[] = [
  // ─── Yuki: energia da manhã ───
  {
    who: "yuki",
    jp: "おはよー！起きた？☀️",
    body: { pt: "Yuki: Ei, acordou já?? Vem me contar do seu dia!", en: "Yuki: You up yet?? Come tell me about your day!" },
    dialogueId: "w1-yuki-intro",
    window: [7, 10],
  },
  {
    who: "yuki",
    jp: "今日カラオケ、行かない？🎤",
    body: { pt: "Yuki: Karaokê hoje?? Fala que sim!", en: "Yuki: Karaoke tonight?? Say yes!" },
    dialogueId: "w2-yuki-karaoke",
    window: [17, 21],
  },
  {
    who: "yuki",
    jp: "ちょっと聞いて〜！",
    body: { pt: "Yuki: Preciso te contar uma coisa 😆", en: "Yuki: I gotta tell you something 😆" },
    dialogueId: "w2-yuki-teasing",
    window: [12, 15],
  },

  // ─── Kenji: colega de trabalho, horário comercial ───
  {
    who: "kenji",
    jp: "おはようございます。",
    body: { pt: "Kenji: Bom dia. Café hoje?", en: "Kenji: Good morning. Coffee today?" },
    dialogueId: "w1-kenji-morning",
    window: [9, 11],
    weekdaysOnly: true,
  },
  {
    who: "kenji",
    jp: "そろそろお昼ですね。",
    body: { pt: "Kenji: Hora do almoço — vem com a gente?", en: "Kenji: Almost lunchtime — join us?" },
    dialogueId: "w2-kenji-lunch",
    window: [11, 13],
    weekdaysOnly: true,
  },

  // ─── Hana: obaachan da tarde ───
  {
    who: "hana",
    jp: "お茶でも、どう？🍵",
    body: { pt: "Hana: Passa aqui pra um chá quando puder 🍊", en: "Hana: Come by for tea when you can 🍊" },
    dialogueId: "w2-hana-tea",
    window: [14, 16],
  },
  {
    who: "hana",
    jp: "みかん、たくさんあるよ",
    body: { pt: "Hana: Ganhei tangerinas demais, quer uns?", en: "Hana: Got way too many tangerines, want some?" },
    dialogueId: "w1-hana-tangerines",
    window: [15, 17],
  },

  // ─── Aiko: professora, lembrete de estudo ───
  {
    who: "aiko",
    jp: "今日の勉強、5分だけでもね。",
    body: { pt: "Aiko: 5 minutinhos hoje já valem. Que tal?", en: "Aiko: Even 5 minutes today counts. Ready?" },
    dialogueId: "w1-aiko-first",
    window: [19, 21],
  },
  {
    who: "aiko",
    jp: "ていねい？カジュアル？",
    body: { pt: "Aiko: Dúvida rápida: 'ありがとう' ou 'ありがとうございます'?", en: "Aiko: Quick one: 'ありがとう' or 'ありがとうございます'?" },
    dialogueId: "w2-aiko-register",
    window: [18, 20],
  },

  // ─── Paquera (crush): fim de tarde / noite ───
  {
    who: "crush",
    jp: "今日、来る？☕",
    body: { pt: "…: A paquera te espera hoje? ☕", en: "…: Your crush wondering if you'll come by? ☕" },
    dialogueId: "w1-crush-cafe",
    window: [16, 19],
  },
  {
    who: "crush",
    jp: "おつかれ〜 明日も待ってるね🌙",
    body: { pt: "…: 'Boa noite~ te espero amanhã 🌙'", en: "…: 'Goodnight~ see you tomorrow 🌙'" },
    dialogueId: "w2-crush-goodnight",
    window: [21, 22],
  },
];
