import type { Dialogue } from "../types";

/**
 * Diálogos da Semana 1. Cada linha existe nos DOIS registros —
 * o toggle polido⇄casual funciona em qualquer fala, mostrando o mapeamento.
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
            casual: "はじめまして！よろしくね。",
            translation: { pt: "Prazer! Conto com você.", en: "Nice to meet you! Looking forward." },
          },
          {
            polite: "こんにちは。お元気ですか。",
            casual: "こんにちは！元気？",
            translation: { pt: "Olá! Tudo bem?", en: "Hello! How are you?" },
          },
        ],
      },
      {
        speaker: "yuki",
        polite: "元気です！日本語の勉強、頑張ってくださいね。",
        casual: "元気だよ！日本語、頑張ってね〜",
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
            casual: "わかった。お願い！",
            translation: { pt: "Entendi. Por favor (me ajuda)!", en: "Got it. Please (help me)!" },
          },
        ],
      },
      {
        speaker: "yuki",
        polite: "じゃあ、また来週！",
        casual: "じゃ、またね〜！",
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
        casual: "おはよう。けんじね。よろしく。",
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
            casual: "おはよう！よろしくね。",
            translation: { pt: "Bom dia! Prazer, conto com você.", en: "Good morning! Nice to work with you too." },
          },
          {
            polite: "はじめまして。すみません、日本語はまだまだです…",
            casual: "はじめまして。ごめん、日本語まだまだ…",
            translation: { pt: "Prazer. Desculpa, meu japonês ainda é fraco…", en: "Nice to meet you. Sorry, my Japanese is still shaky…" },
          },
        ],
      },
      {
        speaker: "kenji",
        polite: "大丈夫ですよ。わからないときは、聞いてください。",
        casual: "大丈夫だよ。わかんないときは、聞いて。",
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
        casual: "じゃ、また後で。",
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
            casual: "うん、お願い！",
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
        casual: "日本語うまいね！",
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
        polite: "コーヒー、どうぞ。またお願いします。",
        casual: "コーヒーどうぞ。また来てね。",
        translation: { pt: "Seu café. Volta sempre, tá?", en: "Here's your coffee. Come again, okay?" },
      },
    ],
  },
];
