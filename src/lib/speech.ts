/**
 * Reconhecimento de fala ja-JP via Web Speech API (Chrome/Brave/Safari).
 * Local-first: o engine é o do navegador, sem servidor nosso.
 * A comparação com a frase esperada é tolerante: normaliza katakana↔hiragana,
 * remove pontuação/espaços e usa Levenshtein normalizado.
 */

export interface SpeechResult {
  transcript: string;
  /** 0–1: similaridade com o esperado */
  similarity: number;
  status: "perfect" | "close" | "off" | "silent" | "error";
}

type SRCtor = new () => SpeechRecognition;
declare global {
  interface Window {
    SpeechRecognition?: SRCtor;
    webkitSpeechRecognition?: SRCtor;
  }
}

function getRecognizer(): SpeechRecognition | null {
  const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition;
  if (!Ctor) return null;
  const rec = new Ctor();
  rec.lang = "ja-JP";
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  return rec;
}

export function speechAvailable(): boolean {
  return typeof window !== "undefined" && !!(window.SpeechRecognition ?? window.webkitSpeechRecognition);
}

/** Katakana → hiragana (mesmo som, compara no mesmo alfabeto). */
function kataToHira(s: string): string {
  return s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

/** Normaliza para comparação: só kana/kanji, minúsculo, sem pontuação. */
export function normalizeJa(s: string): string {
  return kataToHira(s)
    .toLowerCase()
    .replace(/[〜ー]/g, "") // prolongamentos não mudam a palavra falada reconhecida
    .replace(/[、。！？!?.,\s・「」『』（）()…~]/g, "");
}

function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = cur;
  }
  return prev[b.length];
}

export function similarity(said: string, expected: string): number {
  const a = normalizeJa(said);
  const b = normalizeJa(expected);
  if (!a.length || !b.length) return 0;
  const dist = levenshtein(a, b);
  return Math.max(0, 1 - dist / Math.max(a.length, b.length));
}

function statusFor(sim: number): SpeechResult["status"] {
  if (sim >= 0.9) return "perfect";
  if (sim >= 0.7) return "close";
  return "off";
}

let active: SpeechRecognition | null = null;

/** Escuta uma fala e compara com o esperado. Resolve sempre (nunca rejeita). */
export function listen(expected: string, timeoutMs = 8000): Promise<SpeechResult> {
  return new Promise((resolve) => {
    const rec = getRecognizer();
    if (!rec) {
      resolve({ transcript: "", similarity: 0, status: "error" });
      return;
    }
    // cancela escuta anterior pendurada
    if (active) {
      try {
        active.abort();
      } catch {
        /* ignore */
      }
    }
    active = rec;

    let settled = false;
    const settle = (r: SpeechResult) => {
      if (settled) return;
      settled = true;
      active = null;
      clearTimeout(timer);
      resolve(r);
    };

    const timer = setTimeout(() => {
      try {
        rec.abort();
      } catch {
        /* ignore */
      }
      settle({ transcript: "", similarity: 0, status: "silent" });
    }, timeoutMs);

    rec.onresult = (ev: SpeechRecognitionEvent) => {
      // pega a alternativa com MAIOR similaridade (o engine às vezes acerta na 2ª)
      let best: SpeechResult = { transcript: "", similarity: 0, status: "off" };
      const alts = ev.results[0];
      for (let i = 0; i < alts.length; i++) {
        const t = alts[i].transcript;
        const sim = similarity(t, expected);
        if (sim >= best.similarity) best = { transcript: t, similarity: sim, status: statusFor(sim) };
      }
      settle(best);
    };
    rec.onerror = (ev: SpeechRecognitionErrorEvent) => {
      settle({
        transcript: "",
        similarity: 0,
        status: ev.error === "no-speech" ? "silent" : "error",
      });
    };
    rec.onend = () => {
      // terminou sem resultado (ex.: silêncio curto)
      settle({ transcript: "", similarity: 0, status: "silent" });
    };

    try {
      rec.start();
    } catch {
      settle({ transcript: "", similarity: 0, status: "error" });
    }
  });
}

/** Cancela a escuta atual (ex.: usuário saiu da tela). */
export function stopListening(): void {
  if (active) {
    try {
      active.abort();
    } catch {
      /* ignore */
    }
    active = null;
  }
}
