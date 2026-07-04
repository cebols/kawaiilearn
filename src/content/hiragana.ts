import type { KanaItem } from "../types";

/**
 * Semana 1: os 46 hiragana básicos.
 * Mnemônicos escritos por idioma (não traduzidos) — as dicas em PT
 * aproveitam sons do português que o inglês não tem.
 */
export const HIRAGANA: KanaItem[] = [
  { id: "a", kana: "あ", romaji: "a", row: "あ", mnemonic: { pt: "Som de 'á' em 'casa'. O caractere parece uma Antena torta.", en: "Sounds like 'a' in 'father'. Looks like an Antenna." } },
  { id: "i", kana: "い", romaji: "i", row: "あ", mnemonic: { pt: "Som de 'i' em 'vida'. Dois tracinhos, como dois grãos de arroz (i de 'inteiro').", en: "Sounds like 'ee' in 'see'. Two strokes like two eels." } },
  { id: "u", kana: "う", romaji: "u", row: "あ", mnemonic: { pt: "Som de 'u' em 'tudo'. Parece um U de lado com um chapeuzinho.", en: "Sounds like 'oo' in 'food'. A sideways U with a hat." } },
  { id: "e", kana: "え", romaji: "e", row: "あ", mnemonic: { pt: "Som de 'ê' em 'você' (nunca 'é' aberto!). Parece um Exótico pássaro.", en: "Sounds like 'e' in 'bed'. Looks like an Exotic bird." } },
  { id: "o", kana: "お", romaji: "o", row: "あ", mnemonic: { pt: "Som de 'ô' em 'avô' (nunca 'ó'!). Tem um lacinho — Oferece um laço.", en: "Sounds like 'o' in 'go'. It has a little bow — an Offering." } },
  { id: "ka", kana: "か", romaji: "ka", row: "か", mnemonic: { pt: "'Ka' de 'caqui'. Parece uma pipa (KAite, em japonês!) com rabiola.", en: "'Ka' as in 'car'. Looks like a KAyak paddler." } },
  { id: "ki", kana: "き", romaji: "ki", row: "か", mnemonic: { pt: "'Ki' de 'quiabo'. Parece uma chave — 'key' em inglês!", en: "'Ki' as in 'key' — and it looks like a KEY!" } },
  { id: "ku", kana: "く", romaji: "ku", row: "か", mnemonic: { pt: "'Ku' de 'cuca'. Um bico de passarinho fazendo 'cu-cu'.", en: "'Ku' as in 'cuckoo' — a bird beak going 'ku-ku'." } },
  { id: "ke", kana: "け", romaji: "ke", row: "か", mnemonic: { pt: "'Kê' (fechado). Parece um barril com uma faca — 'quê' que corta.", en: "'Ke' as in 'kettle'. A barrel next to a knife." } },
  { id: "ko", kana: "こ", romaji: "ko", row: "か", mnemonic: { pt: "'Kô' de 'coco' (fechado). Dois traços deitados, como dois COlchões.", en: "'Ko' as in 'cocoa'. Two lying strokes, like two COts." } },
  { id: "sa", kana: "さ", romaji: "sa", row: "さ", mnemonic: { pt: "'Sa' de 'sapo'. Parece um SAca-rolhas.", en: "'Sa' as in 'saw'. Looks like a SAw cutting." } },
  { id: "shi", kana: "し", romaji: "shi", row: "さ", mnemonic: { pt: "'Shi' de 'xícara' (xi!). Um anzol — 'SHIcara' de pescador.", en: "'Shi' as in 'she'. A fishing hook — SHE fishes." } },
  { id: "su", kana: "す", romaji: "su", row: "さ", mnemonic: { pt: "'Su' de 'suco'. Um redemoinho SUgando tudo.", en: "'Su' as in 'soup'. A swirl SUcking things in." } },
  { id: "se", kana: "せ", romaji: "se", row: "さ", mnemonic: { pt: "'Sê' (fechado). Parece uma boca com dente — 'SÊrio?'.", en: "'Se' as in 'set'. A mouth with a tooth — SAY it." } },
  { id: "so", kana: "そ", romaji: "so", row: "さ", mnemonic: { pt: "'Sô' de 'sozinho' (fechado). Um raio em zigue-zague — SÓcorro!", en: "'So' as in 'so'. A zigzag lightning bolt — SO shocking!" } },
  { id: "ta", kana: "た", romaji: "ta", row: "た", mnemonic: { pt: "'Ta' de 'tatu'. Parece 'ta' escrito: um 't' e um 'a'.", en: "'Ta' as in 'top'. It literally looks like 't' + 'a'." } },
  { id: "chi", kana: "ち", romaji: "chi", row: "た", mnemonic: { pt: "'Tchi' de 'tchau'! Parece um TCHIco (número 5) torto.", en: "'Chi' as in 'cheese'. Looks like a lopsided CHEEky 5." } },
  { id: "tsu", kana: "つ", romaji: "tsu", row: "た", mnemonic: { pt: "'Tsu' — o único som novo pro brasileiro! Uma onda de TSUnami.", en: "'Tsu' — a TSUnami wave." } },
  { id: "te", kana: "て", romaji: "te", row: "た", mnemonic: { pt: "'Tê' (fechado). Parece uma mesa de perfil — 'TÊnis em cima da mesa'.", en: "'Te' as in 'ten'. A TAble seen from the side." } },
  { id: "to", kana: "と", romaji: "to", row: "た", mnemonic: { pt: "'Tô' de 'estou' (fechado). Um dedão com um espinho — 'TÔ com dor!'.", en: "'To' as in 'toe' — a TOE with a splinter!" } },
  { id: "na", kana: "な", romaji: "na", row: "な", mnemonic: { pt: "'Na' de 'nada'. Uma freira (NAna) rezando diante de uma cruz.", en: "'Na' as in 'nap'. A NUn praying by a cross." } },
  { id: "ni", kana: "に", romaji: "ni", row: "な", mnemonic: { pt: "'Ni' de 'ninho'. Parece o número 2 — 'ni' É 2 em japonês!", en: "'Ni' as in 'need'. 'Ni' IS 2 in Japanese — two strokes beside a pole." } },
  { id: "nu", kana: "ぬ", romaji: "nu", row: "な", mnemonic: { pt: "'Nu' de 'número'. Um macarrão (NUdle) com um laço no fim.", en: "'Nu' as in 'noodle' — a NOOdle with a loop at the end." } },
  { id: "ne", kana: "ね", romaji: "ne", row: "な", mnemonic: { pt: "'Nê' (fechado) — como o 'né?' brasileiro! Um gato (NEko) de cauda enrolada.", en: "'Ne' as in 'neck'. A cat — NEko — with a curled tail." } },
  { id: "no", kana: "の", romaji: "no", row: "な", mnemonic: { pt: "'Nô' (fechado). Um sinal de proibido — 'NO!'.", en: "'No' as in 'no'. A 'NO entry' swirl sign." } },
  { id: "ha", kana: "は", romaji: "ha", row: "は", mnemonic: { pt: "'Ha' de 'rá!' (h aspirado, como rir: 'hahaha'). Parece um H com uma perna a mais.", en: "'Ha' as in 'haha'. Looks like an H plus a leg." } },
  { id: "hi", kana: "ひ", romaji: "hi", row: "は", mnemonic: { pt: "'Hi' de risada 'hihihi'. Um sorriso de lado.", en: "'Hi' as in 'he'. A sideways smile — HEhehe." } },
  { id: "fu", kana: "ふ", romaji: "fu", row: "は", mnemonic: { pt: "'Fu' soprado (entre 'fu' e 'hu') — como soprar comida quente: 'ffuu'. Um monte Fuji com vento.", en: "'Fu' — blown softly like blowing soup. Mount FUji in the wind." } },
  { id: "he", kana: "へ", romaji: "he", row: "は", mnemonic: { pt: "'Hê' aspirado. Uma montanha achatada — 'HÊin? Que montanha baixa!'.", en: "'He' as in 'help'. A flat mountain — HEy, that's low!" } },
  { id: "ho", kana: "ほ", romaji: "ho", row: "は", mnemonic: { pt: "'Hô' aspirado, de 'ho ho ho' do Papai Noel. O は com um andar a mais.", en: "'Ho' as in Santa's 'ho ho ho'. It's は with an extra floor." } },
  { id: "ma", kana: "ま", romaji: "ma", row: "ま", mnemonic: { pt: "'Ma' de 'mamãe'. Um pirulito enrolado que a MAmãe deu.", en: "'Ma' as in 'mom'. A lollipop from MAma." } },
  { id: "mi", kana: "み", romaji: "mi", row: "ま", mnemonic: { pt: "'Mi' de 'minhoca'. O número 21 emendado — MIssão 21.", en: "'Mi' as in 'me'. Looks like the number 21 — MIssion 21." } },
  { id: "mu", kana: "む", romaji: "mu", row: "ま", mnemonic: { pt: "'Mu' de vaca: 'muuu'. Até tem um chifrinho!", en: "'Mu' — a cow going 'MOO', horn included!" } },
  { id: "me", kana: "め", romaji: "me", row: "ま", mnemonic: { pt: "'Mê' (fechado). Parece um olho — 'ME' (olho) em japonês!", en: "'Me' as in 'men'. It looks like an eye — 'me' IS eye in Japanese!" } },
  { id: "mo", kana: "も", romaji: "mo", row: "ま", mnemonic: { pt: "'Mô' (fechado). Um anzol com duas minhocas — 'MÔsca não, minhoca!'.", en: "'Mo' as in 'more'. A hook with two worms — catch MOre fish." } },
  { id: "ya", kana: "や", romaji: "ya", row: "や", mnemonic: { pt: "'Ia' de 'iate'. Um IAque com chifre caído.", en: "'Ya' as in 'yacht'. A YAk with a droopy horn." } },
  { id: "yu", kana: "ゆ", romaji: "yu", row: "や", mnemonic: { pt: "'Iu' de 'viu'. Um peixinho no aquário — 'vIU o peixe?'.", en: "'Yu' as in 'you'. A fish in a bowl — YOU see it?" } },
  { id: "yo", kana: "よ", romaji: "yo", row: "や", mnemonic: { pt: "'Iô' de 'iô-iô'. Parece um ioiô de lado!", en: "'Yo' as in 'yo-yo' — a sideways YO-yo!" } },
  { id: "ra", kana: "ら", romaji: "ra", row: "ら", mnemonic: { pt: "R japonês: entre 'r' de 'caro' e 'l' — nunca o R de 'rato'! 'RÁdio' com antena.", en: "Japanese R: between R and L, tongue tap. A RAdio with antenna." } },
  { id: "ri", kana: "り", romaji: "ri", row: "ら", mnemonic: { pt: "'Ri' como em 'caRIdade' (r fraco). Dois RIos descendo.", en: "'Ri' with a soft tap. Two RIvers flowing down." } },
  { id: "ru", kana: "る", romaji: "ru", row: "ら", mnemonic: { pt: "'Ru' fraco, como em 'baRUlho'. Um caminho com um laço no fim — RUa sem saída.", en: "'Ru' with a soft tap. A ROUte ending in a loop." } },
  { id: "re", kana: "れ", romaji: "re", row: "ら", mnemonic: { pt: "'Rê' fraco, como em 'caREca'. Uma pessoa ajoelhada REzando.", en: "'Re' with a soft tap. Someone kneeling to pray — REligious." } },
  { id: "ro", kana: "ろ", romaji: "ro", row: "ら", mnemonic: { pt: "'Rô' fraco, como em 'agoRA'. É o る sem laço — ROubaram o laço!", en: "'Ro' with a soft tap. It's る without the loop — the loop was RObbed!" } },
  { id: "wa", kana: "わ", romaji: "wa", row: "わ", mnemonic: { pt: "'Ua' de 'quase' rápido: 'ua!'. Um cisne de peito estufado — 'UAu!'.", en: "'Wa' as in 'wow'. A proud swan — WOW!" } },
  { id: "wo", kana: "を", romaji: "wo (o)", row: "わ", mnemonic: { pt: "Lê-se 'ô' — só existe como partícula de objeto. Uma pessoa carregando um Objeto.", en: "Read as 'o' — only used as the object particle. Someone carrying an Object." } },
  { id: "n", kana: "ん", romaji: "n", row: "わ", mnemonic: { pt: "'N' nasal, como o fim de 'sim'. O único kana sem vogal! Parece um 'n' cursivo.", en: "Nasal 'n', the only vowel-less kana. Looks like a cursive 'n'." } },
];

export const HIRAGANA_ROWS = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"];
