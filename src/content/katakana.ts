import type { KanaItem } from "../types";

/**
 * Semana 2: os 46 katakana básicos.
 *
 * Estratégia de retenção dupla:
 *   1. `word` — palavra de empréstimo icônica que ancora o símbolo a algo já
 *      conhecido em português/inglês. É o principal gatilho de memória para
 *      katakana, já que a escrita é usada quase exclusivamente para empréstimos.
 *   2. `mnemonic` — descrição visual do TRAÇO, não comparação com outro kana.
 *
 * Pares confundíveis (tratados explicitamente):
 *   シ vs ツ — ambos têm 3 traços; diferem na direção do traço longo.
 *   ソ vs ン — ambos têm ponto + traço; diferem na direção do traço.
 */
export const KATAKANA: KanaItem[] = [
  // ── ア行 ──
  {
    id: "a", kana: "ア", romaji: "a", row: "ア",
    word: { jp: "アイスクリーム", romaji: "aisu kuriimu", meaning: { pt: "sorvete", en: "ice cream" } },
    mnemonic: { pt: "Um 'A' maiúsculo com o topo cortado e inclinado pra direita. アイスクリーム!", en: "Capital 'A' with its top chopped off, leaning right. アイスクリーム!" },
  },
  {
    id: "i", kana: "イ", romaji: "i", row: "ア",
    word: { jp: "イヤホン", romaji: "iyahon", meaning: { pt: "fone de ouvido", en: "earphones" } },
    mnemonic: { pt: "Duas linhas: um traço diagonal e um vertical — como duas pernas marchando. イヤホン!", en: "A diagonal stroke and a vertical — like two marching legs. イヤホン!" },
  },
  {
    id: "u", kana: "ウ", romaji: "u", row: "ア",
    word: { jp: "ウイスキー", romaji: "uisukii", meaning: { pt: "uísque", en: "whisky" } },
    mnemonic: { pt: "Um chapéu pontudo em cima de um sorriso — U de Uísque. ウイスキー!", en: "A pointed hat above a smile shape — U as in Whisky. ウイスキー!" },
  },
  {
    id: "e", kana: "エ", romaji: "e", row: "ア",
    word: { jp: "エレベーター", romaji: "erebeetaa", meaning: { pt: "elevador", en: "elevator" } },
    mnemonic: { pt: "Duas linhas horizontais ligadas por um traço vertical — a letra 'I' com chapéu e sapato. エレベーター!", en: "Two horizontal bars joined by a vertical — an 'I' with a hat and shoes. エレベーター!" },
  },
  {
    id: "o", kana: "オ", romaji: "o", row: "ア",
    word: { jp: "オレンジ", romaji: "orenji", meaning: { pt: "laranja", en: "orange" } },
    mnemonic: { pt: "Um sinal de '+' com um traço diagonal saindo — como uma âncora torta. オレンジ!", en: "A '+' sign with a diagonal leg sticking out — a crooked anchor. オレンジ!" },
  },

  // ── カ行 ──
  {
    id: "ka", kana: "カ", romaji: "ka", row: "カ",
    word: { jp: "カメラ", romaji: "kamera", meaning: { pt: "câmera", en: "camera" } },
    mnemonic: { pt: "Uma barra vertical com um traço cruzando e uma perna descendo — como uma pessoa sentada. カメラ!", en: "A vertical bar crossed by a stroke, with a leg hanging down — like someone seated. カメラ!" },
  },
  {
    id: "ki", kana: "キ", romaji: "ki", row: "カ",
    word: { jp: "キーボード", romaji: "kiiboodo", meaning: { pt: "teclado", en: "keyboard" } },
    mnemonic: { pt: "Três traços horizontais cruzados por um vertical — como uma grade ou cerca. キーボード!", en: "Three horizontal strokes crossed by a vertical — like a fence. キーボード!" },
  },
  {
    id: "ku", kana: "ク", romaji: "ku", row: "カ",
    word: { jp: "クッキー", romaji: "kukkii", meaning: { pt: "biscoito", en: "cookie" } },
    mnemonic: { pt: "Um bico de pássaro aberto apontando pra direita — 'ku-ku!' de coruja. クッキー!", en: "An open bird beak pointing right — a cuckoo going 'ku-ku!' クッキー!" },
  },
  {
    id: "ke", kana: "ケ", romaji: "ke", row: "カ",
    word: { jp: "ケーキ", romaji: "keeki", meaning: { pt: "bolo", en: "cake" } },
    mnemonic: { pt: "Uma barra vertical com dois traços saindo pra direita — a letra 'K' japonesa. ケーキ!", en: "A vertical bar with two strokes shooting right — a Japanese 'K'. ケーキ!" },
  },
  {
    id: "ko", kana: "コ", romaji: "ko", row: "カ",
    word: { jp: "コーヒー", romaji: "koohii", meaning: { pt: "café", en: "coffee" } },
    mnemonic: { pt: "Dois traços formando um canto — como as três bordas de uma caixa vista de lado. コーヒー!", en: "Two strokes forming a right-angle corner — three sides of a box. コーヒー!" },
  },

  // ── サ行 ──
  {
    id: "sa", kana: "サ", romaji: "sa", row: "サ",
    word: { jp: "サラダ", romaji: "sarada", meaning: { pt: "salada", en: "salad" } },
    mnemonic: { pt: "Dois traços horizontais cruzados por um vertical + traço diagonal caindo — como um garfo enterrado. サラダ!", en: "Two horizontals crossed by a vertical, plus a falling diagonal — a fork stuck in food. サラダ!" },
  },
  {
    id: "shi", kana: "シ", romaji: "shi", row: "サ",
    word: { jp: "シャワー", romaji: "shawaa", meaning: { pt: "chuveiro", en: "shower" } },
    mnemonic: { pt: "⚠️ Confunde com ツ! Dois pontinhos À ESQUERDA e um traço subindo pra direita (↗). シ = SOBE. Chuveiro: a água SOBE na ducha antes de cair. シャワー!", en: "⚠️ Confused with ツ! Two dots on the LEFT, long stroke sweeps UP-right (↗). シ = SHOOTS up. SHower spray going up. シャワー!" },
  },
  {
    id: "su", kana: "ス", romaji: "su", row: "サ",
    word: { jp: "スプーン", romaji: "supuun", meaning: { pt: "colher", en: "spoon" } },
    mnemonic: { pt: "Um traço descendo e curvando pra baixo como uma colher — uma colher virada. スプーン!", en: "A stroke swooping down and curving under — an upside-down spoon. スプーン!" },
  },
  {
    id: "se", kana: "セ", romaji: "se", row: "サ",
    word: { jp: "セーター", romaji: "seetaa", meaning: { pt: "suéter / blusa de lã", en: "sweater" } },
    mnemonic: { pt: "Uma barra horizontal no topo com um traço em 'J' pendurado — como um cabide com algo dependurado. セーター!", en: "A horizontal bar at the top with a 'J' hanging below — like a coat hanger. セーター!" },
  },
  {
    id: "so", kana: "ソ", romaji: "so", row: "サ",
    word: { jp: "ソファー", romaji: "sofaa", meaning: { pt: "sofá", en: "sofa" } },
    mnemonic: { pt: "⚠️ Confunde com ン! Um pontinho e um traço longo DESCENDO pra esquerda (↙). ソ = DESCE. Sofá: você DESCE no sofá. ソファー!", en: "⚠️ Confused with ン! One dot, long stroke drops DOWN-left (↙). ソ = SINKS. You SINK into a SOfa. ソファー!" },
  },

  // ── タ行 ──
  {
    id: "ta", kana: "タ", romaji: "ta", row: "タ",
    word: { jp: "タクシー", romaji: "takushii", meaning: { pt: "táxi", en: "taxi" } },
    mnemonic: { pt: "Uma cruz com um traço diagonal saindo pra baixo-direita — como um sinal de trânsito. タクシー!", en: "A cross with a diagonal tail sweeping down-right — like a road sign. タクシー!" },
  },
  {
    id: "chi", kana: "チ", romaji: "chi", row: "タ",
    word: { jp: "チケット", romaji: "chiketto", meaning: { pt: "ingresso / bilhete", en: "ticket" } },
    mnemonic: { pt: "Um sinal de '+' com um telhado horizontal em cima — como uma casa com antena. チケット!", en: "A '+' sign with a horizontal roof — a house with an antenna. チケット!" },
  },
  {
    id: "tsu", kana: "ツ", romaji: "tsu", row: "タ",
    word: { jp: "ツアー", romaji: "tsuaa", meaning: { pt: "excursão / tour", en: "tour" } },
    mnemonic: { pt: "⚠️ Confunde com シ! Dois pontinhos EM CIMA e um traço DESCENDO pra direita (↘). ツ = DESCE. Tsunami: a onda DESCE na praia. ツアー!", en: "⚠️ Confused with シ! Two dots ON TOP, long stroke swoops DOWN-right (↘). ツ = TUMBLES down. TSUnami crashing down. ツアー!" },
  },
  {
    id: "te", kana: "テ", romaji: "te", row: "タ",
    word: { jp: "テレビ", romaji: "terebi", meaning: { pt: "televisão", en: "TV" } },
    mnemonic: { pt: "Duas barras horizontais com um traço vertical no centro — como o sinal de TV antiga. テレビ!", en: "Two horizontal bars joined by a center vertical — like the shape of an old TV aerial. テレビ!" },
  },
  {
    id: "to", kana: "ト", romaji: "to", row: "タ",
    word: { jp: "トマト", romaji: "tomato", meaning: { pt: "tomate", en: "tomato" } },
    mnemonic: { pt: "Um traço vertical com um pequeno gancho saindo pra direita — a letra minúscula 't'. トマト!", en: "A vertical stroke with a tiny hook pointing right — a lowercase 't'. トマト!" },
  },

  // ── ナ行 ──
  {
    id: "na", kana: "ナ", romaji: "na", row: "ナ",
    word: { jp: "ナイフ", romaji: "naifu", meaning: { pt: "faca", en: "knife" } },
    mnemonic: { pt: "Uma cruz com o traço direito descendo em curva — como um sinal de adição mais inclinado. ナイフ!", en: "A cross with the right arm curving down — a tilted plus sign. ナイフ!" },
  },
  {
    id: "ni", kana: "ニ", romaji: "ni", row: "ナ",
    word: { jp: "ニュース", romaji: "nyuusu", meaning: { pt: "notícias", en: "news" } },
    mnemonic: { pt: "Duas linhas horizontais — como o sinal de igualdade '='. E 'ni' significa 2 em japonês! ニュース!", en: "Two horizontal lines — like an equals sign '='. And 'ni' means 2 in Japanese! ニュース!" },
  },
  {
    id: "nu", kana: "ヌ", romaji: "nu", row: "ナ",
    word: { jp: "ヌードル", romaji: "nuudoru", meaning: { pt: "macarrão", en: "noodle" } },
    mnemonic: { pt: "Um traço diagonal cruzado por outro, com uma rabinha descendo — como um macarrão enrolado. ヌードル!", en: "A diagonal stroke crossed by another, with a curling tail — noodles crossing! ヌードル!" },
  },
  {
    id: "ne", kana: "ネ", romaji: "ne", row: "ナ",
    word: { jp: "ネット", romaji: "netto", meaning: { pt: "internet / rede", en: "internet / net" } },
    mnemonic: { pt: "Uma cruz com um laço na base — parece uma âncora caindo na rede. ネット!", en: "A cross with a loop at the base — an anchor dropping into a net. ネット!" },
  },
  {
    id: "no", kana: "ノ", romaji: "no", row: "ナ",
    word: { jp: "ノート", romaji: "nooto", meaning: { pt: "caderno", en: "notebook" } },
    mnemonic: { pt: "Um único traço descendo da direita pra esquerda — o katakana mais simples de todos! ノート!", en: "A single stroke descending from right to left — the simplest katakana! ノート!" },
  },

  // ── ハ行 ──
  {
    id: "ha", kana: "ハ", romaji: "ha", row: "ハ",
    word: { jp: "ハンバーガー", romaji: "hanbaagaa", meaning: { pt: "hambúrguer", en: "hamburger" } },
    mnemonic: { pt: "Dois traços se abrindo como um portão ou a letra 'V' larga — como um 'ha!' de surpresa com braços abertos. ハンバーガー!", en: "Two strokes opening like a gate or wide 'V' — arms spread wide in an 'HA!' of surprise. ハンバーガー!" },
  },
  {
    id: "hi", kana: "ヒ", romaji: "hi", row: "ハ",
    word: { jp: "ヒーロー", romaji: "hiiroo", meaning: { pt: "herói", en: "hero" } },
    mnemonic: { pt: "Um 'L' maiúsculo com uma barra horizontal saindo do topo — como a letra 'F' sem a barra do meio. ヒーロー!", en: "A capital 'L' with a horizontal bar at the top — like 'F' missing its middle bar. ヒーロー!" },
  },
  {
    id: "fu", kana: "フ", romaji: "fu", row: "ハ",
    word: { jp: "フォーク", romaji: "fooku", meaning: { pt: "garfo", en: "fork" } },
    mnemonic: { pt: "Um gancho simples curvando pra baixo-esquerda — como um garfo de cabeça pra baixo. フォーク!", en: "A simple hook curving down-left — an upside-down fork. フォーク!" },
  },
  {
    id: "he", kana: "ヘ", romaji: "he", row: "ハ",
    word: { jp: "ヘルメット", romaji: "herumetto", meaning: { pt: "capacete", en: "helmet" } },
    mnemonic: { pt: "IDÊNTICO ao hiragana へ! Uma montanha com pico levemente à esquerda. Capacete tem um pico. ヘルメット!", en: "IDENTICAL to hiragana へ! A mountain peak slightly left of center. A helmet has a peak. ヘルメット!" },
  },
  {
    id: "ho", kana: "ホ", romaji: "ho", row: "ハ",
    word: { jp: "ホテル", romaji: "hoteru", meaning: { pt: "hotel", en: "hotel" } },
    mnemonic: { pt: "Uma cruz com duas pernas descendo — parece o kanji 木 (árvore). Hotel no jardim. ホテル!", en: "A cross with two legs hanging down — looks like the kanji 木 (tree). Hotel in a garden. ホテル!" },
  },

  // ── マ行 ──
  {
    id: "ma", kana: "マ", romaji: "ma", row: "マ",
    word: { jp: "マスク", romaji: "masuku", meaning: { pt: "máscara", en: "mask" } },
    mnemonic: { pt: "Um triângulo invertido com uma rabinha saindo pra baixo-direita — como uma máscara pendurada. マスク!", en: "An inverted triangle with a tail dropping down-right — a mask hanging. マスク!" },
  },
  {
    id: "mi", kana: "ミ", romaji: "mi", row: "マ",
    word: { jp: "ミルク", romaji: "miruku", meaning: { pt: "leite", en: "milk" } },
    mnemonic: { pt: "Três traços horizontais empilhados — como o número 3 deitado. 'Mi' = 3 em japonês! ミルク!", en: "Three horizontal strokes stacked — like a sideways number 3. 'Mi' = 3 in Japanese! ミルク!" },
  },
  {
    id: "mu", kana: "ム", romaji: "mu", row: "マ",
    word: { jp: "ゲーム", romaji: "geemu", meaning: { pt: "jogo", en: "game" } },
    mnemonic: { pt: "Um canto agudo com um pontinho à direita — como a letra grega mu (μ). Fim de ゲーム!", en: "A sharp corner with a dot to the right — like the Greek letter mu (μ). Game over with ゲーム!" },
  },
  {
    id: "me", kana: "メ", romaji: "me", row: "マ",
    word: { jp: "メール", romaji: "meeru", meaning: { pt: "e-mail", en: "email" } },
    mnemonic: { pt: "Dois traços que se cruzam em X — como um @ simplificado. MEU email. メール!", en: "Two strokes crossing in an X — a simplified '@'. MY email. メール!" },
  },
  {
    id: "mo", kana: "モ", romaji: "mo", row: "マ",
    word: { jp: "モデル", romaji: "moderu", meaning: { pt: "modelo", en: "model" } },
    mnemonic: { pt: "Duas barras horizontais, uma vertical cruzando-as, e uma terceira barra horizontal abaixo — como a letra 'F' com uma barra extra no fundo. モデル!", en: "Two horizontal bars, a vertical crossing them, then an extra horizontal at the bottom — 'F' with a second floor. モデル!" },
  },

  // ── ヤ行 ──
  {
    id: "ya", kana: "ヤ", romaji: "ya", row: "ヤ",
    word: { jp: "ヤクルト", romaji: "Yakuruto", meaning: { pt: "Yakult (bebida probiótica)", en: "Yakult (probiotic drink)" } },
    mnemonic: { pt: "Um traço diagonal cruzado por uma barra horizontal, com um gancho vertical descendo — como o 'Y' com um traço a mais. ヤクルト!", en: "A diagonal stroke crossed by a horizontal bar, vertical hook dropping — a 'Y' with an extra stroke. ヤクルト!" },
  },
  {
    id: "yu", kana: "ユ", romaji: "yu", row: "ヤ",
    word: { jp: "ユーチューブ", romaji: "Yuuchuubu", meaning: { pt: "YouTube", en: "YouTube" } },
    mnemonic: { pt: "Um 'U' angular e quadrado — como uma ferradura metálica. ユーチューブ!", en: "A squared, angular 'U' — like a metal horseshoe. ユーチューブ!" },
  },
  {
    id: "yo", kana: "ヨ", romaji: "yo", row: "ヤ",
    word: { jp: "ヨーグルト", romaji: "yooguruto", meaning: { pt: "iogurte", en: "yogurt" } },
    mnemonic: { pt: "Três barras horizontais ligadas por uma vertical à esquerda — como a letra 'E' ao espelho. ヨーグルト!", en: "Three horizontal bars connected by a vertical on the left — like a mirrored 'E'. ヨーグルト!" },
  },

  // ── ラ行 ──
  {
    id: "ra", kana: "ラ", romaji: "ra", row: "ラ",
    word: { jp: "ラーメン", romaji: "raamen", meaning: { pt: "lamen", en: "ramen" } },
    mnemonic: { pt: "Uma barra horizontal curta e um gancho descendo com curva — como uma bandeira num mastro. ラーメン!", en: "A short horizontal bar and a curving hook dropping below — a flag on a pole. ラーメン!" },
  },
  {
    id: "ri", kana: "リ", romaji: "ri", row: "ラ",
    word: { jp: "リモコン", romaji: "rimokon", meaning: { pt: "controle remoto", en: "remote control" } },
    mnemonic: { pt: "Dois traços verticais lado a lado — o da esquerda desce reto, o da direita curva pra baixo. Dois dedos apertando o controle. リモコン!", en: "Two vertical strokes side by side — left one drops straight, right one curves. Two fingers on the remote. リモコン!" },
  },
  {
    id: "ru", kana: "ル", romaji: "ru", row: "ラ",
    word: { jp: "ルール", romaji: "ruuru", meaning: { pt: "regra", en: "rule" } },
    mnemonic: { pt: "Dois traços que parecem duas perninhas — a da esquerda desce reta, a da direita abre numa curva. Duas pernas correndo. ルール!", en: "Two leg-like strokes — left one straight, right one sweeping out in a curve. Two legs running. ルール!" },
  },
  {
    id: "re", kana: "レ", romaji: "re", row: "ラ",
    word: { jp: "レストラン", romaji: "resutoran", meaning: { pt: "restaurante", en: "restaurant" } },
    mnemonic: { pt: "Um único traço que desce e abre pra direita — como um visto (✓) sem a parte de cima. レストラン!", en: "A single stroke dropping and sweeping right — like a check mark (✓) without the top. レストラン!" },
  },
  {
    id: "ro", kana: "ロ", romaji: "ro", row: "ラ",
    word: { jp: "ロボット", romaji: "robotto", meaning: { pt: "robô", en: "robot" } },
    mnemonic: { pt: "Um quadrado perfeito — igual ao kanji 口 (boca). RObot tem boca quadrada. ロボット!", en: "A perfect square — identical to the kanji 口 (mouth). A RObot's square mouth. ロボット!" },
  },

  // ── ワ行 ──
  {
    id: "wa", kana: "ワ", romaji: "wa", row: "ワ",
    word: { jp: "ワイン", romaji: "wain", meaning: { pt: "vinho", en: "wine" } },
    mnemonic: { pt: "Como フ mas com a perna do lado direito descendo reta — uma taça de vinho estilizada. ワイン!", en: "Like フ but with a straight right leg — a stylized wine glass stem. ワイン!" },
  },
  {
    id: "wo", kana: "ヲ", romaji: "wo (o)", row: "ワ",
    word: { jp: "(partícula を)", romaji: "(wo)", meaning: { pt: "partícula de objeto direto (raramente em katakana)", en: "object particle (rare in katakana)" } },
    mnemonic: { pt: "Raríssimo em katakana — aparece quase só como partícula escrita em katakana em alguns contextos antigos. Não precisa memorizar agora.", en: "Extremely rare in katakana — mostly a particle. Not worth worrying about yet." },
  },
  {
    id: "n", kana: "ン", romaji: "n", row: "ワ",
    word: { jp: "パン", romaji: "pan", meaning: { pt: "pão", en: "bread" } },
    mnemonic: { pt: "⚠️ Confunde com ソ! Um pontinho e um traço SUBINDO pra direita (↗) como um visto (✓). ン = sobe como um CHECK. パン! (pão tem 'n' nasal)", en: "⚠️ Confused with ソ! A dot and a stroke sweeping UP-right (↗) — like a check mark. ン = goes UP. パン! (bread ends with nasal 'n')" },
  },
];
