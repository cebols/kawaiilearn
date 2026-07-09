import type { L10n } from "../types";

/**
 * Cenários de sobrevivência de viagem: grafos ramificados onde escolher
 * mal não é "errado" — te leva a um desvio realista (atendente confuso,
 * repetir mais devagar) até você achar o caminho. Registro SEMPRE polido:
 * é o que o viajante usa de fato.
 */

export interface ScenarioLine {
  jp: string;
  /** versão sem kanji para iniciantes */
  jpKana?: string;
  translation: L10n;
}

export interface ScenarioChoice extends ScenarioLine {
  /** id do próximo nó, ou "end:<endingId>" */
  next: string;
}

export interface ScenarioNode {
  id: string;
  npc: ScenarioLine;
  choices: ScenarioChoice[];
}

export interface ScenarioEnding {
  emoji: string;
  title: L10n;
  text: L10n;
  /** conta como vitória (para tracking) */
  ok: boolean;
}

export interface Scenario {
  id: string;
  week: number;
  emoji: string;
  title: L10n;
  place: L10n;
  goal: L10n;
  start: string;
  nodes: Record<string, ScenarioNode>;
  endings: Record<string, ScenarioEnding>;
}

export const SCENARIOS: Scenario[] = [
  // ═══════════ 🍜 RESTAURANTE (semana 4) ═══════════
  {
    id: "sc-restaurant",
    week: 4,
    emoji: "🍜",
    title: { pt: "Pedir num restaurante", en: "Ordering at a restaurant" },
    place: { pt: "Casa de lámen perto da estação", en: "Ramen shop near the station" },
    goal: { pt: "Sentar, pedir comida e bebida, e pagar", en: "Sit, order food and a drink, and pay" },
    start: "n1",
    nodes: {
      n1: {
        id: "n1",
        npc: {
          jp: "いらっしゃいませ！何名様ですか？",
          jpKana: "いらっしゃいませ！なんめいさまですか？",
          translation: { pt: "Bem-vindo! Quantas pessoas?", en: "Welcome! How many people?" },
        },
        choices: [
          {
            jp: "一人です。",
            jpKana: "ひとりです。",
            translation: { pt: "Uma pessoa.", en: "One person." },
            next: "n2",
          },
          {
            jp: "こんにちは！",
            translation: { pt: "Olá! (não respondeu a pergunta)", en: "Hello! (didn't answer)" },
            next: "n1b",
          },
        ],
      },
      n1b: {
        id: "n1b",
        npc: {
          jp: "こんにちは！えっと…何名様ですか？",
          jpKana: "こんにちは！えっと…なんめいさまですか？",
          translation: { pt: "Olá! Er… quantas pessoas?", en: "Hello! Er… how many people?" },
        },
        choices: [
          {
            jp: "一人です。",
            jpKana: "ひとりです。",
            translation: { pt: "Uma pessoa.", en: "One person." },
            next: "n2",
          },
        ],
      },
      n2: {
        id: "n2",
        npc: {
          jp: "こちらへどうぞ。メニューです。ご注文は？",
          jpKana: "こちらへどうぞ。メニューです。ごちゅうもんは？",
          translation: { pt: "Por aqui. O cardápio. O que vai pedir?", en: "This way. Here's the menu. Your order?" },
        },
        choices: [
          {
            jp: "ラーメンをください。",
            translation: { pt: "Um lámen, por favor.", en: "Ramen, please." },
            next: "n3",
          },
          {
            jp: "これをください。",
            translation: { pt: "Este aqui, por favor. (apontando o cardápio)", en: "This one, please. (pointing)" },
            next: "n3",
          },
          {
            jp: "おいしいです！",
            translation: { pt: "É gostoso! (você ainda nem comeu…)", en: "It's tasty! (you haven't eaten yet…)" },
            next: "n2b",
          },
        ],
      },
      n2b: {
        id: "n2b",
        npc: {
          jp: "え？あ、はい…ご注文はお決まりですか？",
          jpKana: "え？あ、はい…ごちゅうもんはおきまりですか？",
          translation: { pt: "Hã? Ah, sim… já decidiu o pedido?", en: "Huh? Ah, yes… decided on your order?" },
        },
        choices: [
          {
            jp: "ラーメンをください。",
            translation: { pt: "Um lámen, por favor.", en: "Ramen, please." },
            next: "n3",
          },
        ],
      },
      n3: {
        id: "n3",
        npc: {
          jp: "はい！お飲み物はいかがですか？",
          jpKana: "はい！おのみものはいかがですか？",
          translation: { pt: "Certo! E pra beber?", en: "Sure! Anything to drink?" },
        },
        choices: [
          {
            jp: "水をください。",
            jpKana: "みずをください。",
            translation: { pt: "Água, por favor.", en: "Water, please." },
            next: "n4",
          },
          {
            jp: "大丈夫です。",
            jpKana: "だいじょうぶです。",
            translation: { pt: "Estou bem assim, obrigado(a).", en: "I'm fine, thanks." },
            next: "n4",
          },
        ],
      },
      n4: {
        id: "n4",
        npc: {
          jp: "（食べ終わって）お会計は950円です。",
          jpKana: "（たべおわって）おかいけいは950えんです。",
          translation: { pt: "(depois de comer) A conta dá ¥950.", en: "(after eating) That'll be ¥950." },
        },
        choices: [
          {
            jp: "はい、お願いします。",
            jpKana: "はい、おねがいします。",
            translation: { pt: "Sim, por favor. (paga em dinheiro)", en: "Yes, please. (pays cash)" },
            next: "end:ok",
          },
          {
            jp: "カードで大丈夫ですか？",
            jpKana: "カードでだいじょうぶですか？",
            translation: { pt: "Cartão tá bom?", en: "Is card okay?" },
            next: "end:card",
          },
        ],
      },
    },
    endings: {
      ok: {
        emoji: "🎉",
        ok: true,
        title: { pt: "Missão cumprida!", en: "Mission complete!" },
        text: { pt: "Você pediu, comeu e pagou — tudo em japonês. ごちそうさまでした！", en: "You ordered, ate and paid — all in Japanese. ごちそうさまでした!" },
      },
      card: {
        emoji: "💳",
        ok: true,
        title: { pt: "Pagou no cartão como um local!", en: "Paid by card like a local!" },
        text: { pt: "「カードで大丈夫ですか？」 é a pergunta que abre portas no Japão inteiro.", en: "「カードで大丈夫ですか？」 opens doors all over Japan." },
      },
    },
  },

  // ═══════════ 💊 FARMÁCIA (semana 5) ═══════════
  {
    id: "sc-pharmacy",
    week: 5,
    emoji: "💊",
    title: { pt: "Comprar remédio na farmácia", en: "Buying medicine at the pharmacy" },
    place: { pt: "Drogaria de bairro", en: "Neighborhood drugstore" },
    goal: { pt: "Explicar o sintoma e sair com o remédio certo", en: "Explain the symptom and leave with the right medicine" },
    start: "n1",
    nodes: {
      n1: {
        id: "n1",
        npc: {
          jp: "いらっしゃいませ。どうしましたか？",
          translation: { pt: "Bem-vindo. O que aconteceu?", en: "Welcome. What's the matter?" },
        },
        choices: [
          {
            jp: "頭が痛いです。",
            jpKana: "あたまがいたいです。",
            translation: { pt: "Estou com dor de cabeça.", en: "I have a headache." },
            next: "n2",
          },
          {
            jp: "薬をください。",
            jpKana: "くすりをください。",
            translation: { pt: "Me dá um remédio. (remédio pra quê?)", en: "Give me medicine. (for what?)" },
            next: "n1b",
          },
        ],
      },
      n1b: {
        id: "n1b",
        npc: {
          jp: "はい、どんな薬ですか？どこか痛いですか？",
          jpKana: "はい、どんなくすりですか？どこかいたいですか？",
          translation: { pt: "Sim, que tipo de remédio? Dói em algum lugar?", en: "Sure, what kind? Does something hurt?" },
        },
        choices: [
          {
            jp: "頭が痛いです。",
            jpKana: "あたまがいたいです。",
            translation: { pt: "Minha cabeça dói.", en: "My head hurts." },
            next: "n2",
          },
        ],
      },
      n2: {
        id: "n2",
        npc: {
          jp: "そうですか。いつからですか？",
          translation: { pt: "Entendo. Desde quando?", en: "I see. Since when?" },
        },
        choices: [
          {
            jp: "昨日からです。",
            jpKana: "きのうからです。",
            translation: { pt: "Desde ontem.", en: "Since yesterday." },
            next: "n3",
          },
          {
            jp: "今朝からです。",
            jpKana: "けさからです。",
            translation: { pt: "Desde hoje de manhã.", en: "Since this morning." },
            next: "n3",
          },
        ],
      },
      n3: {
        id: "n3",
        npc: {
          jp: "この薬はどうですか？一日二回、食後に飲んでください。",
          jpKana: "このくすりはどうですか？いちにちにかい、しょくごにのんでください。",
          translation: { pt: "Que tal este? Tome 2x ao dia, depois das refeições.", en: "How about this one? Twice a day, after meals." },
        },
        choices: [
          {
            jp: "はい、それをください。",
            translation: { pt: "Sim, esse mesmo.", en: "Yes, that one please." },
            next: "end:ok",
          },
          {
            jp: "もっと安いのはありますか？",
            jpKana: "もっとやすいのはありますか？",
            translation: { pt: "Tem um mais barato?", en: "Is there a cheaper one?" },
            next: "n3b",
          },
        ],
      },
      n3b: {
        id: "n3b",
        npc: {
          jp: "こちらは少し安いですよ。同じ効果です。",
          jpKana: "こちらはすこしやすいですよ。おなじこうかです。",
          translation: { pt: "Este é um pouco mais barato. Mesmo efeito.", en: "This one's a bit cheaper. Same effect." },
        },
        choices: [
          {
            jp: "じゃあ、それをください。",
            translation: { pt: "Então esse, por favor.", en: "That one then, please." },
            next: "end:smart",
          },
        ],
      },
    },
    endings: {
      ok: {
        emoji: "🎉",
        ok: true,
        title: { pt: "Remédio na mão!", en: "Medicine in hand!" },
        text: { pt: "Você explicou o sintoma, entendeu a posologia e comprou. お大事に (melhoras)!", en: "You explained the symptom, understood the dosage and bought it. お大事に!" },
      },
      smart: {
        emoji: "💰",
        ok: true,
        title: { pt: "Comprou E economizou!", en: "Bought it AND saved money!" },
        text: { pt: "「もっと安いのはありますか？」 é ouro em qualquer loja do Japão.", en: "「もっと安いのはありますか？」 is gold in any store in Japan." },
      },
    },
  },

  // ═══════════ 🚕 TÁXI (semana 6) ═══════════
  {
    id: "sc-taxi",
    week: 6,
    emoji: "🚕",
    title: { pt: "Pegar um táxi", en: "Taking a taxi" },
    place: { pt: "Ponto de táxi na saída da estação", en: "Taxi stand outside the station" },
    goal: { pt: "Dizer o destino, negociar o trajeto e pagar", en: "Say the destination, handle the ride and pay" },
    start: "n1",
    nodes: {
      n1: {
        id: "n1",
        npc: {
          jp: "どちらまでですか？",
          translation: { pt: "Para onde?", en: "Where to?" },
        },
        choices: [
          {
            jp: "ホテルサクラまでお願いします。",
            jpKana: "ホテルサクラまでおねがいします。",
            translation: { pt: "Até o Hotel Sakura, por favor.", en: "To Hotel Sakura, please." },
            next: "n2",
          },
          {
            jp: "これ、お願いします。",
            jpKana: "これ、おねがいします。",
            translation: { pt: "Isto, por favor. (mostra o endereço no celular)", en: "This, please. (shows address on phone)" },
            next: "n2",
          },
        ],
      },
      n2: {
        id: "n2",
        npc: {
          jp: "ホテルサクラですね。少し時間がかかりますよ。",
          jpKana: "ホテルサクラですね。すこしじかんがかかりますよ。",
          translation: { pt: "Hotel Sakura, certo. Vai demorar um pouquinho.", en: "Hotel Sakura, got it. It'll take a little while." },
        },
        choices: [
          {
            jp: "大丈夫です。",
            jpKana: "だいじょうぶです。",
            translation: { pt: "Tudo bem.", en: "That's fine." },
            next: "n3",
          },
          {
            jp: "いくらぐらいですか？",
            translation: { pt: "Quanto fica, mais ou menos?", en: "About how much?" },
            next: "n2b",
          },
        ],
      },
      n2b: {
        id: "n2b",
        npc: {
          jp: "2000円ぐらいですね。",
          jpKana: "2000えんぐらいですね。",
          translation: { pt: "Uns ¥2.000.", en: "About ¥2,000." },
        },
        choices: [
          {
            jp: "わかりました。お願いします。",
            jpKana: "わかりました。おねがいします。",
            translation: { pt: "Entendi. Vamos.", en: "Got it. Let's go." },
            next: "n3",
          },
        ],
      },
      n3: {
        id: "n3",
        npc: {
          jp: "着きました。2100円です。",
          jpKana: "つきました。2100えんです。",
          translation: { pt: "Chegamos. São ¥2.100.", en: "We're here. ¥2,100." },
        },
        choices: [
          {
            jp: "カードで払えますか？",
            jpKana: "カードではらえますか？",
            translation: { pt: "Posso pagar no cartão?", en: "Can I pay by card?" },
            next: "end:card",
          },
          {
            jp: "はい。ありがとうございました。",
            translation: { pt: "Sim. Obrigado(a)! (paga em dinheiro)", en: "Yes. Thank you! (pays cash)" },
            next: "end:ok",
          },
        ],
      },
    },
    endings: {
      ok: {
        emoji: "🎉",
        ok: true,
        title: { pt: "Chegou no hotel!", en: "Made it to the hotel!" },
        text: { pt: "Dica de ouro: no Japão a porta do táxi abre SOZINHA. Não puxa! 😄", en: "Golden tip: taxi doors in Japan open BY THEMSELVES. Don't pull! 😄" },
      },
      card: {
        emoji: "💳",
        ok: true,
        title: { pt: "Cartão aceito, viagem tranquila!", en: "Card accepted, smooth ride!" },
        text: { pt: "「カードで払えますか？」 antes de descer evita qualquer aperto.", en: "「カードで払えますか？」 before getting out saves any awkwardness." },
      },
    },
  },
];

export function scenariosForWeek(week: number): Scenario[] {
  return SCENARIOS.filter((s) => s.week <= week);
}

export const scenarioById = (id: string): Scenario | undefined => SCENARIOS.find((s) => s.id === id);
