import type { KanaItem, L10n } from "../types";

/**
 * Kana sonoros: dakuten ゛(tenten) e handakuten ゜(maru).
 * Não são símbolos novos — são os que você já sabe com uma marca que
 * "liga a voz": k→g, s→z, t→d, h→b e h→p. Os mnemônicos reforçam
 * exatamente esse mapeamento em vez de inventar imagens novas.
 */
interface VoicedRow {
  base: string;
  voiced: string;
  romaji: string[];
  /** ids únicos (じ/ぢ e ず/づ têm o mesmo som) */
  ids: string[];
  soundNote: L10n;
}

const HIRA_ROWS: VoicedRow[] = [
  { base: "かきくけこ", voiced: "がぎぐげご", romaji: ["ga", "gi", "gu", "ge", "go"], ids: ["ga", "gi", "gu", "ge", "go"], soundNote: { pt: "K vira G — como 'gato'.", en: "K becomes G — as in 'go'." } },
  { base: "さしすせそ", voiced: "ざじずぜぞ", romaji: ["za", "ji", "zu", "ze", "zo"], ids: ["za", "ji", "zu", "ze", "zo"], soundNote: { pt: "S vira Z — como 'zebra' (し vira JI, de 'jiló').", en: "S becomes Z (し becomes JI)." } },
  { base: "たちつてと", voiced: "だぢづでど", romaji: ["da", "ji", "zu", "de", "do"], ids: ["da", "dji", "dzu", "de", "do"], soundNote: { pt: "T vira D — como 'dado' (ぢ/づ soam igual a じ/ず e são raros).", en: "T becomes D (ぢ/づ sound like じ/ず and are rare)." } },
  { base: "はひふへほ", voiced: "ばびぶべぼ", romaji: ["ba", "bi", "bu", "be", "bo"], ids: ["ba", "bi", "bu", "be", "bo"], soundNote: { pt: "H vira B — como 'bebê'.", en: "H becomes B — as in 'baby'." } },
  { base: "はひふへほ", voiced: "ぱぴぷぺぽ", romaji: ["pa", "pi", "pu", "pe", "po"], ids: ["pa", "pi", "pu", "pe", "po"], soundNote: { pt: "Com a bolinha ゜, H vira P — como 'pipoca'.", en: "With the circle ゜, H becomes P — as in 'pop'." } },
];

const KATA_ROWS: VoicedRow[] = [
  { base: "カキクケコ", voiced: "ガギグゲゴ", romaji: ["ga", "gi", "gu", "ge", "go"], ids: ["ga", "gi", "gu", "ge", "go"], soundNote: { pt: "K vira G — ゲーム (game)!", en: "K becomes G — ゲーム (game)!" } },
  { base: "サシスセソ", voiced: "ザジズゼゾ", romaji: ["za", "ji", "zu", "ze", "zo"], ids: ["za", "ji", "zu", "ze", "zo"], soundNote: { pt: "S vira Z — ピザ (pizza)! (シ vira JI)", en: "S becomes Z — ピザ (pizza)! (シ becomes JI)" } },
  { base: "タチツテト", voiced: "ダヂヅデド", romaji: ["da", "ji", "zu", "de", "do"], ids: ["da", "dji", "dzu", "de", "do"], soundNote: { pt: "T vira D — ドア (door/porta).", en: "T becomes D — ドア (door)." } },
  { base: "ハヒフヘホ", voiced: "バビブベボ", romaji: ["ba", "bi", "bu", "be", "bo"], ids: ["ba", "bi", "bu", "be", "bo"], soundNote: { pt: "H vira B — バス (ônibus/bus).", en: "H becomes B — バス (bus)." } },
  { base: "ハヒフヘホ", voiced: "パピプペポ", romaji: ["pa", "pi", "pu", "pe", "po"], ids: ["pa", "pi", "pu", "pe", "po"], soundNote: { pt: "Com ゜, H vira P — パン (pão)!", en: "With ゜, H becomes P — パン (bread)!" } },
];

function buildVoiced(rows: VoicedRow[]): KanaItem[] {
  const items: KanaItem[] = [];
  for (const row of rows) {
    const mark = row.romaji[0].startsWith("p") ? "゜" : "゛";
    for (let i = 0; i < row.voiced.length; i++) {
      const from = row.base[i];
      const kana = row.voiced[i];
      items.push({
        id: row.ids[i],
        kana,
        romaji: row.romaji[i],
        row: row.voiced[0],
        mnemonic: {
          pt: `É o ${from} com ${mark}: ${row.soundNote.pt}`,
          en: `It's ${from} with ${mark}: ${row.soundNote.en}`,
        },
      });
    }
  }
  return items;
}

export const DAKUTEN_HIRA: KanaItem[] = buildVoiced(HIRA_ROWS);
export const DAKUTEN_KATA: KanaItem[] = buildVoiced(KATA_ROWS);
