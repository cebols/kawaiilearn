import type { L10n } from "../types";

/**
 * Conversação "livre" por slots — sem LLM, offline, custo zero.
 * O personagem faz uma pergunta aberta; você compõe a resposta com o
 * template + vocabulário do pool; ele REAGE de acordo com a sua escolha.
 * Parece livre porque cada pergunta tem muitas respostas válidas e cada
 * resposta tem reação própria — mas tudo é gramática já ensinada.
 */

export interface SlotOption {
  id: string;
  jp: string;
  translation: L10n;
  /** reação do personagem a ESTA escolha */
  reaction: { jp: string; jpKana?: string; translation: L10n };
}

export interface SlotQuestion {
  id: string;
  question: { jp: string; jpKana?: string; translation: L10n };
  /** template da resposta; ___ é onde entra a escolha */
  template: { jp: string; translation: L10n };
  options: SlotOption[];
}

export interface SlotTalk {
  id: string;
  characterId: string;
  week: number;
  title: L10n;
  questions: SlotQuestion[];
}

export const SLOT_TALKS: SlotTalk[] = [
  {
    id: "st-yuki",
    characterId: "yuki",
    week: 13,
    title: { pt: "Papo livre com a Yuki", en: "Free talk with Yuki" },
    questions: [
      {
        id: "q1",
        question: {
          jp: "ねえ、今日何を食べた？",
          jpKana: "ねえ、きょうなにをたべた？",
          translation: { pt: "Ei, o que você comeu hoje?", en: "Hey, what did you eat today?" },
        },
        template: { jp: "___ を たべた", translation: { pt: "comi ___", en: "I ate ___" } },
        options: [
          { id: "ramen", jp: "ラーメン", translation: { pt: "lámen", en: "ramen" }, reaction: { jp: "いいね！ラーメン最高！どこの？", jpKana: "いいね！ラーメンさいこう！どこの？", translation: { pt: "Boa! Lámen é o melhor! De onde?", en: "Nice! Ramen's the best! From where?" } } },
          { id: "sushi", jp: "すし", translation: { pt: "sushi", en: "sushi" }, reaction: { jp: "えー、いいなあ！私も食べたい！", jpKana: "えー、いいなあ！わたしもたべたい！", translation: { pt: "Ahh que inveja! Também quero!", en: "Ahh jealous! I want some too!" } } },
          { id: "pizza", jp: "ピザ", translation: { pt: "pizza", en: "pizza" }, reaction: { jp: "ピザかー！何枚食べた？笑", jpKana: "ピザかー！なんまいたべた？わら", translation: { pt: "Pizza! Quantas fatias? kkk", en: "Pizza! How many slices? lol" } } },
          { id: "pan", jp: "パン", translation: { pt: "pão", en: "bread" }, reaction: { jp: "シンプル！朝ごはん？", jpKana: "シンプル！あさごはん？", translation: { pt: "Simples! Café da manhã?", en: "Simple! Breakfast?" } } },
          { id: "curry", jp: "カレー", translation: { pt: "curry", en: "curry" }, reaction: { jp: "カレー！日本のカレー、おいしいよね〜", jpKana: "カレー！にほんのカレー、おいしいよね〜", translation: { pt: "Curry! O curry japonês é ótimo, né~", en: "Curry! Japanese curry is so good~" } } },
        ],
      },
      {
        id: "q2",
        question: {
          jp: "今、何を飲みたい？",
          jpKana: "いま、なにをのみたい？",
          translation: { pt: "O que você quer beber agora?", en: "What do you want to drink now?" },
        },
        template: { jp: "___ を のみたい", translation: { pt: "quero beber ___", en: "I want to drink ___" } },
        options: [
          { id: "coffee", jp: "コーヒー", translation: { pt: "café", en: "coffee" }, reaction: { jp: "私も！カフェ行こうよ！", jpKana: "わたしも！カフェいこうよ！", translation: { pt: "Eu também! Bora num café!", en: "Me too! Let's hit a café!" } } },
          { id: "ocha", jp: "おちゃ", translation: { pt: "chá", en: "tea" }, reaction: { jp: "おちゃ？おばあちゃんみたい！笑", translation: { pt: "Chá? Parece a vovó! kkk", en: "Tea? You sound like grandma! lol" } } },
          { id: "mizu", jp: "みず", translation: { pt: "água", en: "water" }, reaction: { jp: "健康的だね〜えらい！", jpKana: "けんこうてきだね〜えらい！", translation: { pt: "Saudável, hein~ parabéns!", en: "So healthy~ good for you!" } } },
          { id: "beer", jp: "ビール", translation: { pt: "cerveja", en: "beer" }, reaction: { jp: "まだ早いよ！笑 でもわかる〜", jpKana: "まだはやいよ！わら でもわかる〜", translation: { pt: "Cedo demais! kkk Mas te entendo~", en: "Too early! lol But I get it~" } } },
          { id: "juice", jp: "ジュース", translation: { pt: "suco", en: "juice" }, reaction: { jp: "何のジュース？オレンジ？", jpKana: "なんのジュース？オレンジ？", translation: { pt: "Suco de quê? Laranja?", en: "What juice? Orange?" } } },
        ],
      },
      {
        id: "q3",
        question: {
          jp: "日本のどこに行きたい？",
          jpKana: "にほんのどこにいきたい？",
          translation: { pt: "Onde você quer ir no Japão?", en: "Where in Japan do you want to go?" },
        },
        template: { jp: "___ に いきたい", translation: { pt: "quero ir a ___", en: "I want to go to ___" } },
        options: [
          { id: "tokyo", jp: "とうきょう", translation: { pt: "Tóquio", en: "Tokyo" }, reaction: { jp: "東京いいよ〜！渋谷案内するね！", jpKana: "とうきょういいよ〜！しぶやあんないするね！", translation: { pt: "Tóquio é demais! Te mostro Shibuya!", en: "Tokyo rocks! I'll show you Shibuya!" } } },
          { id: "kyoto", jp: "きょうと", translation: { pt: "Kyoto", en: "Kyoto" }, reaction: { jp: "京都！お寺きれいだよね〜", jpKana: "きょうと！おてらきれいだよね〜", translation: { pt: "Kyoto! Os templos são lindos~", en: "Kyoto! The temples are gorgeous~" } } },
          { id: "okinawa", jp: "おきなわ", translation: { pt: "Okinawa", en: "Okinawa" }, reaction: { jp: "海！いいなあ、夏に行こうよ！", jpKana: "うみ！いいなあ、なつにいこうよ！", translation: { pt: "Praia! Bora no verão!", en: "Beach! Let's go in summer!" } } },
          { id: "osaka", jp: "おおさか", translation: { pt: "Osaka", en: "Osaka" }, reaction: { jp: "大阪は食べ物が最高！たこ焼き！", jpKana: "おおさかはたべものがさいこう！たこやき！", translation: { pt: "Osaka tem a melhor comida! Takoyaki!", en: "Osaka has the best food! Takoyaki!" } } },
          { id: "hokkaido", jp: "ほっかいどう", translation: { pt: "Hokkaido", en: "Hokkaido" }, reaction: { jp: "雪！スキーできる？", jpKana: "ゆき！スキーできる？", translation: { pt: "Neve! Você sabe esquiar?", en: "Snow! Can you ski?" } } },
        ],
      },
      {
        id: "q4",
        question: {
          jp: "週末、何をする？",
          jpKana: "しゅうまつ、なにをする？",
          translation: { pt: "O que você vai fazer no fim de semana?", en: "What are you doing this weekend?" },
        },
        template: { jp: "___ を する", translation: { pt: "vou fazer ___", en: "I'll do ___" } },
        options: [
          { id: "kaimono", jp: "かいもの", translation: { pt: "compras", en: "shopping" }, reaction: { jp: "何買うの？ついていっていい？", jpKana: "なにかうの？ついていっていい？", translation: { pt: "Comprar o quê? Posso ir junto?", en: "Buying what? Can I come?" } } },
          { id: "benkyou", jp: "べんきょう", translation: { pt: "estudar", en: "studying" }, reaction: { jp: "まじめだね〜日本語？えらい！", translation: { pt: "Que dedicação~ japonês? Orgulho!", en: "So diligent~ Japanese? Proud of you!" } } },
          { id: "karaoke", jp: "カラオケ", translation: { pt: "karaokê", en: "karaoke" }, reaction: { jp: "え！私も行く！何歌うの？", jpKana: "え！わたしもいく！なにうたうの？", translation: { pt: "Ei! Eu vou também! O que vai cantar?", en: "Hey! I'm coming! What are you singing?" } } },
          { id: "game", jp: "ゲーム", translation: { pt: "videogame", en: "gaming" }, reaction: { jp: "何のゲーム？私、負けないよ！", jpKana: "なんのゲーム？わたし、まけないよ！", translation: { pt: "Qual jogo? Não vou perder, hein!", en: "What game? I won't lose!" } } },
          { id: "ryokou", jp: "りょこう", translation: { pt: "viajar", en: "traveling" }, reaction: { jp: "旅行！？どこどこ？？", jpKana: "りょこう！？どこどこ？？", translation: { pt: "Viagem?! Pra onde, pra onde??", en: "A trip?! Where, where??" } } },
        ],
      },
      {
        id: "q5",
        question: {
          jp: "何が好き？",
          jpKana: "なにがすき？",
          translation: { pt: "Do que você gosta?", en: "What do you like?" },
        },
        template: { jp: "___ が すき", translation: { pt: "gosto de ___", en: "I like ___" } },
        options: [
          { id: "neko", jp: "ねこ", translation: { pt: "gatos", en: "cats" }, reaction: { jp: "ねこ！うちのねこ見せてあげる🐱", jpKana: "ねこ！うちのねこみせてあげる", translation: { pt: "Gatos! Te mostro o meu 🐱", en: "Cats! I'll show you mine 🐱" } } },
          { id: "inu", jp: "いぬ", translation: { pt: "cachorros", en: "dogs" }, reaction: { jp: "いぬ派か〜！しば犬かわいいよね", jpKana: "いぬはか〜！しばいぬかわいいよね", translation: { pt: "Time cachorro! Shiba é fofo demais né", en: "Dog person! Shibas are so cute right" } } },
          { id: "anime", jp: "アニメ", translation: { pt: "anime", en: "anime" }, reaction: { jp: "どのアニメ？？語ろ！！", jpKana: "どのアニメ？？かたろ！！", translation: { pt: "Qual anime?? Bora conversar!!", en: "Which anime?? Let's talk!!" } } },
          { id: "ongaku", jp: "おんがく", translation: { pt: "música", en: "music" }, reaction: { jp: "私も！今度ライブ行こうよ！", jpKana: "わたしも！こんどライブいこうよ！", translation: { pt: "Eu também! Bora num show!", en: "Me too! Let's hit a live show!" } } },
          { id: "sports", jp: "スポーツ", translation: { pt: "esportes", en: "sports" }, reaction: { jp: "何のスポーツ？サッカー？", jpKana: "なんのスポーツ？サッカー？", translation: { pt: "Qual esporte? Futebol?", en: "What sport? Soccer?" } } },
        ],
      },
      {
        id: "q6",
        question: {
          jp: "最近、何を見てる？",
          jpKana: "さいきん、なにをみてる？",
          translation: { pt: "O que você anda assistindo?", en: "What are you watching lately?" },
        },
        template: { jp: "___ を みてる", translation: { pt: "estou assistindo ___", en: "I'm watching ___" } },
        options: [
          { id: "anime2", jp: "アニメ", translation: { pt: "anime", en: "anime" }, reaction: { jp: "また？笑 おすすめ教えて！", jpKana: "また？わら おすすめおしえて！", translation: { pt: "De novo? kkk Me indica um!", en: "Again? lol Recommend me one!" } } },
          { id: "drama", jp: "ドラマ", translation: { pt: "dorama", en: "a drama" }, reaction: { jp: "日本のドラマ？韓国の？", jpKana: "にほんのドラマ？かんこくの？", translation: { pt: "Dorama japonês? Coreano?", en: "Japanese drama? Korean?" } } },
          { id: "eiga", jp: "えいが", translation: { pt: "filmes", en: "movies" }, reaction: { jp: "映画いいね！今度いっしょに見よう！", jpKana: "えいがいいね！こんどいっしょにみよう！", translation: { pt: "Filme, boa! Vamos ver um juntos!", en: "Movies, nice! Let's watch one together!" } } },
          { id: "youtube", jp: "ユーチューブ", translation: { pt: "YouTube", en: "YouTube" }, reaction: { jp: "わかる〜止まらないよね笑", jpKana: "わかる〜とまらないよねわら", translation: { pt: "Te entendo~ não dá pra parar kkk", en: "I know~ you can't stop lol" } } },
        ],
      },
      {
        id: "q7",
        question: {
          jp: "あした、どこで会う？",
          jpKana: "あした、どこであう？",
          translation: { pt: "Onde a gente se encontra amanhã?", en: "Where shall we meet tomorrow?" },
        },
        template: { jp: "___ で あおう", translation: { pt: "vamos nos ver em/no ___", en: "let's meet at ___" } },
        options: [
          { id: "cafe", jp: "カフェ", translation: { pt: "café", en: "the café" }, reaction: { jp: "おっけー！パンケーキ食べよ！", jpKana: "おっけー！パンケーキたべよ！", translation: { pt: "Fechou! Bora comer panqueca!", en: "OK! Let's get pancakes!" } } },
          { id: "eki", jp: "えき", translation: { pt: "estação", en: "the station" }, reaction: { jp: "駅ね！何時にする？", jpKana: "えきね！なんじにする？", translation: { pt: "Na estação! Que horas?", en: "The station! What time?" } } },
          { id: "kouen", jp: "こうえん", translation: { pt: "parque", en: "the park" }, reaction: { jp: "こうえん！お弁当持っていくね🍱", jpKana: "こうえん！おべんとうもっていくね", translation: { pt: "Parque! Levo um bentô 🍱", en: "The park! I'll bring a bento 🍱" } } },
          { id: "toshokan", jp: "としょかん", translation: { pt: "biblioteca", en: "the library" }, reaction: { jp: "べんきょうデート？笑 いいよ！", translation: { pt: "Date de estudos? kkk Bora!", en: "Study date? lol Sure!" } } },
        ],
      },
      {
        id: "q8",
        question: {
          jp: "今、何がほしい？",
          jpKana: "いま、なにがほしい？",
          translation: { pt: "O que você quer (ter) agora?", en: "What do you want right now?" },
        },
        template: { jp: "___ が ほしい", translation: { pt: "quero (ter) ___", en: "I want ___" } },
        options: [
          { id: "sumaho", jp: "スマホ", translation: { pt: "um celular novo", en: "a new phone" }, reaction: { jp: "新しいの出たもんね〜たかいけど！", jpKana: "あたらしいのでたもんね〜たかいけど！", translation: { pt: "Saiu um novo né~ mas tá caro!", en: "The new one just dropped~ pricey though!" } } },
          { id: "camera", jp: "カメラ", translation: { pt: "uma câmera", en: "a camera" }, reaction: { jp: "旅行のため？いいね！", jpKana: "りょこうのため？いいね！", translation: { pt: "Pra viagem? Boa!", en: "For the trip? Nice!" } } },
          { id: "kutsu", jp: "くつ", translation: { pt: "sapatos", en: "shoes" }, reaction: { jp: "かいものいこ！私も見たい！", jpKana: "かいものいこ！わたしもみたい！", translation: { pt: "Bora às compras! Quero ver também!", en: "Shopping time! I wanna look too!" } } },
          { id: "okane", jp: "おかね", translation: { pt: "dinheiro", en: "money" }, reaction: { jp: "それな！！！笑", translation: { pt: "GRANDE verdade!!! kkk", en: "SO true!!! lol" } } },
        ],
      },
    ],
  },
];

export const slotTalkById = (id: string): SlotTalk | undefined => SLOT_TALKS.find((s) => s.id === id);
