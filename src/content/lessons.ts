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

  // ── Semana 7 · Adjetivos + が ──
  {
    id: "l7-1",
    week: 7,
    emoji: "🍜",
    title: { pt: "Adjetivos い: descreva o mundo", en: "い-adjectives: describe the world" },
    subtitle: { pt: "Como colar um adjetivo antes de です", en: "How to stick an adjective before です" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Adjetivos que terminam em **い** são a maioria: おいしい (gostoso), たかい (caro), たのしい (divertido). Eles vêm ANTES de です, sem mudar em nada.",
          en: "Adjectives ending in **い** are the majority: おいしい (tasty), たかい (expensive), たのしい (fun). They come BEFORE です, unchanged.",
        },
      },
      {
        kind: "example",
        jp: "この ラーメン は おいしい です。",
        translation: { pt: "Este ramen é gostoso.", en: "This ramen is delicious." },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "Cuidado: NÃO se diz 'おいしい な です' nem 'おいしい だ'. É só おいしい + です, direto.",
          en: "Careful: you do NOT say 'おいしい な です' or 'おいしい だ'. It's just おいしい + です, direct.",
        },
      },
      {
        kind: "compare",
        a: { jp: "この ケーキ は おいしい です", label: { pt: "Este bolo é gostoso", en: "This cake is tasty" } },
        b: { jp: "この ケーキ は たかい です", label: { pt: "Este bolo é caro", en: "This cake is expensive" } },
      },
    ],
  },
  {
    id: "l7-2",
    week: 7,
    emoji: "✨",
    title: { pt: "Adjetivos な: precisam de な pra colar em nome", en: "な-adjectives: need な to attach to a noun" },
    subtitle: { pt: "Uma classe diferente com regra própria", en: "A different class with its own rule" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Existe outra família — os **な-adjetivos**: きれい (bonito/limpo), しずか (calmo), げんき (bem-disposto), しんせつ (gentil). Sozinhos, também usam です.",
          en: "There's another family — the **な-adjectives**: きれい (pretty/clean), しずか (quiet), げんき (well), しんせつ (kind). Alone, they also use です.",
        },
      },
      {
        kind: "example",
        jp: "この カフェ は しずか です。",
        translation: { pt: "Este café é calmo.", en: "This café is quiet." },
      },
      {
        kind: "text",
        body: {
          pt: "Mas quando você quer colar o adjetivo direto em um nome (adjetivo + nome), precisa do **な** entre eles.",
          en: "But when you want to stick the adjective directly onto a noun (adjective + noun), you need **な** between them.",
        },
      },
      {
        kind: "compare",
        a: { jp: "しずか な カフェ", label: { pt: "um café calmo", en: "a quiet café" } },
        b: { jp: "しずか です", label: { pt: "é calmo (frase completa)", en: "is quiet (full sentence)" } },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Como saber? Os い-adj já terminam em い e não pedem partícula. Os な-adj SEMPRE pedem な pra colar em substantivo.",
          en: "How to tell? い-adj already end in い and need no particle. な-adj ALWAYS need な to attach to a noun.",
        },
      },
    ],
  },
  {
    id: "l7-3",
    week: 7,
    emoji: "🤔",
    title: { pt: "Ligando ideias com が (mas)", en: "Linking ideas with が (but)" },
    subtitle: { pt: "Duas frases numa só, com contraste", en: "Two sentences in one, with contrast" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Um **が** no meio de duas frases significa 'mas'. É a maneira educada de fazer contraste, mais suave que 'でも' no início.",
          en: "A **が** between two sentences means 'but'. It's the polite way to contrast, softer than starting with 'でも'.",
        },
      },
      {
        kind: "example",
        jp: "にほんご は むずかしい です が、たのしい です。",
        translation: { pt: "Japonês é difícil, mas divertido.", en: "Japanese is hard, but fun." },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "Cuidado: este が é DIFERENTE do が que marca sujeito. Aqui ele vem colado no fim da 1ª frase, ligando à 2ª.",
          en: "Careful: this が is DIFFERENT from the subject-marker が. Here it hooks onto the end of the 1st clause to link the 2nd.",
        },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Numa conversa, せまい ですが... = 'É apertadinho, mas...' pode até vir sem completar. É um jeito educado de suavizar críticas!",
          en: "In conversation, せまい ですが... = 'It's cramped, but...' can even hang there. A polite way to soften criticism!",
        },
      },
    ],
  },

  // ── Semana 8 · Querer + Convidar ──
  {
    id: "l8-1",
    week: 8,
    emoji: "🍣",
    title: { pt: "Dizer o que você quer: 〜たい", en: "Saying what you want: 〜たい" },
    subtitle: { pt: "'Quero fazer X' — no seu próprio verbo", en: "'I want to do X' — in your own verb" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Pegue qualquer verbo em ます, troque ます por **たい** e adicione です. É 'quero fazer isso'.",
          en: "Take any ます verb, swap ます for **たい** and add です. That's 'I want to do this'.",
        },
      },
      {
        kind: "compare",
        a: { jp: "たべます", label: { pt: "como", en: "I eat" } },
        b: { jp: "たべたい です", label: { pt: "quero comer", en: "I want to eat" } },
      },
      {
        kind: "example",
        jp: "すし を たべたい です。",
        translation: { pt: "Quero comer sushi.", en: "I want to eat sushi." },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "Regra social: 〜たい serve pra falar dos SEUS desejos. Pra perguntar o que o outro quer, use 〜たいですか? — mas cuidado, com superiores soa direto demais. Prefira '何がよろしいですか?'.",
          en: "Social rule: 〜たい talks about YOUR own wants. To ask what someone else wants, use 〜たいですか? — but with superiors it can sound too direct. Prefer '何がよろしいですか?'.",
        },
      },
    ],
  },
  {
    id: "l8-2",
    week: 8,
    emoji: "🎟️",
    title: { pt: "Convidando: 〜ませんか / 〜ましょう", en: "Inviting: 〜ませんか / 〜ましょう" },
    subtitle: { pt: "Como chamar alguém pra fazer algo com você", en: "How to invite someone to do something with you" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Para convidar, troque ます por **ませんか** (que soa como 'não quer...?', um convite educado). Se aceitou e agora quer marcar, use **ましょう** ('vamos!').",
          en: "To invite, swap ます for **ませんか** (sounds like 'won't you...?', a polite invitation). Once accepted, use **ましょう** to seal it ('let's!').",
        },
      },
      {
        kind: "example",
        jp: "いっしょ に いきませんか？",
        translation: { pt: "Vamos juntos? (convite)", en: "Won't you come with me? (invitation)" },
      },
      {
        kind: "example",
        jp: "はい、いきましょう！",
        translation: { pt: "Sim, vamos!", en: "Yes, let's go!" },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Entre amigos, ませんか vira '〜ない？' e ましょう vira '〜よう': 'いかない？' = 'bora?' e 'いこう' = 'bora!'. Casual!",
          en: "Between friends, ませんか becomes '〜ない？' and ましょう becomes '〜よう': 'いかない？' = 'wanna go?' and 'いこう' = 'let's go!'. Casual!",
        },
      },
    ],
  },

  // ── Semana 9 · Dar e receber ──
  {
    id: "l9-1",
    week: 9,
    emoji: "🎁",
    title: { pt: "Dar, receber: あげる・もらう・くれる", en: "Give, receive: あげる・もらう・くれる" },
    subtitle: { pt: "A direção do presente importa!", en: "The direction of the gift matters!" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Em japonês, 'dar' tem DUAS palavras conforme a direção: **あげる** (dou a outra pessoa) e **くれる** (alguém me dá). E receber é **もらう**.",
          en: "In Japanese, 'give' has TWO words based on direction: **あげる** (I give to someone) and **くれる** (someone gives me). And 'receive' is **もらう**.",
        },
      },
      {
        kind: "compare",
        a: { jp: "わたし が あげる", label: { pt: "eu dou (pra outro)", en: "I give (to another)" } },
        b: { jp: "わたし に くれる", label: { pt: "alguém me dá", en: "someone gives me" } },
      },
      {
        kind: "example",
        jp: "これ を あげます。",
        translation: { pt: "Vou te dar isto.", en: "I'll give you this." },
      },
      {
        kind: "example",
        jp: "ともだち に ほん を もらいました。",
        translation: { pt: "Ganhei um livro de um amigo.", en: "I got a book from a friend." },
        note: { pt: "com もらう, quem deu leva に.", en: "with もらう, the giver takes に." },
      },
      {
        kind: "callout",
        tone: "warn",
        body: {
          pt: "Erro clássico: usar あげる quando o presente veio PRA você. Se é pra você, é くれる ou もらう!",
          en: "Classic mistake: using あげる when the gift came TO you. If it's toward you, it's くれる or もらう!",
        },
      },
    ],
  },
  {
    id: "l9-2",
    week: 9,
    emoji: "🙏",
    title: { pt: "Pedir favores: 〜てくれる? / 〜てもらえる?", en: "Asking favors: 〜てくれる? / 〜てもらえる?" },
    subtitle: { pt: "Como pedir ajuda de forma natural", en: "How to ask for help naturally" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Junte a forma **て** de qualquer verbo com **くれる**? — e o pedido vira 'você faz isso pra mim?'.",
          en: "Combine any verb's **て**-form with **くれる**? — the request becomes 'will you do this for me?'.",
        },
      },
      {
        kind: "example",
        jp: "ちょっと てつだって くれる？",
        translation: { pt: "Me ajuda um pouquinho?", en: "Can you help me a sec?" },
      },
      {
        kind: "compare",
        a: { jp: "てつだって ください", label: { pt: "polido: 'Ajude, por favor'", en: "polite: 'Please help'" } },
        b: { jp: "てつだって くれる？", label: { pt: "casual: 'Me ajuda?'", en: "casual: 'Help me out?'" } },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Ainda mais educado: 〜ていただけますか — usa com chefe, cliente. A escada de polidez: 〜てくれる? < 〜てください < 〜ていただけますか.",
          en: "Even more polite: 〜ていただけますか — for bosses, clients. Polite ladder: 〜てくれる? < 〜てください < 〜ていただけますか.",
        },
      },
    ],
  },

  // ── Semana 10 · Conectar ideias ──
  {
    id: "l10-1",
    week: 10,
    emoji: "🔗",
    title: { pt: "Dando motivos: から", en: "Giving reasons: から" },
    subtitle: { pt: "'Porque isso, então aquilo'", en: "'Because of this, so that'" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "**から** no fim de uma frase = 'porque'. A ordem é [motivo] から [consequência] — na cara oposta do português.",
          en: "**から** at the end of a clause = 'because'. Order is [reason] から [consequence] — opposite from English's 'because' clause.",
        },
      },
      {
        kind: "example",
        jp: "あたま が いたい から、かえります。",
        translation: { pt: "Estou com dor de cabeça, então vou pra casa.", en: "My head hurts, so I'm going home." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "Numa conversa você pode responder só o motivo: 'なんで？' → 'あついから' = 'Por quê?' → 'Porque tá quente'.",
          en: "In conversation you can reply with just the reason: 'なんで？' → 'あついから' = 'Why?' → 'Because it's hot'.",
        },
      },
    ],
  },
  {
    id: "l10-2",
    week: 10,
    emoji: "🌀",
    title: { pt: "Contraste falado: けど", en: "Spoken contrast: けど" },
    subtitle: { pt: "O 'mas' que aparece na fala real", en: "The 'but' that shows up in real speech" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "Já vimos が = 'mas' (educado, escrito). Na conversa, **けど** faz o mesmo papel, mais leve e falado.",
          en: "We saw が = 'but' (polite, written). In conversation, **けど** does the same job, lighter and more spoken.",
        },
      },
      {
        kind: "compare",
        a: { jp: "たかい ですが、かいます", label: { pt: "É caro, mas vou comprar (educado)", en: "It's expensive, but I'll buy (polite)" } },
        b: { jp: "たかい けど、かう", label: { pt: "É caro, mas compro (casual)", en: "It's expensive, but I'll buy (casual)" } },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "けど também amacia pedidos: 'いきたい んですけど…' = 'Eu queria ir, mas…' (sugere sem forçar).",
          en: "けど also softens requests: 'いきたい んですけど…' = 'I'd like to go, but…' (suggests without pushing).",
        },
      },
    ],
  },
  {
    id: "l10-3",
    week: 10,
    emoji: "🌉",
    title: { pt: "A ponte entre registros: 〜んです", en: "The register bridge: 〜んです" },
    subtitle: { pt: "'んです' explica, pede explicação, cria conexão", en: "'んです' explains, asks for explanation, creates connection" },
    blocks: [
      {
        kind: "text",
        body: {
          pt: "**〜んです** é uma das coisas mais úteis do japonês. Cola no fim de qualquer frase pra dizer 'é que...', 'sabe...', 'aconteceu que...'. Sinaliza que há CONTEXTO.",
          en: "**〜んです** is one of the most useful things in Japanese. Stick it at the end of any sentence to say 'it's that...', 'you see...', 'the thing is...'. It signals CONTEXT.",
        },
      },
      {
        kind: "compare",
        a: { jp: "どうしましたか？", label: { pt: "O que houve? (neutro)", en: "What's up? (neutral)" } },
        b: { jp: "どうした んですか？", label: { pt: "O que houve? (com interesse real)", en: "What's up? (with real interest)" } },
      },
      {
        kind: "example",
        jp: "あたま が いたい んです。",
        translation: { pt: "É que estou com dor de cabeça.", en: "The thing is, I have a headache." },
      },
      {
        kind: "callout",
        tone: "tip",
        body: {
          pt: "んです é a PONTE 55/45: educado o suficiente pro trabalho, natural o suficiente entre amigos ('んだ' na versão casual).",
          en: "んです is the 55/45 BRIDGE: polite enough for work, natural enough between friends ('んだ' in casual).",
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
