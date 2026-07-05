import type { Dialogue } from "../types";

/**
 * Diálogos da Semana 1. Cada linha existe nos DOIS registros —
 * o toggle polido⇄casual funciona em qualquer fala, mostrando o mapeamento.
 * politeKana/casualKana: a mesma fala 100% em kana, para quem ainda não lê kanji
 * (só presente quando difere do texto com kanji).
 */
export const DIALOGUES_W1: Dialogue[] = [
  {
    id: "w1-yuki-intro",
    title: { pt: "Conhecendo a Yuki", en: "Meeting Yuki" },
    scene: {
      pt: "Evento de intercâmbio de idiomas. Uma garota de maria-chiquinha roxa senta na sua frente.",
      en: "Language exchange event. A girl with purple twintails sits across from you.",
    },
    register: "casual",
    characterId: "yuki",
    lines: [
      {
        speaker: "yuki",
        polite: "こんにちは！はじめまして。ゆきです。",
        casual: "こんにちは！はじめまして、ゆきだよ〜",
        translation: { pt: "Oi! Prazer, sou a Yuki.", en: "Hi! Nice to meet you, I'm Yuki." },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "はじめまして。よろしくお願いします。",
            politeKana: "はじめまして。よろしくおねがいします。",
            casual: "はじめまして！よろしくね。",
            translation: { pt: "Prazer! Conto com você.", en: "Nice to meet you! Looking forward." },
          },
          {
            polite: "こんにちは。お元気ですか。",
            politeKana: "こんにちは。おげんきですか。",
            casual: "こんにちは！元気？",
            casualKana: "こんにちは！げんき？",
            translation: { pt: "Olá! Tudo bem?", en: "Hello! How are you?" },
          },
        ],
      },
      {
        speaker: "yuki",
        polite: "元気です！日本語の勉強、頑張ってくださいね。",
        politeKana: "げんきです！にほんごのべんきょう、がんばってくださいね。",
        casual: "元気だよ！日本語、頑張ってね〜",
        casualKana: "げんきだよ！にほんご、がんばってね〜",
        translation: { pt: "Tô bem! Boa sorte com o japonês, hein!", en: "I'm good! Good luck with your Japanese!" },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "はい、ありがとうございます！",
            casual: "うん、ありがとう！",
            translation: { pt: "Sim, obrigado(a)!", en: "Yeah, thanks!" },
          },
          {
            polite: "わかりました。お願いします！",
            politeKana: "わかりました。おねがいします！",
            casual: "わかった。お願い！",
            casualKana: "わかった。おねがい！",
            translation: { pt: "Entendi. Por favor (me ajuda)!", en: "Got it. Please (help me)!" },
          },
        ],
      },
      {
        speaker: "yuki",
        polite: "じゃあ、また来週！",
        politeKana: "じゃあ、またらいしゅう！",
        casual: "じゃ、また来週ね〜！",
        casualKana: "じゃ、またらいしゅうね〜！",
        translation: { pt: "Então até semana que vem!", en: "See you next week then!" },
      },
    ],
  },
  {
    id: "w1-kenji-morning",
    title: { pt: "Manhã no escritório", en: "Morning at the office" },
    scene: {
      pt: "Seu primeiro dia de estágio em Tóquio. Kenji, seu colega, chega na sua mesa.",
      en: "Your first day interning in Tokyo. Kenji, your coworker, stops by your desk.",
    },
    register: "polite",
    characterId: "kenji",
    lines: [
      {
        speaker: "kenji",
        polite: "おはようございます。けんじです。よろしくお願いします。",
        politeKana: "おはようございます。けんじです。よろしくおねがいします。",
        casual: "おはよう。けんじだよ。よろしく。",
        translation: { pt: "Bom dia. Sou o Kenji. Prazer, conto com você.", en: "Good morning. I'm Kenji. Nice to work with you." },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "おはようございます！よろしくお願いします。",
            politeKana: "おはようございます！よろしくおねがいします。",
            casual: "おはよう！よろしくね。",
            translation: { pt: "Bom dia! Prazer, conto com você.", en: "Good morning! Nice to work with you too." },
          },
          {
            polite: "はじめまして。すみません、日本語はまだまだです…",
            politeKana: "はじめまして。すみません、にほんごはまだまだです…",
            casual: "はじめまして。ごめん、日本語まだまだ…",
            casualKana: "はじめまして。ごめん、にほんごまだまだ…",
            translation: { pt: "Prazer. Desculpa, meu japonês ainda é fraco…", en: "Nice to meet you. Sorry, my Japanese is still shaky…" },
          },
        ],
      },
      {
        speaker: "kenji",
        polite: "大丈夫ですよ。わからないときは、聞いてください。",
        politeKana: "だいじょうぶですよ。わからないときは、きいてください。",
        casual: "大丈夫だよ。わかんないときは、聞いて。",
        casualKana: "だいじょうぶだよ。わかんないときは、きいて。",
        translation: { pt: "Tranquilo. Quando não entender, pergunte.", en: "No worries. When you don't understand, just ask." },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "はい！ありがとうございます。",
            casual: "うん！ありがとう。",
            translation: { pt: "Sim! Obrigado(a).", en: "Yes! Thank you." },
          },
        ],
      },
      {
        speaker: "kenji",
        polite: "では、また後で。",
        politeKana: "では、またあとで。",
        casual: "じゃ、また後で。",
        casualKana: "じゃ、またあとで。",
        translation: { pt: "Então, até mais tarde.", en: "Well then, see you later." },
      },
    ],
  },
  {
    id: "w1-crush-cafe",
    title: { pt: "Paquera no café ☕", en: "Café crush ☕" },
    scene: {
      pt: "O café perto da estação. Sua paquera já decorou seu pedido — e hoje puxou papo.",
      en: "The café by the station. Your crush memorized your order — and today they're chatting you up.",
    },
    register: "casual",
    characterId: "crush",
    lines: [
      {
        speaker: "crush",
        polite: "こんにちは。いつものコーヒーですか？",
        casual: "こんにちは〜。いつものコーヒー？",
        translation: { pt: "Oi! O café de sempre?", en: "Hi! The usual coffee?" },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "はい、お願いします！",
            politeKana: "はい、おねがいします！",
            casual: "うん、お願い！",
            casualKana: "うん、おねがい！",
            translation: { pt: "Sim, por favor!", en: "Yes, please!" },
          },
          {
            polite: "こんにちは。はい！ありがとうございます。",
            casual: "こんにちは！うん、ありがとう〜",
            translation: { pt: "Oi! Sim, obrigado(a)!", en: "Hi! Yeah, thanks!" },
          },
        ],
      },
      {
        speaker: "crush",
        polite: "日本語、上手ですね。",
        politeKana: "にほんご、じょうずですね。",
        casual: "日本語うまいね！",
        casualKana: "にほんごうまいね！",
        translation: { pt: "Seu japonês tá bom, hein!", en: "Your Japanese is getting good!" },
      },
      {
        speaker: "you",
        polite: "",
        casual: "",
        translation: { pt: "", en: "" },
        choices: [
          {
            polite: "いいえ、まだまだです。",
            casual: "ううん、まだまだだよ〜",
            translation: { pt: "Que nada, ainda falta muito. (humildade obrigatória!)", en: "Nah, still a long way to go. (mandatory humility!)" },
          },
          {
            polite: "ありがとうございます！",
            casual: "ありがとう！",
            translation: { pt: "Obrigado(a)!", en: "Thanks!" },
          },
        ],
      },
      {
        speaker: "crush",
        polite: "コーヒー、どうぞ。また来てくださいね。",
        politeKana: "コーヒー、どうぞ。またきてくださいね。",
        casual: "コーヒーどうぞ。また来てね。",
        casualKana: "コーヒーどうぞ。またきてね。",
        translation: { pt: "Seu café. Volta sempre, tá?", en: "Here's your coffee. Come again, okay?" },
      },
    ],
  },
];
