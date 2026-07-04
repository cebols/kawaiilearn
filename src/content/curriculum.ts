import type { Week } from "../types";

/**
 * A trilha de 12 semanas. NADA é travado: `available` indica apenas
 * se o conteúdo já foi produzido. O ritmo sugerido é calculado a partir
 * da data de início do usuário (ver useSuggestedPace).
 */
export const WEEKS: Week[] = [
  { num: 1, phase: 1, available: true, title: { pt: "Hiragana + saudações", en: "Hiragana + greetings" }, goals: [{ pt: "Ler e escrever os 46 hiragana", en: "Read and write all 46 hiragana" }, { pt: "Cumprimentar nos dois registros", en: "Greet in both registers" }] },
  { num: 2, phase: 1, available: false, title: { pt: "Katakana + apresentar-se", en: "Katakana + introducing yourself" }, goals: [{ pt: "Ler katakana e palavras emprestadas", en: "Read katakana and loanwords" }, { pt: "〜です ⇄ 〜だ/だよ", en: "〜です ⇄ 〜だ/だよ" }] },
  { num: 3, phase: 1, available: false, title: { pt: "Sobrevivência + partículas は・が・を・の", en: "Survival phrases + は・が・を・の" }, goals: [{ pt: "Números, dinheiro e horas", en: "Numbers, money and time" }, { pt: "Primeiros diálogos com áudio", en: "First audio dialogues" }] },
  { num: 4, phase: 2, available: false, title: { pt: "Verbos: ます e forma de dicionário juntas", en: "Verbs: ます and dictionary form together" }, goals: [{ pt: "Grupos 1/2/3", en: "Groups 1/2/3" }, { pt: "Primeiros 15 kanji", en: "First 15 kanji" }] },
  { num: 5, phase: 2, available: false, title: { pt: "Passado e negativo nos dois registros", en: "Past and negative in both registers" }, goals: [{ pt: "食べませんでした ⇄ 食べなかった", en: "食べませんでした ⇄ 食べなかった" }, { pt: "Partículas に・で・へ", en: "Particles に・で・へ" }] },
  { num: 6, phase: 2, available: false, title: { pt: "Forma て + contrações faladas", en: "て-form + spoken contractions" }, goals: [{ pt: "〜ている → 〜てる", en: "〜ている → 〜てる" }, { pt: "Boss test 1 🏯", en: "Boss test 1 🏯" }] },
  { num: 7, phase: 3, available: false, title: { pt: "Adjetivos + dar opinião", en: "Adjectives + giving opinions" }, goals: [{ pt: "い/な nos dois registros", en: "い/な in both registers" }, { pt: "〜と思います ⇄ 〜と思う", en: "〜と思います ⇄ 〜と思う" }] },
  { num: 8, phase: 3, available: false, title: { pt: "Querer, poder, convidar + japonês de chat 📱", en: "Want, can, invite + texting Japanese 📱" }, goals: [{ pt: "行きませんか ⇄ 行かない？", en: "行きませんか ⇄ 行かない？" }, { pt: "Diálogos estilo LINE: りょ, 笑, www", en: "LINE-style chats: りょ, 笑, www" }] },
  { num: 9, phase: 3, available: false, title: { pt: "Dar e receber + pedir favores", en: "Giving, receiving + asking favors" }, goals: [{ pt: "あげる・くれる・もらう", en: "あげる・くれる・もらう" }, { pt: "~50 kanji acumulados", en: "~50 kanji total" }] },
  { num: 10, phase: 4, available: false, title: { pt: "Conectar ideias: から, けど, んです", en: "Connecting ideas: から, けど, んです" }, goals: [{ pt: "Falar de planos", en: "Talking about plans" }, { pt: "んです: a ponte entre registros", en: "んです: the register bridge" }] },
  { num: 11, phase: 4, available: false, title: { pt: "Conversa real: aizuchi e fillers", en: "Real conversation: aizuchi and fillers" }, goals: [{ pt: "うん, へえ, そうなんだ, えっと, なんか", en: "うん, へえ, そうなんだ, えっと, なんか" }, { pt: "Listening em velocidade natural", en: "Natural-speed listening" }] },
  { num: 12, phase: 4, available: false, title: { pt: "Projeto final: 3 conversas completas", en: "Final project: 3 full conversations" }, goals: [{ pt: "Hotel (polido), amigo (casual), alguém novo (transição)", en: "Hotel (polite), friend (casual), someone new (transition)" }, { pt: "Boss test 2 + certificado 🎓", en: "Boss test 2 + certificate 🎓" }] },
];
