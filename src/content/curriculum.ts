import type { Week } from "../types";

/**
 * A trilha de 12 semanas. NADA é travado: `available` indica apenas
 * se o conteúdo já foi produzido. O ritmo sugerido é calculado a partir
 * da data de início do usuário (ver useSuggestedPace).
 */
export const WEEKS: Week[] = [
  { num: 1, phase: 1, available: true, title: { pt: "Hiragana + saudações", en: "Hiragana + greetings" }, goals: [{ pt: "Ler e escrever os 46 hiragana", en: "Read and write all 46 hiragana" }, { pt: "Cumprimentar nos dois registros", en: "Greet in both registers" }] },
  { num: 2, phase: 1, available: true, title: { pt: "Katakana + apresentar-se", en: "Katakana + introducing yourself" }, goals: [{ pt: "Ler katakana e palavras emprestadas", en: "Read katakana and loanwords" }, { pt: "〜です ⇄ 〜だ/だよ", en: "〜です ⇄ 〜だ/だよ" }] },
  { num: 3, phase: 1, available: true, title: { pt: "Sobrevivência + partículas は・を・に", en: "Survival phrases + は・を・に" }, goals: [{ pt: "Montar frases com partículas", en: "Build sentences with particles" }, { pt: "は marca tópico, を objeto, に destino", en: "は topic, を object, に destination" }] },
  { num: 4, phase: 2, available: true, title: { pt: "Verbos: forma ます + で local", en: "Verbs: ます form + で for place" }, goals: [{ pt: "Presente/futuro em ます", en: "Present/future in ます" }, { pt: "で = onde a ação acontece", en: "で = where the action happens" }] },
  { num: 5, phase: 2, available: true, title: { pt: "Passado e negativo", en: "Past and negative" }, goals: [{ pt: "〜ました / 〜ませんでした", en: "〜ました / 〜ませんでした" }, { pt: "Frases sobre ontem", en: "Sentences about yesterday" }] },
  { num: 6, phase: 2, available: true, title: { pt: "Forma て: pedidos e ações em curso", en: "て-form: requests and ongoing actions" }, goals: [{ pt: "〜てください (pedido)", en: "〜てください (request)" }, { pt: "〜ています (em progresso)", en: "〜ています (in progress)" }] },
  { num: 7, phase: 3, available: true, title: { pt: "Adjetivos + が (mas)", en: "Adjectives + が (but)" }, goals: [{ pt: "Adjetivo い + です", en: "い-adjective + です" }, { pt: "Ligar ideias com が", en: "Linking ideas with が" }] },
  { num: 8, phase: 3, available: true, title: { pt: "Querer + convidar", en: "Want + invite" }, goals: [{ pt: "〜たい (querer fazer)", en: "〜たい (want to do)" }, { pt: "〜ませんか (convite)", en: "〜ませんか (invitation)" }] },
  { num: 9, phase: 3, available: false, title: { pt: "Dar e receber + pedir favores", en: "Giving, receiving + asking favors" }, goals: [{ pt: "あげる・くれる・もらう", en: "あげる・くれる・もらう" }, { pt: "~50 kanji acumulados", en: "~50 kanji total" }] },
  { num: 10, phase: 4, available: false, title: { pt: "Conectar ideias: から, けど, んです", en: "Connecting ideas: から, けど, んです" }, goals: [{ pt: "Falar de planos", en: "Talking about plans" }, { pt: "んです: a ponte entre registros", en: "んです: the register bridge" }] },
  { num: 11, phase: 4, available: false, title: { pt: "Conversa real: aizuchi e fillers", en: "Real conversation: aizuchi and fillers" }, goals: [{ pt: "うん, へえ, そうなんだ, えっと, なんか", en: "うん, へえ, そうなんだ, えっと, なんか" }, { pt: "Listening em velocidade natural", en: "Natural-speed listening" }] },
  { num: 12, phase: 4, available: false, title: { pt: "Projeto final: 3 conversas completas", en: "Final project: 3 full conversations" }, goals: [{ pt: "Hotel (polido), amigo (casual), alguém novo (transição)", en: "Hotel (polite), friend (casual), someone new (transition)" }, { pt: "Boss test 2 + certificado 🎓", en: "Boss test 2 + certificate 🎓" }] },
];
