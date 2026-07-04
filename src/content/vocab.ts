import type { VocabItem } from "../types";

/**
 * Semana 1: saudações e sobrevivência, sempre em pares de registro
 * quando o par existe. A proporção global do deck mira 55% polido/neutro
 * e 45% casual — verificada em registerStats().
 */
export const VOCAB_W1: VocabItem[] = [
  {
    id: "ohayou",
    polite: "おはようございます",
    casual: "おはよう",
    register: "polite",
    meaning: { pt: "bom dia", en: "good morning" },
    note: { pt: "Entre amigos vira só おはよう — ou até おはよ〜 no chat.", en: "With friends it's just おはよう — or even おはよ〜 in chat." },
  },
  {
    id: "konnichiwa",
    polite: "こんにちは",
    register: "neutral",
    meaning: { pt: "boa tarde / olá", en: "good afternoon / hello" },
    note: { pt: "Neutro: funciona em qualquer situação. O は se lê 'wa'!", en: "Neutral: works anywhere. The は is read 'wa'!" },
  },
  {
    id: "konbanwa",
    polite: "こんばんは",
    register: "neutral",
    meaning: { pt: "boa noite (ao chegar)", en: "good evening" },
  },
  {
    id: "arigatou",
    polite: "ありがとうございます",
    casual: "ありがとう",
    register: "polite",
    meaning: { pt: "obrigado(a)", en: "thank you" },
    note: { pt: "No chat casual: あざす ou サンキュー também rolam.", en: "In casual chat: あざす or サンキュー also show up." },
  },
  {
    id: "sumimasen",
    polite: "すみません",
    casual: "ごめん",
    register: "polite",
    meaning: { pt: "com licença / desculpe", en: "excuse me / sorry" },
    note: { pt: "ごめん(ね) é o 'foi mal' entre amigos. ごめんなさい fica no meio.", en: "ごめん(ね) is the casual 'my bad'. ごめんなさい sits in between." },
  },
  {
    id: "hajimemashite",
    polite: "はじめまして",
    register: "polite",
    meaning: { pt: "prazer em conhecer (primeira vez)", en: "nice to meet you (first time)" },
  },
  {
    id: "yoroshiku",
    polite: "よろしくお願いします",
    casual: "よろしくね",
    register: "polite",
    meaning: { pt: "conto com você / prazer", en: "please treat me well / looking forward" },
    note: { pt: "Sem tradução exata — fecha apresentações e pedidos.", en: "No exact translation — closes introductions and requests." },
  },
  {
    id: "oyasumi",
    polite: "おやすみなさい",
    casual: "おやすみ",
    register: "polite",
    meaning: { pt: "boa noite (ao se despedir/dormir)", en: "good night (when leaving/sleeping)" },
  },
  {
    id: "mata",
    polite: "じゃあ、また",
    casual: "またね！",
    register: "casual",
    meaning: { pt: "até mais!", en: "see you!" },
    note: { pt: "Formal de verdade seria 失礼します — vem na semana 4.", en: "Truly formal would be 失礼します — coming in week 4." },
  },
  {
    id: "genki",
    polite: "お元気ですか",
    casual: "元気？",
    register: "casual",
    meaning: { pt: "tudo bem?", en: "how are you?" },
    note: { pt: "Amigos raramente usam a versão longa — 元気？ resolve.", en: "Friends rarely use the long form — 元気？ does the job." },
  },
  {
    id: "genki-desu",
    polite: "元気です",
    casual: "元気だよ",
    register: "casual",
    meaning: { pt: "estou bem", en: "I'm fine" },
  },
  {
    id: "hai",
    polite: "はい",
    casual: "うん",
    register: "casual",
    meaning: { pt: "sim", en: "yes" },
    note: { pt: "うん é o 'aham' japonês. Com chefe, sempre はい.", en: "うん is the Japanese 'mm-hm'. With your boss, always はい." },
  },
  {
    id: "iie",
    polite: "いいえ",
    casual: "ううん",
    register: "casual",
    meaning: { pt: "não", en: "no" },
    note: { pt: "ううん (descendo-subindo o tom) = não casual. Cuidado: parecido com うん!", en: "ううん (dip in pitch) = casual no. Careful: it sounds close to うん!" },
  },
  {
    id: "wakarimashita",
    polite: "わかりました",
    casual: "わかった",
    register: "polite",
    meaning: { pt: "entendi", en: "understood / got it" },
    note: { pt: "No chat: りょ (de 了解) é o 'blz' japonês.", en: "In chat: りょ (from 了解) is the Japanese 'k'." },
  },
  {
    id: "onegai",
    polite: "お願いします",
    casual: "お願い！",
    register: "polite",
    meaning: { pt: "por favor", en: "please" },
  },
];

/** Proporção polido/casual do conteúdo carregado — alimenta o medidor 55/45. */
export function registerStats(items: VocabItem[]): { polite: number; casual: number } {
  let polite = 0;
  let casual = 0;
  for (const v of items) {
    if (v.register === "casual") casual++;
    else polite++;
    if (v.casual && v.register !== "casual") casual += 0.5;
  }
  const total = polite + casual;
  return { polite: Math.round((polite / total) * 100), casual: Math.round((casual / total) * 100) };
}
