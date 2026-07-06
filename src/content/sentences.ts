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

  // ── aprofundamento das semanas 4–7 ──
  { id: "s4-3", week: 4, tiles: ["まいにち", "にほんご", "を", "べんきょうします"], translation: { pt: "Estudo japonês todo dia.", en: "I study Japanese every day." }, note: { pt: "まいにち = todo dia; ます também cobre o hábito.", en: "まいにち = every day; ます also covers habits." } },
  { id: "s5-3", week: 5, tiles: ["なにも", "たべませんでした"], translation: { pt: "Não comi nada.", en: "I didn't eat anything." }, note: { pt: "なにも + negativo = 'nada'.", en: "なにも + negative = 'nothing'." } },
  { id: "s6-3", week: 6, tiles: ["ここ", "に", "なまえ", "を", "かいて", "ください"], translation: { pt: "Escreva seu nome aqui.", en: "Write your name here." }, note: { pt: "に marca o lugar onde algo fica/entra.", en: "に marks where something goes." } },
  { id: "s7-3", week: 7, tiles: ["あの", "レストラン", "は", "たかいです"], translation: { pt: "Aquele restaurante é caro.", en: "That restaurant is expensive." }, note: { pt: "あの = aquele (longe de nós dois).", en: "あの = that (far from both of us)." } },

  // ── Semana 9 · dar e receber ──
  { id: "s9-1", week: 9, tiles: ["これ", "を", "あげます"], translation: { pt: "Vou te dar isto.", en: "I'll give you this." }, note: { pt: "あげる = dar (de mim/de alguém para outro).", en: "あげる = to give (outward)." } },
  { id: "s9-2", week: 9, tiles: ["ともだち", "に", "ほん", "を", "もらいました"], translation: { pt: "Ganhei um livro de um amigo.", en: "I got a book from a friend." }, note: { pt: "もらう = receber; に marca de quem.", en: "もらう = to receive; に marks the giver." } },
  { id: "s9-3", week: 9, tiles: ["ちょっと", "てつだって", "くれる？"], translation: { pt: "Me ajuda um pouquinho?", en: "Can you help me a sec?" }, note: { pt: "〜てくれる = fazer um favor pra mim (casual).", en: "〜てくれる = do a favor for me (casual)." } },

  // ── Semana 10 · conectar ideias ──
  { id: "s10-1", week: 10, tiles: ["あたま", "が", "いたい", "から", "かえります"], translation: { pt: "Estou com dor de cabeça, então vou pra casa.", en: "My head hurts, so I'm going home." }, note: { pt: "から = porque/então (dá o motivo).", en: "から = because/so (gives the reason)." } },
  { id: "s10-2", week: 10, tiles: ["たかい", "けど", "かいます"], translation: { pt: "É caro, mas vou comprar.", en: "It's expensive, but I'll buy it." }, note: { pt: "けど = mas (mais suave e falado que が).", en: "けど = but (softer, more spoken than が)." } },
  { id: "s10-3", week: 10, tiles: ["どうした", "んですか"], translation: { pt: "O que aconteceu? (com interesse)", en: "What's wrong? (with interest)" }, note: { pt: "〜んです pede/dá explicação — a ponte entre registros.", en: "〜んです asks for/gives an explanation — the register bridge." } },

  // ── Semana 11 · aizuchi e fillers ──
  { id: "s11-1", week: 11, tiles: ["きょう", "は", "さむい", "ね"], translation: { pt: "Tá frio hoje, né?", en: "It's cold today, isn't it?" }, note: { pt: "ね busca concordância — o 'né?' japonês.", en: "ね seeks agreement — the Japanese 'right?'." } },
  { id: "s11-2", week: 11, tiles: ["それ", "いい", "よ"], translation: { pt: "Isso é bom, viu.", en: "That's good, you know." }, note: { pt: "よ dá informação nova / ênfase.", en: "よ adds new info / emphasis." } },
  { id: "s11-3", week: 11, tiles: ["えっと", "なんか", "つかれた"], translation: { pt: "Éé, tipo, deu um cansaço.", en: "Umm, like, I'm kinda tired." }, note: { pt: "えっと・なんか = fillers pra ganhar tempo.", en: "えっと・なんか = fillers to buy time." } },

  // ── Semana 12 · revisão N5 ──
  { id: "s12-1", week: 12, tiles: ["はじめまして", "よろしく", "おねがいします"], translation: { pt: "Prazer, conto com você.", en: "Nice to meet you, I'm counting on you." }, note: { pt: "Fecho polido de qualquer apresentação.", en: "Polite closer for any introduction." } },
  { id: "s12-2", week: 12, tiles: ["きのう", "ともだち", "と", "えいが", "を", "みました"], translation: { pt: "Ontem vi um filme com um amigo.", en: "Yesterday I watched a movie with a friend." }, note: { pt: "と = com (companhia). Revisa o passado.", en: "と = with (company). Reviews the past." } },

  // ── Semana 13 · forma comum (casual) ──
  { id: "s13-1", week: 13, tiles: ["あした", "えいが", "を", "みる"], translation: { pt: "Amanhã vou ver um filme. (casual)", en: "Tomorrow I'll watch a movie. (casual)" }, note: { pt: "Forma de dicionário = presente/futuro casual.", en: "Dictionary form = casual present/future." } },
  { id: "s13-2", week: 13, tiles: ["きのう", "すし", "を", "たべた"], translation: { pt: "Ontem comi sushi. (casual)", en: "Yesterday I ate sushi. (casual)" }, note: { pt: "〜た = passado casual (= 〜ました).", en: "〜た = casual past (= 〜ました)." } },
  { id: "s13-3", week: 13, tiles: ["きょう", "は", "いかない"], translation: { pt: "Hoje eu não vou. (casual)", en: "Today I'm not going. (casual)" }, note: { pt: "〜ない = negativo casual (= 〜ません).", en: "〜ない = casual negative (= 〜ません)." } },

  // ── Semana 14 · forma potencial ──
  { id: "s14-1", week: 14, tiles: ["にほんご", "が", "はなせる"], translation: { pt: "Consigo falar japonês.", en: "I can speak Japanese." }, note: { pt: "No potencial, o objeto vira が (não を).", en: "With potential, the object takes が (not を)." } },
  { id: "s14-2", week: 14, tiles: ["すし", "が", "たべられる"], translation: { pt: "Consigo comer sushi.", en: "I can eat sushi." }, note: { pt: "食べる → 食べられる (conseguir).", en: "食べる → 食べられる (be able to)." } },
  { id: "s14-3", week: 14, tiles: ["ここ", "で", "しゃしん", "が", "とれますか"], translation: { pt: "Dá pra tirar foto aqui?", en: "Can I take photos here?" }, note: { pt: "Potencial na forma polida: 撮れます.", en: "Potential in polite form: 撮れます." } },

  // ── Semana 15 · comparar e preferir ──
  { id: "s15-1", week: 15, tiles: ["でんしゃ", "の", "ほう", "が", "はやい"], translation: { pt: "O trem é mais rápido.", en: "The train is faster." }, note: { pt: "〜のほうが = 'o lado de X é mais…'.", en: "〜のほうが = 'X is the more… one'." } },
  { id: "s15-2", week: 15, tiles: ["なつ", "より", "ふゆ", "が", "すき"], translation: { pt: "Gosto mais de inverno do que de verão.", en: "I like winter more than summer." }, note: { pt: "より = 'do que' (o termo de comparação).", en: "より = 'than' (the compared term)." } },
  { id: "s15-3", week: 15, tiles: ["いちばん", "すきな", "たべもの", "は", "すし"], translation: { pt: "Minha comida favorita é sushi.", en: "My favorite food is sushi." }, note: { pt: "一番 = o mais / número 1.", en: "一番 = the most / number one." } },

  // ── Semana 16 · permissão e proibição ──
  { id: "s16-1", week: 16, tiles: ["しゃしん", "を", "とっても", "いいですか"], translation: { pt: "Posso tirar uma foto?", en: "May I take a photo?" }, note: { pt: "〜てもいい = ter permissão para.", en: "〜てもいい = to have permission to." } },
  { id: "s16-2", week: 16, tiles: ["ここ", "で", "たばこ", "を", "すっては", "いけません"], translation: { pt: "Não pode fumar aqui.", en: "You must not smoke here." }, note: { pt: "〜てはいけない = proibição.", en: "〜てはいけない = prohibition." } },

  // ── Semana 17 · condicionais ──
  { id: "s17-1", week: 17, tiles: ["あめ", "が", "ふったら", "いかない"], translation: { pt: "Se chover, não vou.", en: "If it rains, I won't go." }, note: { pt: "〜たら = se/quando (condição pontual).", en: "〜たら = if/when (one-off condition)." } },
  { id: "s17-2", week: 17, tiles: ["やすかったら", "かいます"], translation: { pt: "Se for barato, eu compro.", en: "If it's cheap, I'll buy it." }, note: { pt: "Adjetivo い: 安い → 安かったら.", en: "い-adjective: 安い → 安かったら." } },
  { id: "s17-3", week: 17, tiles: ["ボタン", "を", "おすと", "ドア", "が", "あきます"], translation: { pt: "Quando aperta o botão, a porta abre.", en: "When you press the button, the door opens." }, note: { pt: "〜と = resultado natural e automático.", en: "〜と = a natural, automatic result." } },

  // ── Semana 18 · vontade e intenção ──
  { id: "s18-1", week: 18, tiles: ["しゅうまつ", "えいが", "を", "みよう"], translation: { pt: "Vamos ver um filme no fim de semana!", en: "Let's watch a movie this weekend!" }, note: { pt: "〜よう = 'vamos' (volitivo casual).", en: "〜よう = 'let's' (casual volitional)." } },
  { id: "s18-2", week: 18, tiles: ["らいねん", "にほん", "に", "いく", "つもり"], translation: { pt: "Pretendo ir ao Japão ano que vem.", en: "I intend to go to Japan next year." }, note: { pt: "〜つもり = intenção/plano firme.", en: "〜つもり = intention / firm plan." } },

  // ── Semana 19 · casual + contrações ──
  { id: "s19-1", week: 19, tiles: ["はやく", "いかなきゃ"], translation: { pt: "Preciso ir rápido.", en: "I gotta go quick." }, note: { pt: "〜なきゃ = 'tenho que' (contração de なければ).", en: "〜なきゃ = 'gotta' (contraction of なければ)." } },
  { id: "s19-2", week: 19, tiles: ["ぜんぶ", "たべちゃった"], translation: { pt: "Comi tudo (sem querer / até o fim).", en: "I ate it all (oops / completely)." }, note: { pt: "〜ちゃう = fazer por completo / sem querer.", en: "〜ちゃう = do completely / accidentally." } },
  { id: "s19-3", week: 19, tiles: ["これ", "おいしい", "じゃん"], translation: { pt: "Isso é gostoso, né!", en: "This is tasty, right!" }, note: { pt: "じゃん = 'né!' bem casual e enfático.", en: "じゃん = a very casual, emphatic 'right!'." } },

  // ── Semana 20 · keigo (pedidos formais) ──
  { id: "s20-1", week: 20, tiles: ["しゃしん", "を", "とって", "いただけますか"], translation: { pt: "A/o senhor(a) poderia tirar uma foto?", en: "Could you kindly take a photo?" }, note: { pt: "〜ていただけますか = pedido bem educado.", en: "〜ていただけますか = a very polite request." } },
  { id: "s20-2", week: 20, tiles: ["すみません", "みち", "を", "おしえて", "くださいませんか"], translation: { pt: "Com licença, poderia me indicar o caminho?", en: "Excuse me, could you tell me the way?" }, note: { pt: "〜くださいませんか = pedido gentil e formal.", en: "〜くださいませんか = a gentle, formal request." } },
];

export const sentencesForWeek = (week: number): SentenceItem[] => SENTENCES.filter((s) => s.week === week);
