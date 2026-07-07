/**
 * Adiciona espaços pedagógicos em frases japonesas.
 * Regras CONSERVADORAS — melhor não separar do que separar errado:
 *  1. Partícula (は・を・に・で・へ・が・も・と・の・か・ね・よ) só é
 *     isolada quando tem contexto forte dos dois lados: precedida por
 *     kanji/katakana E seguida por kanji/katakana/pontuação/fim.
 *     Isso evita quebrar palavras 100% hiragana como ちょっと, とても, もちろん.
 *  2. Bloco de hiragana de 2+ chars seguido por kanji vira token: せんせいだ
 *     mantém como um bloco. Isso separa "onda" de palavras conjugadas
 *     sem quebrar okurigana (覚えてる mantém 覚 + えてる juntos).
 * Uso: só em contextos EDUCACIONAIS (exercícios, testes, notas).
 * NUNCA no chat — lá a fala tem que fluir como conversa real.
 */
export function spaceOut(s: string): string {
  if (!s) return s;
  const particles = "はをにでへがもとのかねよさわ";
  // Regra 1: partícula isolada entre dois blocos "sólidos"
  const re1 = new RegExp(
    `([一-龯ァ-ヺー])([${particles}])(?=[一-龯ァ-ヺー、。！？…\\s]|$)`,
    "gu"
  );
  let out = s.replace(re1, "$1 $2 ");
  // Regra 2: fronteira de hiragana-longo + kanji (2+ kana então kanji)
  // Não separa okurigana (1 kana entre kanji e pontuação/verbo).
  out = out.replace(/([ぁ-ゖ]{2,})([一-龯])/g, "$1 $2");
  // limpa: nunca ter espaço antes de pontuação
  return out
    .replace(/ +/g, " ")
    .replace(/ ([、。！？…])/g, "$1")
    .trim();
}
