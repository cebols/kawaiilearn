/**
 * Leitura em kana de números japoneses (até 99.999), preços, horas e
 * contadores — com as mudanças eufônicas que pegam todo iniciante:
 * 300=さんびゃく, 600=ろっぴゃく, 800=はっぴゃく, 3000=さんぜん,
 * 8000=はっせん, e o famigerado ふん/ぷん dos minutos.
 */

const UNITS = ["", "いち", "に", "さん", "よん", "ご", "ろく", "なな", "はち", "きゅう"];

function hundreds(d: number): string {
  if (d === 0) return "";
  if (d === 1) return "ひゃく";
  if (d === 3) return "さんびゃく";
  if (d === 6) return "ろっぴゃく";
  if (d === 8) return "はっぴゃく";
  return UNITS[d] + "ひゃく";
}

function thousands(d: number): string {
  if (d === 0) return "";
  if (d === 1) return "せん";
  if (d === 3) return "さんぜん";
  if (d === 8) return "はっせん";
  return UNITS[d] + "せん";
}

/** Número inteiro → leitura em hiragana (0–99999). */
export function numberToKana(n: number): string {
  if (n === 0) return "ゼロ";
  if (n < 0 || n > 99999) return String(n);
  let out = "";
  const man = Math.floor(n / 10000);
  if (man > 0) out += UNITS[man] + "まん";
  const rest = n % 10000;
  out += thousands(Math.floor(rest / 1000));
  out += hundreds(Math.floor((rest % 1000) / 100));
  const tens = Math.floor((rest % 100) / 10);
  if (tens === 1) out += "じゅう";
  else if (tens > 1) out += UNITS[tens] + "じゅう";
  out += UNITS[rest % 10];
  return out;
}

/** Preço em ienes → leitura (4 vira よ antes de えん: 104円=ひゃくよえん). */
export function yenToKana(n: number): string {
  let base = numberToKana(n);
  if (n % 10 === 4) base = base.replace(/よん$/, "よ");
  return base + "えん";
}

const HOURS = ["", "いちじ", "にじ", "さんじ", "よじ", "ごじ", "ろくじ", "しちじ", "はちじ", "くじ", "じゅうじ", "じゅういちじ", "じゅうにじ"];

/** Leituras de minutos com ふん/ぷん corretos. */
function minuteUnit(d: number): string {
  // dígito final → leitura (regra do ふん/ぷん)
  const map = ["", "いっぷん", "にふん", "さんぷん", "よんぷん", "ごふん", "ろっぷん", "ななふん", "はっぷん", "きゅうふん"];
  return map[d];
}

export function timeToKana(hour: number, minute: number): string {
  const h = HOURS[hour] ?? `${numberToKana(hour)}じ`;
  if (minute === 0) return h;
  if (minute === 30) return h + "はん"; // 3:30 = さんじはん (metade)
  const tens = Math.floor(minute / 10);
  const unit = minute % 10;
  let m = "";
  if (tens === 1) m = unit === 0 ? "じゅっぷん" : "じゅう" + minuteUnit(unit);
  else if (tens > 1) m = unit === 0 ? UNITS[tens] + "じゅっぷん" : UNITS[tens] + "じゅう" + minuteUnit(unit);
  else m = minuteUnit(unit);
  return h + m;
}

/** Contadores comuns de viagem (1–5 de cada). */
export interface CounterItem {
  jp: string;
  kana: string;
  meaning: { pt: string; en: string };
}

export const COUNTERS: CounterItem[] = [
  // 人 pessoas — as duas primeiras são irregulares!
  { jp: "一人", kana: "ひとり", meaning: { pt: "1 pessoa", en: "1 person" } },
  { jp: "二人", kana: "ふたり", meaning: { pt: "2 pessoas", en: "2 people" } },
  { jp: "三人", kana: "さんにん", meaning: { pt: "3 pessoas", en: "3 people" } },
  { jp: "四人", kana: "よにん", meaning: { pt: "4 pessoas", en: "4 people" } },
  // 杯 copos/xícaras
  { jp: "一杯", kana: "いっぱい", meaning: { pt: "1 copo/xícara", en: "1 cup/glass" } },
  { jp: "二杯", kana: "にはい", meaning: { pt: "2 copos", en: "2 cups" } },
  { jp: "三杯", kana: "さんばい", meaning: { pt: "3 copos", en: "3 cups" } },
  // 個 coisas pequenas
  { jp: "一個", kana: "いっこ", meaning: { pt: "1 unidade", en: "1 piece" } },
  { jp: "二個", kana: "にこ", meaning: { pt: "2 unidades", en: "2 pieces" } },
  { jp: "三個", kana: "さんこ", meaning: { pt: "3 unidades", en: "3 pieces" } },
  // 枚 coisas planas (ingressos!)
  { jp: "一枚", kana: "いちまい", meaning: { pt: "1 (ingresso/folha)", en: "1 (ticket/sheet)" } },
  { jp: "二枚", kana: "にまい", meaning: { pt: "2 (ingressos)", en: "2 (tickets)" } },
  // 本 coisas compridas (garrafas!)
  { jp: "一本", kana: "いっぽん", meaning: { pt: "1 (garrafa)", en: "1 (bottle)" } },
  { jp: "二本", kana: "にほん", meaning: { pt: "2 (garrafas)", en: "2 (bottles)" } },
  { jp: "三本", kana: "さんぼん", meaning: { pt: "3 (garrafas)", en: "3 (bottles)" } },
];

/** Preços realistas de viagem (sorteia um). */
export function randomPrice(): number {
  const pools = [
    () => (Math.floor(Math.random() * 9) + 1) * 100 + [0, 50, 80][Math.floor(Math.random() * 3)], // 100-980
    () => (Math.floor(Math.random() * 90) + 10) * 100, // 1000-9900
    () => (Math.floor(Math.random() * 30) + 10) * 1000, // 10000-39000
  ];
  const pick = pools[Math.floor(Math.random() * pools.length)];
  return pick();
}

export function randomTime(): { hour: number; minute: number } {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = [0, 5, 10, 15, 20, 30, 40, 45, 50][Math.floor(Math.random() * 9)];
  return { hour, minute };
}
