import type { Week } from "../types";

/**
 * Trilha de 20 semanas, seguindo uma curva de dificuldade real (JLPT N5 → N4).
 * A dificuldade sobe junto com o conteúdo: primeiro os silabários e frases de
 * sobrevivência, depois o motor verbal, comunicação, e por fim as formas casuais
 * e o keigo — fechando o ciclo do dial 55/45.
 * NADA é travado: `available` só indica se o conteúdo já foi produzido.
 */
export const WEEKS: Week[] = [
  // ── Fase 1 · Fundação (N5-) ──
  { num: 1, phase: 1, level: "N5-", available: true, title: { pt: "Hiragana + saudações", en: "Hiragana + greetings" }, goals: [{ pt: "Ler e escrever os 46 hiragana", en: "Read and write all 46 hiragana" }, { pt: "Cumprimentar nos dois registros", en: "Greet in both registers" }] },
  { num: 2, phase: 1, level: "N5-", available: true, title: { pt: "Katakana + apresentar-se", en: "Katakana + introducing yourself" }, goals: [{ pt: "Ler katakana e palavras emprestadas", en: "Read katakana and loanwords" }, { pt: "〜です ⇄ 〜だ/だよ", en: "〜です ⇄ 〜だ/だよ" }] },
  { num: 3, phase: 1, level: "N5-", available: true, title: { pt: "Sobrevivência + partículas は・を・に", en: "Survival + は・を・に" }, goals: [{ pt: "Montar frases com partículas", en: "Build sentences with particles" }, { pt: "は tópico, を objeto, に destino", en: "は topic, を object, に destination" }] },

  // ── Fase 2 · Estrutura (N5) ──
  { num: 4, phase: 2, level: "N5", available: true, title: { pt: "Verbos: forma ます + で local", en: "Verbs: ます form + で for place" }, goals: [{ pt: "Presente/futuro em ます", en: "Present/future in ます" }, { pt: "で = onde a ação acontece", en: "で = where the action happens" }] },
  { num: 5, phase: 2, level: "N5", available: true, title: { pt: "Passado e negativo", en: "Past and negative" }, goals: [{ pt: "〜ました / 〜ませんでした", en: "〜ました / 〜ませんでした" }, { pt: "Falar sobre ontem", en: "Talk about yesterday" }] },
  { num: 6, phase: 2, level: "N5", available: true, title: { pt: "Forma て: pedidos e ações em curso", en: "て-form: requests and ongoing actions" }, goals: [{ pt: "〜てください (pedido)", en: "〜てください (request)" }, { pt: "〜ています (em progresso)", en: "〜ています (in progress)" }] },

  // ── Fase 3 · Comunicação (N5) ──
  { num: 7, phase: 3, level: "N5", available: true, title: { pt: "Adjetivos + が (mas)", en: "Adjectives + が (but)" }, goals: [{ pt: "Adjetivo い + です", en: "い-adjective + です" }, { pt: "Ligar ideias com が", en: "Linking ideas with が" }] },
  { num: 8, phase: 3, level: "N5", available: true, title: { pt: "Querer + convidar", en: "Want + invite" }, goals: [{ pt: "〜たい (querer fazer)", en: "〜たい (want to do)" }, { pt: "〜ませんか (convite)", en: "〜ませんか (invitation)" }] },
  { num: 9, phase: 3, level: "N5", available: true, title: { pt: "Dar e receber + favores", en: "Giving, receiving + favors" }, goals: [{ pt: "あげる・くれる・もらう", en: "あげる・くれる・もらう" }, { pt: "Pedir ajuda: 〜てくれる？", en: "Ask for help: 〜てくれる？" }] },

  // ── Fase 4 · Consolidação (N5+) ──
  { num: 10, phase: 4, level: "N5+", available: true, title: { pt: "Conectar ideias: から・けど・んです", en: "Connecting: から・けど・んです" }, goals: [{ pt: "Dar motivo com から", en: "Give a reason with から" }, { pt: "んです: a ponte entre registros", en: "んです: the register bridge" }] },
  { num: 11, phase: 4, level: "N5+", available: true, title: { pt: "Conversa real: aizuchi e fillers", en: "Real talk: aizuchi and fillers" }, goals: [{ pt: "ね・よ・そうなんだ", en: "ね・よ・そうなんだ" }, { pt: "えっと・なんか (ganhar tempo)", en: "えっと・なんか (buying time)" }] },
  { num: 12, phase: 4, level: "N5+", available: true, title: { pt: "Revisão N5 + 3 conversas", en: "N5 review + 3 conversations" }, goals: [{ pt: "Hotel, amigo, alguém novo", en: "Hotel, friend, someone new" }, { pt: "Escolher o registro certo", en: "Pick the right register" }] },

  // ── Fase 5 · Expansão (N4-) ──
  { num: 13, phase: 5, level: "N4-", available: true, title: { pt: "Forma comum (dicionário/た/ない)", en: "Plain form (dictionary/た/ない)" }, goals: [{ pt: "食べる・食べた・食べない", en: "食べる・食べた・食べない" }, { pt: "O coração do japonês casual", en: "The heart of casual Japanese" }] },
  { num: 14, phase: 5, level: "N4-", available: true, title: { pt: "Forma potencial: 'conseguir'", en: "Potential form: 'can do'" }, goals: [{ pt: "話せる・食べられる", en: "話せる・食べられる" }, { pt: "Dizer o que você consegue fazer", en: "Say what you're able to do" }] },
  { num: 15, phase: 5, level: "N4-", available: true, title: { pt: "Comparar e preferir", en: "Compare and prefer" }, goals: [{ pt: "〜より・〜のほうが・一番", en: "〜より・〜のほうが・一番" }, { pt: "Opiniões e favoritos", en: "Opinions and favorites" }] },
  { num: 16, phase: 5, level: "N4-", available: true, title: { pt: "Permissão e proibição", en: "Permission and prohibition" }, goals: [{ pt: "〜てもいい (pode)", en: "〜てもいい (may)" }, { pt: "〜てはいけない (não pode)", en: "〜てはいけない (must not)" }] },

  // ── Fase 6 · Fluência (N4) ──
  { num: 17, phase: 6, level: "N4", available: true, title: { pt: "Condicionais: 'se/quando'", en: "Conditionals: 'if/when'" }, goals: [{ pt: "〜たら・〜ば・〜と", en: "〜たら・〜ば・〜と" }, { pt: "Planos e hipóteses", en: "Plans and hypotheticals" }] },
  { num: 18, phase: 6, level: "N4", available: true, title: { pt: "Vontade e intenção", en: "Volition and intention" }, goals: [{ pt: "〜よう (vamos!) ", en: "〜よう (let's!)" }, { pt: "〜つもり (pretendo)", en: "〜つもり (I intend to)" }] },
  { num: 19, phase: 6, level: "N4", available: true, title: { pt: "Domínio do casual + contrações", en: "Casual mastery + contractions" }, goals: [{ pt: "〜ちゃう・〜とく・〜なきゃ", en: "〜ちゃう・〜とく・〜なきゃ" }, { pt: "じゃん・でしょ・partículas finais", en: "じゃん・でしょ・final particles" }] },
  { num: 20, phase: 6, level: "N4", available: true, title: { pt: "Keigo + projeto final 🎓", en: "Keigo + final project 🎓" }, goals: [{ pt: "Pedidos formais: 〜ていただけますか", en: "Formal requests: 〜ていただけますか" }, { pt: "Transitar polido ⇄ casual num dia", en: "Move polite ⇄ casual across a day" }] },
];

/** Nomes e cores das 6 fases. */
export const PHASES: Record<number, { pt: string; en: string; color: string }> = {
  1: { pt: "Fundação", en: "Foundation", color: "#ec4899" },
  2: { pt: "Estrutura", en: "Structure", color: "#8b5cf6" },
  3: { pt: "Comunicação", en: "Communication", color: "#10b981" },
  4: { pt: "Consolidação", en: "Consolidation", color: "#f59e0b" },
  5: { pt: "Expansão", en: "Expansion", color: "#0ea5e9" },
  6: { pt: "Fluência", en: "Fluency", color: "#f43f5e" },
};
