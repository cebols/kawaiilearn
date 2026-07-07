import type { L10n } from "../types";

/**
 * Aulas de gramática — o que faltava entre "sei os kana" e "monto frases".
 * Cada aula é curta (2-4 seções), cheia de exemplos, e usa só o que já foi
 * ensinado até a semana em curso. Depois de ler, o aluno destrava o
 * exercício de "montar frases" daquela semana.
 */

export type LessonBlock =
  | { kind: "text"; body: L10n }
  | { kind: "example"; jp: string; jpKana?: string; translation: L10n; note?: L10n }
  | { kind: "compare"; a: { jp: string; label: L10n }; b: { jp: string; label: L10n }; note?: L10n }
  | { kind: "callout"; body: L10n; tone?: "tip" | "warn" };

export interface Lesson {
  id: string;
  week: number;
  title: L10n;
  subtitle: L10n;
  emoji: string;
  blocks: LessonBlock[];
}

export const LESSONS: Lesson[] = [
  // ── Semana 3 · Introdução à gramática ──
  {
    id: "l3-1",
    week: 3,
    emoji: "🧱",
    title: { pt: "A frase mais simples: X é Y", en: "The simplest sentence: X is Y" },
    subtitle: { pt: "A partícula は e o です", en: "The は particle and です" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Em japonês, a frase é montada como blocos que se conectam por partículas. A mais básica de todas serve pra dizer o que uma coisa é.",
          en: "In Japanese, sentences are built out of blocks joined by particles. The most basic one is used to say what something is.",
        },
      },
      {
        kind: "example",
        jp: "これ は ペン です。",
        translation: { pt: "Isto é uma caneta.", en: "This is a pen." },
      },
      {
        kind: "text",
        body: {
          pt: "Desmontando: **これ** = 'isto'. **ペン** = 'caneta'. **です** ≈ 'é'. E o **は** entre eles é a partícula do tópico — como se você marcasse 'aqui vem o assunto'.",
          en: "Breakdown: **これ** = 'this'. **ペン** = 'pen'. **です** ≈ 'is'. And **は** between them is the topic particle — as if you were marking 'here comes the subject'.",
        },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "Cuidado: este は é lido como **wa**, não 'ha'! É a única exceção — só quando é partícula.",
          en: "Careful: this は is read as **wa**, not 'ha'! It's the only exception — only when it's a particle.",
        },
      },
      {
        kind: "example",
        jp: "わたし は フェリペ です。",
        translation: { pt: "Eu sou Felipe.", en: "I am Felipe." },
        note: { pt: "Note a mesma estrutura: [X] は [Y] です.", en: "Same structure: [X] は [Y] です." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Ordem no japonês: o verbo vem no FIM. 'Eu caneta sou' — soa estranho em português, mas é assim que os blocos se organizam.",
          en: "Word order in Japanese: the verb comes at the END. 'I pen am' — sounds odd in English, but that's how the blocks arrange.",
        },
      },
    ],
  },
  {
    id: "l3-2",
    week: 3,
    emoji: "🎯",
    title: { pt: "Quem sofre a ação: を", en: "Who takes the action: を" },
    subtitle: { pt: "A partícula do objeto direto", en: "The direct-object particle" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Quando alguém FAZ algo COM alguma coisa (beber café, ler livro, comer sushi), a coisa é marcada com **を**.",
          en: "When someone DOES something TO an object (drink coffee, read a book, eat sushi), that object is marked with **を**.",
        },
      },
      {
        kind: "example",
        jp: "コーヒー を のみます。",
        translation: { pt: "(Eu) bebo café.", en: "(I) drink coffee." },
        note: { pt: "を marca café como o objeto de のみます (beber).", en: "を marks coffee as the object of のみます (drink)." },
      },
      {
        kind: "example",
        jp: "すし を たべます。",
        translation: { pt: "(Eu) como sushi.", en: "(I) eat sushi." },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "を é lido **o**, não 'wo'! Também é única — só existe como partícula.",
          en: "を is read **o**, not 'wo'! Also unique — only exists as a particle.",
        },
      },
      {
        kind: "text",
        body: {
          pt: "Agora dá pra montar frases inteiras: **[quem] は [o quê] を [ação].**",
          en: "Now you can build full sentences: **[who] は [what] を [action].**",
        },
      },
      {
        kind: "example",
        jp: "わたし は コーヒー を のみます。",
        translation: { pt: "Eu bebo café.", en: "I drink coffee." },
      },
    ],
  },
  {
    id: "l3-3",
    week: 3,
    emoji: "🚶",
    title: { pt: "Para onde: に", en: "Where to: に" },
    subtitle: { pt: "A partícula do destino", en: "The destination particle" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Quando você VAI ou VEM de algum lugar, o destino leva **に**. Serve pra qualquer movimento.",
          en: "When you GO to somewhere, the destination takes **に**. Works for any movement.",
        },
      },
      {
        kind: "example",
        jp: "がっこう に いきます。",
        translation: { pt: "Vou para a escola.", en: "I go to school." },
      },
      {
        kind: "example",
        jp: "うち に かえります。",
        translation: { pt: "Volto para casa.", en: "I go back home." },
      },
      {
        kind: "compare",
        a: { jp: "コーヒー を のみます", label: { pt: "を = objeto (bebo café)", en: "を = object (drink coffee)" } },
        b: { jp: "カフェ に いきます", label: { pt: "に = destino (vou ao café)", en: "に = destination (go to café)" } },
        note: { pt: "As partículas mudam totalmente o papel da palavra. Elas SÃO a gramática.", en: "Particles totally change a word's role. They ARE the grammar." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Pronto — com は, を e に você já monta a maioria das frases básicas. Agora vá pro exercício de Montar Frases e veja isso na prática!",
          en: "Done — with は, を and に you can already build most basic sentences. Now go to the Build Sentences exercise!",
        },
      },
    ],
  },

  // ── Semana 4 · Verbos ます ──
  {
    id: "l4-1",
    week: 4,
    emoji: "⚙️",
    title: { pt: "O motor: a forma ます", en: "The engine: the ます form" },
    subtitle: { pt: "Presente e futuro polidos", en: "Polite present and future" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Todo verbo em japonês tem uma versão polida terminada em **〜ます**. É a forma que você usa com desconhecidos, no trabalho, no restaurante.",
          en: "Every Japanese verb has a polite version ending in **〜ます**. It's what you use with strangers, at work, at a restaurant.",
        },
      },
      {
        kind: "example",
        jp: "コーヒー を のみます。",
        translation: { pt: "Bebo café.", en: "I drink coffee." },
        note: { pt: "Não precisa dizer 'eu' — o japonês assume pelo contexto.", en: "You don't need to say 'I' — Japanese assumes it by context." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Um único ます cobre presente E futuro. 'のみます' = 'bebo' OU 'vou beber' — o contexto decide.",
          en: "One ます covers present AND future. 'のみます' = 'I drink' OR 'I will drink' — context decides.",
        },
      },
      {
        kind: "example",
        jp: "あした、えいが を みます。",
        translation: { pt: "Amanhã, assisto a um filme.", en: "Tomorrow, I'll watch a movie." },
        note: { pt: "'あした' (amanhã) deixa claro que é futuro.", en: "'あした' (tomorrow) makes it clearly future." },
      },
    ],
  },
  {
    id: "l4-2",
    week: 4,
    emoji: "📍",
    title: { pt: "Onde acontece: で", en: "Where it happens: で" },
    subtitle: { pt: "で marca o local da ação", en: "で marks the location of an action" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Se に é para ONDE você vai, **で** é ONDE algo acontece. É a diferença entre chegar num lugar e fazer algo dentro dele.",
          en: "If に is WHERE you go, **で** is WHERE something happens. The difference between arriving at a place and doing something inside it.",
        },
      },
      {
        kind: "compare",
        a: { jp: "カフェ に いきます", label: { pt: "に → vou ao café (destino)", en: "に → go to the café (destination)" } },
        b: { jp: "カフェ で のみます", label: { pt: "で → bebo NO café (local da ação)", en: "で → drink AT the café (action location)" } },
      },
      {
        kind: "example",
        jp: "カフェ で ともだち に あいます。",
        translation: { pt: "Encontro um amigo no café.", en: "I meet a friend at the café." },
        note: { pt: "で marca ONDE, に aqui marca com quem — a mesma frase usa as duas!", en: "で marks WHERE, に here marks who — the same sentence uses both!" },
      },
    ],
  },

  // ── Semana 5 · Passado e negativo ──
  {
    id: "l5-1",
    week: 5,
    emoji: "⏪",
    title: { pt: "Falando do passado: 〜ました", en: "Talking past: 〜ました" },
    subtitle: { pt: "Como transformar qualquer verbo em passado polido", en: "How to make any verb polite past" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Pegue qualquer verbo em ます e troque por **〜ました**. Pronto — é o passado.",
          en: "Take any ます verb and swap in **〜ました**. Done — that's past tense.",
        },
      },
      {
        kind: "compare",
        a: { jp: "たべます", label: { pt: "como (agora ou vou comer)", en: "eat (now or will eat)" } },
        b: { jp: "たべました", label: { pt: "comi", en: "ate" } },
      },
      {
        kind: "example",
        jp: "きのう、すし を たべました。",
        translation: { pt: "Ontem comi sushi.", en: "Yesterday I ate sushi." },
      },
    ],
  },
  {
    id: "l5-2",
    week: 5,
    emoji: "🚫",
    title: { pt: "Negando: 〜ません e 〜ませんでした", en: "Saying no: 〜ません and 〜ませんでした" },
    subtitle: { pt: "Presente e passado negativos", en: "Present and past negatives" },
    blocks: [
      {
        kind: "compare",
        a: { jp: "のみます", label: { pt: "bebo", en: "I drink" } },
        b: { jp: "のみません", label: { pt: "não bebo", en: "I don't drink" } },
      },
      {
        kind: "compare",
        a: { jp: "のみました", label: { pt: "bebi", en: "I drank" } },
        b: { jp: "のみませんでした", label: { pt: "não bebi", en: "I didn't drink" } },
      },
      {
        kind: "example",
        jp: "コーヒー を のみませんでした。",
        translation: { pt: "Não bebi café.", en: "I didn't drink coffee." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Guarde a matriz: ます (é/faz) → ません (não é/faz) → ました (foi/fez) → ませんでした (não foi/fez). Só quatro formas cobrem quase tudo!",
          en: "Remember the matrix: ます (do) → ません (don't) → ました (did) → ませんでした (didn't). Just four forms cover almost everything!",
        },
      },
    ],
  },

  // ── Semana 6 · Forma て ──
  {
    id: "l6-1",
    week: 6,
    emoji: "🙏",
    title: { pt: "Pedindo educadamente: 〜てください", en: "Asking politely: 〜てください" },
    subtitle: { pt: "A forma て + 'por favor'", en: "The て-form + 'please'" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "A **forma て** é um dos superpoderes do japonês. Aparece em pedidos, ações em curso, ligações entre frases… Por enquanto, o pedido:",
          en: "The **て-form** is one of Japanese's superpowers. It shows up in requests, ongoing actions, sentence links… For now, the request:",
        },
      },
      {
        kind: "example",
        jp: "ちょっと まって ください。",
        translation: { pt: "Espere um pouco, por favor.", en: "Please wait a moment." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Fórmula: [verbo em forma て] + ください. É como dizer 'faz X pra mim'.",
          en: "Formula: [verb in て-form] + ください. Like saying 'do X for me'.",
        },
      },
    ],
  },
  {
    id: "l6-2",
    week: 6,
    emoji: "🎬",
    title: { pt: "Ações em curso: 〜ています", en: "Ongoing actions: 〜ています" },
    subtitle: { pt: "Como dizer que você está fazendo algo agora", en: "How to say you're doing something now" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Peguem a forma て e cole **います** no fim. Isso vira 'estar fazendo X' — o -ndo do português.",
          en: "Take the て-form and stick **います** at the end. It becomes 'be doing X' — the -ing of English.",
        },
      },
      {
        kind: "example",
        jp: "いま、ごはん を たべて います。",
        translation: { pt: "Estou comendo agora.", en: "I'm eating right now." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Entre amigos, ています vira ~てる: 'たべてる' = 'tô comendo'. É a versão coloquial!",
          en: "Between friends, ています becomes ~てる: 'たべてる' = 'eating'. That's the casual version!",
        },
      },
    ],
  },
];

export function lessonsForWeek(week: number): Lesson[] {
  return LESSONS.filter((l) => l.week === week);
}

export function lessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}
