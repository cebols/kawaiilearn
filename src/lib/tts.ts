/**
 * TTS japonês via Web Speech API (nativo do navegador, offline em muitos SOs).
 * Arquitetura plugável: trocar por áudio gravado/neural depois = trocar só este módulo.
 */
let jaVoice: SpeechSynthesisVoice | null = null;

function pickVoice(): SpeechSynthesisVoice | null {
  if (jaVoice) return jaVoice;
  const voices = window.speechSynthesis?.getVoices() ?? [];
  jaVoice =
    voices.find((v) => v.lang === "ja-JP" && /google|kyoko|o-?ren/i.test(v.name)) ??
    voices.find((v) => v.lang.startsWith("ja")) ??
    null;
  return jaVoice;
}

// as vozes carregam de forma assíncrona em alguns navegadores
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    jaVoice = null;
    pickVoice();
  };
}

/** Fala o texto e resolve quando o áudio termina (onend). Fallback por tempo caso o SO nunca dispare onend. */
export function speak(text: string, rate = 0.9): Promise<void> {
  if (!("speechSynthesis" in window)) return Promise.resolve();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  utter.rate = rate;
  const voice = pickVoice();
  if (voice) utter.voice = voice;

  return new Promise((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    utter.onend = finish;
    utter.onerror = finish;
    // safety net: alguns SOs (especialmente Chrome desktop) engolem o onend
    const estimatedMs = Math.max(1200, text.length * 160);
    setTimeout(finish, estimatedMs + 500);
    window.speechSynthesis.speak(utter);
  });
}

export function ttsAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}
