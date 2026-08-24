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

/** Semana 3: nouns + core verbs for は・を・に sentences. */
export const VOCAB_W3: VocabItem[] = [
  {
    id: "gakusei",
    polite: "学生",
    politeReading: "がくせい",
    register: "neutral",
    meaning: { pt: "estudante", en: "student" },
    note: { pt: "私は学生です (sou estudante) — a frase modelo do は.", en: "私は学生です (I am a student) — the template は sentence." },
  },
  {
    id: "sensei",
    polite: "先生",
    politeReading: "せんせい",
    register: "polite",
    meaning: { pt: "professor(a) / doutor(a)", en: "teacher / doctor" },
    note: { pt: "Nunca use para si mesmo. Vale para médicos também.", en: "Never use for yourself. Also used for doctors." },
  },
  {
    id: "tomodachi",
    polite: "友達",
    politeReading: "ともだち",
    register: "casual",
    meaning: { pt: "amigo(a)", en: "friend" },
    note: { pt: "Casual. Mais formal: 友人 (ゆうじん).", en: "Casual. More formal: 友人 (ゆうじん)." },
  },
  {
    id: "gakkou",
    polite: "学校",
    politeReading: "がっこう",
    register: "neutral",
    meaning: { pt: "escola", en: "school" },
  },
  {
    id: "eki",
    polite: "駅",
    politeReading: "えき",
    register: "neutral",
    meaning: { pt: "estação (de trem / metrô)", en: "train / subway station" },
    note: { pt: "駅に行きます — ir à estação. に marca o destino.", en: "駅に行きます — go to the station. に marks the destination." },
  },
  {
    id: "uchi",
    polite: "家",
    politeReading: "うち・いえ",
    casual: "うち",
    register: "casual",
    meaning: { pt: "casa / lar", en: "home / house" },
    note: { pt: "うち = minha casa (íntimo). いえ = a construção em si, mais neutro.", en: "うち = my home (intimate). いえ = the building, more neutral." },
  },
  {
    id: "gohan",
    polite: "ご飯",
    politeReading: "ごはん",
    casual: "飯",
    casualReading: "めし",
    register: "neutral",
    meaning: { pt: "arroz / refeição", en: "rice / meal" },
    note: { pt: "飯 (めし) é o casual masculino. ご飯 funciona em qualquer contexto.", en: "飯 (めし) is the masculine casual. ご飯 works in any context." },
  },
  {
    id: "mizu",
    polite: "水",
    politeReading: "みず",
    register: "neutral",
    meaning: { pt: "água", en: "water" },
  },
  {
    id: "koohii",
    polite: "コーヒー",
    register: "neutral",
    meaning: { pt: "café (bebida)", en: "coffee" },
    note: { pt: "Katakana — palavra emprestada do inglês/holandês.", en: "Katakana — borrowed from English/Dutch." },
  },
  {
    id: "hon",
    polite: "本",
    politeReading: "ほん",
    register: "neutral",
    meaning: { pt: "livro", en: "book" },
    note: { pt: "本を読みます — ler um livro. を marca o objeto direto.", en: "本を読みます — read a book. を marks the direct object." },
  },
  {
    id: "eiga",
    polite: "映画",
    politeReading: "えいが",
    register: "neutral",
    meaning: { pt: "filme", en: "movie / film" },
  },
  {
    id: "tabemasu",
    polite: "食べます",
    politeReading: "たべます",
    casual: "食べる",
    casualReading: "たべる",
    register: "polite",
    meaning: { pt: "comer", en: "to eat" },
    note: { pt: "ます = polida/presente. 食べる = casual/infinitivo.", en: "ます = polite/present. 食べる = casual/dictionary form." },
  },
  {
    id: "nomimasu",
    polite: "飲みます",
    politeReading: "のみます",
    casual: "飲む",
    casualReading: "のむ",
    register: "polite",
    meaning: { pt: "beber", en: "to drink" },
  },
  {
    id: "ikimasu",
    polite: "行きます",
    politeReading: "いきます",
    casual: "行く",
    casualReading: "いく",
    register: "polite",
    meaning: { pt: "ir", en: "to go" },
    note: { pt: "に行きます = ir A algum lugar. で行きます = ir DE transporte.", en: "に行きます = go TO somewhere. で行きます = go BY transport." },
  },
  {
    id: "mimasu",
    polite: "見ます",
    politeReading: "みます",
    casual: "見る",
    casualReading: "みる",
    register: "polite",
    meaning: { pt: "ver / assistir", en: "to see / watch" },
  },
  {
    id: "yomimasu",
    polite: "読みます",
    politeReading: "よみます",
    casual: "読む",
    casualReading: "よむ",
    register: "polite",
    meaning: { pt: "ler", en: "to read" },
  },
  {
    id: "suki-desu",
    polite: "好きです",
    politeReading: "すきです",
    casual: "好き",
    casualReading: "すき",
    register: "polite",
    meaning: { pt: "gostar / favorito(a)", en: "to like / favorite" },
    note: { pt: "コーヒーが好きです — gosto de café. が marca o objeto do sentimento.", en: "コーヒーが好きです — I like coffee. が marks the object of feeling." },
  },
];

/** Semana 4: action verbs + place nouns for ます form and で. */
export const VOCAB_W4: VocabItem[] = [
  {
    id: "hanashimasu",
    polite: "話します",
    politeReading: "はなします",
    casual: "話す",
    casualReading: "はなす",
    register: "polite",
    meaning: { pt: "falar / conversar", en: "to speak / talk" },
    note: { pt: "日本語を話します — falar japonês.", en: "日本語を話します — speak Japanese." },
  },
  {
    id: "kikimasu",
    polite: "聞きます",
    politeReading: "ききます",
    casual: "聞く",
    casualReading: "きく",
    register: "polite",
    meaning: { pt: "ouvir / perguntar", en: "to listen / ask" },
    note: { pt: "Duas funções: 音楽を聞く (ouvir música) e 先生に聞く (perguntar ao professor).", en: "Two meanings: listen to music, and ask the teacher." },
  },
  {
    id: "kakimasu",
    polite: "書きます",
    politeReading: "かきます",
    casual: "書く",
    casualReading: "かく",
    register: "polite",
    meaning: { pt: "escrever", en: "to write" },
  },
  {
    id: "benkyoushimasu",
    polite: "勉強します",
    politeReading: "べんきょうします",
    casual: "勉強する",
    casualReading: "べんきょうする",
    register: "polite",
    meaning: { pt: "estudar", en: "to study" },
    note: { pt: "図書館で勉強します — estudar NA biblioteca. で marca onde a ação acontece.", en: "図書館で勉強します — study AT the library. で marks where the action happens." },
  },
  {
    id: "hatarakimasu",
    polite: "働きます",
    politeReading: "はたらきます",
    casual: "働く",
    casualReading: "はたらく",
    register: "polite",
    meaning: { pt: "trabalhar", en: "to work" },
  },
  {
    id: "kaerimasu",
    polite: "帰ります",
    politeReading: "かえります",
    casual: "帰る",
    casualReading: "かえる",
    register: "polite",
    meaning: { pt: "voltar (para casa)", en: "to return home" },
    note: { pt: "家に帰ります — voltar para casa. Diferente de 戻る (もどる) = retornar a qualquer lugar.", en: "家に帰ります — go home. Different from 戻る (もどる) = return to any place." },
  },
  {
    id: "okimasu",
    polite: "起きます",
    politeReading: "おきます",
    casual: "起きる",
    casualReading: "おきる",
    register: "polite",
    meaning: { pt: "acordar / levantar", en: "to wake up / get up" },
  },
  {
    id: "nemasu",
    polite: "寝ます",
    politeReading: "ねます",
    casual: "寝る",
    casualReading: "ねる",
    register: "polite",
    meaning: { pt: "dormir / deitar", en: "to sleep / go to bed" },
  },
  {
    id: "kimasu",
    polite: "来ます",
    politeReading: "きます",
    casual: "来る",
    casualReading: "くる",
    register: "polite",
    meaning: { pt: "vir", en: "to come" },
    note: { pt: "Irregular! Radical muda: 来る → 来ます → 来て. Um dos 3 verbos irregulares.", en: "Irregular! Stem changes: 来る → 来ます → 来て. One of 3 irregular verbs." },
  },
  {
    id: "kaimasu",
    polite: "買います",
    politeReading: "かいます",
    casual: "買う",
    casualReading: "かう",
    register: "polite",
    meaning: { pt: "comprar", en: "to buy" },
  },
  {
    id: "resutoran",
    polite: "レストラン",
    register: "neutral",
    meaning: { pt: "restaurante", en: "restaurant" },
    note: { pt: "レストランで食べます — comer NO restaurante. で + local da ação.", en: "レストランで食べます — eat at the restaurant. で + action location." },
  },
  {
    id: "toshokan",
    polite: "図書館",
    politeReading: "としょかん",
    register: "neutral",
    meaning: { pt: "biblioteca", en: "library" },
  },
  {
    id: "kouen",
    polite: "公園",
    politeReading: "こうえん",
    register: "neutral",
    meaning: { pt: "parque", en: "park" },
  },
  {
    id: "kyou",
    polite: "今日",
    politeReading: "きょう",
    register: "neutral",
    meaning: { pt: "hoje", en: "today" },
    note: { pt: "今日は (きょうは) — 'quanto a hoje'. O は aqui é partícula de tópico, não cumprimento!", en: "今日は (きょうは) — 'as for today'. The は is the topic particle, not a greeting!" },
  },
  {
    id: "ashita",
    polite: "明日",
    politeReading: "あした・あす",
    register: "neutral",
    meaning: { pt: "amanhã", en: "tomorrow" },
    note: { pt: "あした (casual) e あす (formal) — mesma escrita, duas leituras.", en: "あした (casual) and あす (formal) — same kanji, two readings." },
  },
  {
    id: "mainichi",
    polite: "毎日",
    politeReading: "まいにち",
    register: "neutral",
    meaning: { pt: "todo dia / diariamente", en: "every day" },
    note: { pt: "毎 (まい) = 'todo/cada'. 毎朝 = toda manhã, 毎週 = toda semana.", en: "毎 (まい) = 'every'. 毎朝 = every morning, 毎週 = every week." },
  },
];

/** Returns the vocab deck for a given week (empty array if none). */
export function vocabForWeek(week: number): VocabItem[] {
  if (week === 1) return VOCAB_W1;
  if (week === 3) return VOCAB_W3;
  if (week >= 4) return VOCAB_W4;
  return [];
}

/** Deck ID string for vocab SRS storage. */
export function vocabDeckId(week: number): string {
  if (week === 1) return "vocab-w1";
  if (week === 3) return "vocab-w3";
  if (week >= 4) return "vocab-w4";
  return `vocab-w${week}`;
}

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
