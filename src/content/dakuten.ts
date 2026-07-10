import type { KanaItem, L10n } from "../types";

/**
 * Kana sonoros: dakuten ゛(tenten) e handakuten ゜(maru).
 * Regra geral: k→g, s→z, t→d, h→b e h→p.
 *
 * Cada caractere tem sua própria palavra de âncora que CONTÉM
 * o caractere em questão — nunca uma palavra da mesma linha que
 * usa um irmão diferente.
 */
interface VoicedChar {
  base: string;
  kana: string;
  romaji: string;
  id: string;
  soundNote: L10n;
  word?: { jp: string; romaji: string; meaning: L10n };
}

function buildVoicedChars(chars: VoicedChar[]): KanaItem[] {
  return chars.map(({ base, kana, romaji, id, soundNote, word }) => {
    const mark = romaji.startsWith("p") ? "゜" : "゛";
    return {
      id,
      kana,
      romaji,
      row: chars[0].kana,
      mnemonic: {
        pt: `É o ${base} com ${mark}: ${soundNote.pt}`,
        en: `It's ${base} with ${mark}: ${soundNote.en}`,
      },
      word,
    };
  });
}

// ─────────────────────────────────────────────
// HIRAGANA DAKUTEN
// ─────────────────────────────────────────────

const HIRA_GA: VoicedChar[] = [
  { base: "か", kana: "が", romaji: "ga", id: "ga",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "がっこう", romaji: "gakkou", meaning: { pt: "escola", en: "school" } } },
  { base: "き", kana: "ぎ", romaji: "gi", id: "gi",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ぎんこう", romaji: "ginkou", meaning: { pt: "banco", en: "bank" } } },
  { base: "く", kana: "ぐ", romaji: "gu", id: "gu",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ぐうぜん", romaji: "guuzen", meaning: { pt: "coincidência", en: "coincidence" } } },
  { base: "け", kana: "げ", romaji: "ge", id: "ge",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "げんき", romaji: "genki", meaning: { pt: "bem / com energia", en: "energetic / well" } } },
  { base: "こ", kana: "ご", romaji: "go", id: "go",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ごはん", romaji: "gohan", meaning: { pt: "arroz / refeição", en: "rice / meal" } } },
];

const HIRA_ZA: VoicedChar[] = [
  { base: "さ", kana: "ざ", romaji: "za", id: "za",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ざっし", romaji: "zasshi", meaning: { pt: "revista", en: "magazine" } } },
  { base: "し", kana: "じ", romaji: "ji", id: "ji",
    soundNote: { pt: "S vira Z — し vira JI.", en: "S becomes Z — し becomes JI." },
    word: { jp: "じかん", romaji: "jikan", meaning: { pt: "tempo / hora", en: "time" } } },
  { base: "す", kana: "ず", romaji: "zu", id: "zu",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ずっと", romaji: "zutto", meaning: { pt: "sempre / o tempo todo", en: "all along / always" } } },
  { base: "せ", kana: "ぜ", romaji: "ze", id: "ze",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ぜんぶ", romaji: "zenbu", meaning: { pt: "tudo / todos", en: "everything / all" } } },
  { base: "そ", kana: "ぞ", romaji: "zo", id: "zo",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ぞう", romaji: "zou", meaning: { pt: "elefante", en: "elephant" } } },
];

const HIRA_DA: VoicedChar[] = [
  { base: "た", kana: "だ", romaji: "da", id: "da",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "だいじょうぶ", romaji: "daijoubu", meaning: { pt: "tá bem / tudo certo", en: "it's okay / no problem" } } },
  { base: "ち", kana: "ぢ", romaji: "ji", id: "dji",
    soundNote: { pt: "T vira D — ぢ soa igual a じ, raramente usado.", en: "T becomes D — ぢ sounds like じ, rarely used." },
    word: undefined },
  { base: "つ", kana: "づ", romaji: "zu", id: "dzu",
    soundNote: { pt: "T vira D — づ soa igual a ず, raramente usado.", en: "T becomes D — づ sounds like ず, rarely used." },
    word: undefined },
  { base: "て", kana: "で", romaji: "de", id: "de",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "でんしゃ", romaji: "densha", meaning: { pt: "trem elétrico", en: "electric train" } } },
  { base: "と", kana: "ど", romaji: "do", id: "do",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "どこ", romaji: "doko", meaning: { pt: "onde?", en: "where?" } } },
];

const HIRA_BA: VoicedChar[] = [
  { base: "は", kana: "ば", romaji: "ba", id: "ba",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ばしょ", romaji: "basho", meaning: { pt: "lugar", en: "place" } } },
  { base: "ひ", kana: "び", romaji: "bi", id: "bi",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "びっくり", romaji: "bikkuri", meaning: { pt: "surpresa!", en: "surprised!" } } },
  { base: "ふ", kana: "ぶ", romaji: "bu", id: "bu",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ぶんか", romaji: "bunka", meaning: { pt: "cultura", en: "culture" } } },
  { base: "へ", kana: "べ", romaji: "be", id: "be",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "べんきょう", romaji: "benkyou", meaning: { pt: "estudar / estudo", en: "study" } } },
  { base: "ほ", kana: "ぼ", romaji: "bo", id: "bo",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ぼく", romaji: "boku", meaning: { pt: "eu (masculino casual)", en: "I / me (casual masculine)" } } },
];

const HIRA_PA: VoicedChar[] = [
  { base: "は", kana: "ぱ", romaji: "pa", id: "pa",
    soundNote: { pt: "Com ゜, H vira P. Som raro no japonês nativo.", en: "With ゜, H becomes P. Rare in native Japanese." },
    word: { jp: "ぱっと", romaji: "patto", meaning: { pt: "de repente / de imediato", en: "suddenly / in a flash" } } },
  { base: "ひ", kana: "ぴ", romaji: "pi", id: "pi",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ぴったり", romaji: "pittari", meaning: { pt: "perfeito / ajustado exatamente", en: "perfect fit / exactly right" } } },
  { base: "ふ", kana: "ぷ", romaji: "pu", id: "pu",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ぷくぷく", romaji: "pukupuku", meaning: { pt: "gordinho / borbulhando", en: "chubby / bubbling" } } },
  { base: "へ", kana: "ぺ", romaji: "pe", id: "pe",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ぺらぺら", romaji: "perapera", meaning: { pt: "falar fluentemente", en: "speak fluently" } } },
  { base: "ほ", kana: "ぽ", romaji: "po", id: "po",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ぽかぽか", romaji: "pokapoka", meaning: { pt: "quentinho / agradavelmente morno", en: "warm and pleasant / sunny" } } },
];

export const DAKUTEN_HIRA: KanaItem[] = [
  ...buildVoicedChars(HIRA_GA),
  ...buildVoicedChars(HIRA_ZA),
  ...buildVoicedChars(HIRA_DA),
  ...buildVoicedChars(HIRA_BA),
  ...buildVoicedChars(HIRA_PA),
];

// ─────────────────────────────────────────────
// KATAKANA DAKUTEN
// ─────────────────────────────────────────────

const KATA_GA: VoicedChar[] = [
  { base: "カ", kana: "ガ", romaji: "ga", id: "ga",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ガソリン", romaji: "gasorin", meaning: { pt: "gasolina", en: "gasoline" } } },
  { base: "キ", kana: "ギ", romaji: "gi", id: "gi",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ギター", romaji: "gitaa", meaning: { pt: "violão / guitarra", en: "guitar" } } },
  { base: "ク", kana: "グ", romaji: "gu", id: "gu",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "グラス", romaji: "gurasu", meaning: { pt: "copo (de vidro)", en: "glass (drinking)" } } },
  { base: "ケ", kana: "ゲ", romaji: "ge", id: "ge",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ゲーム", romaji: "geemu", meaning: { pt: "jogo", en: "game" } } },
  { base: "コ", kana: "ゴ", romaji: "go", id: "go",
    soundNote: { pt: "K vira G.", en: "K becomes G." },
    word: { jp: "ゴール", romaji: "gooru", meaning: { pt: "gol / chegada", en: "goal / finish line" } } },
];

const KATA_ZA: VoicedChar[] = [
  { base: "サ", kana: "ザ", romaji: "za", id: "za",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ピザ", romaji: "piza", meaning: { pt: "pizza", en: "pizza" } } },
  { base: "シ", kana: "ジ", romaji: "ji", id: "ji",
    soundNote: { pt: "S vira Z — シ vira JI.", en: "S becomes Z — シ becomes JI." },
    word: { jp: "ジュース", romaji: "juusu", meaning: { pt: "suco", en: "juice" } } },
  { base: "ス", kana: "ズ", romaji: "zu", id: "zu",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ズーム", romaji: "zuumu", meaning: { pt: "zoom", en: "zoom" } } },
  { base: "セ", kana: "ゼ", romaji: "ze", id: "ze",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ゼロ", romaji: "zero", meaning: { pt: "zero", en: "zero" } } },
  { base: "ソ", kana: "ゾ", romaji: "zo", id: "zo",
    soundNote: { pt: "S vira Z.", en: "S becomes Z." },
    word: { jp: "ゾンビ", romaji: "zonbi", meaning: { pt: "zumbi", en: "zombie" } } },
];

const KATA_DA: VoicedChar[] = [
  { base: "タ", kana: "ダ", romaji: "da", id: "da",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "ダンス", romaji: "dansu", meaning: { pt: "dança", en: "dance" } } },
  { base: "チ", kana: "ヂ", romaji: "ji", id: "dji",
    soundNote: { pt: "T vira D — ヂ soa igual a ジ, raramente usado.", en: "T becomes D — ヂ sounds like ジ, rarely used." },
    word: undefined },
  { base: "ツ", kana: "ヅ", romaji: "zu", id: "dzu",
    soundNote: { pt: "T vira D — ヅ soa igual a ズ, raramente usado.", en: "T becomes D — ヅ sounds like ズ, rarely used." },
    word: undefined },
  { base: "テ", kana: "デ", romaji: "de", id: "de",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "デジタル", romaji: "dejitaru", meaning: { pt: "digital", en: "digital" } } },
  { base: "ト", kana: "ド", romaji: "do", id: "do",
    soundNote: { pt: "T vira D.", en: "T becomes D." },
    word: { jp: "ドア", romaji: "doa", meaning: { pt: "porta", en: "door" } } },
];

const KATA_BA: VoicedChar[] = [
  { base: "ハ", kana: "バ", romaji: "ba", id: "ba",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "バナナ", romaji: "banana", meaning: { pt: "banana", en: "banana" } } },
  { base: "ヒ", kana: "ビ", romaji: "bi", id: "bi",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ビール", romaji: "biiru", meaning: { pt: "cerveja", en: "beer" } } },
  { base: "フ", kana: "ブ", romaji: "bu", id: "bu",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ブーツ", romaji: "buutsu", meaning: { pt: "botas", en: "boots" } } },
  { base: "ヘ", kana: "ベ", romaji: "be", id: "be",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ベッド", romaji: "beddo", meaning: { pt: "cama", en: "bed" } } },
  { base: "ホ", kana: "ボ", romaji: "bo", id: "bo",
    soundNote: { pt: "H vira B.", en: "H becomes B." },
    word: { jp: "ボール", romaji: "booru", meaning: { pt: "bola", en: "ball" } } },
];

const KATA_PA: VoicedChar[] = [
  { base: "ハ", kana: "パ", romaji: "pa", id: "pa",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "パスポート", romaji: "pasupooto", meaning: { pt: "passaporte", en: "passport" } } },
  { base: "ヒ", kana: "ピ", romaji: "pi", id: "pi",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ピアノ", romaji: "piano", meaning: { pt: "piano", en: "piano" } } },
  { base: "フ", kana: "プ", romaji: "pu", id: "pu",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "プール", romaji: "puuru", meaning: { pt: "piscina", en: "swimming pool" } } },
  { base: "ヘ", kana: "ペ", romaji: "pe", id: "pe",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ペット", romaji: "petto", meaning: { pt: "animal de estimação", en: "pet" } } },
  { base: "ホ", kana: "ポ", romaji: "po", id: "po",
    soundNote: { pt: "Com ゜, H vira P.", en: "With ゜, H becomes P." },
    word: { jp: "ポケット", romaji: "poketto", meaning: { pt: "bolso", en: "pocket" } } },
];

export const DAKUTEN_KATA: KanaItem[] = [
  ...buildVoicedChars(KATA_GA),
  ...buildVoicedChars(KATA_ZA),
  ...buildVoicedChars(KATA_DA),
  ...buildVoicedChars(KATA_BA),
  ...buildVoicedChars(KATA_PA),
];
