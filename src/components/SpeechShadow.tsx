import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { shadowingForWeek } from "../content/shadowing";
import { speak, ttsAvailable } from "../lib/tts";
import { listen, stopListening, speechAvailable, type SpeechResult } from "../lib/speech";
import { useAppStore } from "../store/useAppStore";

type Phase = "idle" | "playing" | "listening" | "result";

/**
 * Shadowing: ouve a frase, repete no microfone, recebe nota.
 * perfect (≥90%) → 🌸 · close (70–90%) → quase · off → tenta de novo.
 */
export default function SpeechShadow({ week }: { week: number }) {
  const { t, i18n } = useTranslation();
  const { go, recordActivity } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const items = shadowingForWeek(week);

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [result, setResult] = useState<SpeechResult | null>(null);
  const [perfects, setPerfects] = useState(0);

  const item = items[idx];
  useEffect(() => () => stopListening(), []);

  if (!speechAvailable()) {
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">🎙️</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{t("speak.unsupported")}</h2>
        <p className="mt-2 text-sm text-stone-500">{t("speak.unsupportedSub")}</p>
        <button
          onClick={() => go({ name: "home" })}
          className="mt-6 rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
        >
          {t("flash.backHome")}
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{t("speak.done")}</h2>
        <p className="mt-1 text-sm text-stone-500">{t("speak.doneSub", { n: perfects })}</p>
        <button
          onClick={() => go({ name: "home" })}
          className="mt-6 rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
        >
          {t("flash.backHome")}
        </button>
      </div>
    );
  }

  const play = async () => {
    setPhase("playing");
    setResult(null);
    if (ttsAvailable()) await speak(item.jp);
    setPhase("idle");
  };

  const record = async () => {
    setPhase("listening");
    setResult(null);
    const r = await listen(item.jp);
    setResult(r);
    setPhase("result");
    if (r.status === "perfect") {
      setPerfects((n) => n + 1);
      void recordActivity("speak");
    }
  };

  const next = () => {
    setResult(null);
    setPhase("idle");
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-md pop-in">
      <p className="mb-2 text-center text-xs text-stone-400">
        {idx + 1} / {items.length} · {t("curriculum.week")} {week}
      </p>

      <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{t("speak.sayThis")}</p>
        <p className="jp mt-4 text-3xl font-bold leading-snug text-stone-800">{item.display}</p>
        {item.romaji && <p className="mt-1 text-sm italic text-stone-400">{item.romaji}</p>}
        <p className="mt-2 text-xs text-stone-500">{item.translation[lang]}</p>

        {/* controles */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={play}
            disabled={phase === "listening" || phase === "playing"}
            className="rounded-full bg-violet-100 px-5 py-3 font-semibold text-violet-700 transition enabled:hover:bg-violet-200 disabled:opacity-50"
          >
            🔊 {t("speak.listenBtn")}
          </button>
          <button
            onClick={record}
            disabled={phase === "listening" || phase === "playing"}
            className={`rounded-full px-5 py-3 font-semibold text-white shadow transition disabled:opacity-60 ${
              phase === "listening" ? "animate-pulse bg-rose-500" : "bg-sakura-500 hover:bg-sakura-600"
            }`}
          >
            {phase === "listening" ? `🎙️ ${t("speak.listening")}` : `🎤 ${t("speak.repeatBtn")}`}
          </button>
        </div>

        {/* resultado */}
        {phase === "result" && result && (
          <div className="pop-in mt-5">
            {result.status === "perfect" && (
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-2xl">🌸</p>
                <p className="mt-1 font-bold text-emerald-700">{t("speak.perfect")}</p>
                <p className="jp mt-1 text-xs text-emerald-800">「{result.transcript}」</p>
              </div>
            )}
            {result.status === "close" && (
              <div className="rounded-2xl bg-amber-50 p-4">
                <p className="text-2xl">✨</p>
                <p className="mt-1 font-bold text-amber-700">
                  {t("speak.close", { pct: Math.round(result.similarity * 100) })}
                </p>
                <p className="jp mt-1 text-xs text-amber-800">
                  {t("speak.youSaid")} 「{result.transcript}」
                </p>
              </div>
            )}
            {result.status === "off" && (
              <div className="rounded-2xl bg-rose-50 p-4">
                <p className="text-2xl">🔁</p>
                <p className="mt-1 font-bold text-rose-700">{t("speak.off")}</p>
                {result.transcript && (
                  <p className="jp mt-1 text-xs text-rose-800">
                    {t("speak.youSaid")} 「{result.transcript}」
                  </p>
                )}
              </div>
            )}
            {(result.status === "silent" || result.status === "error") && (
              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="text-2xl">🤫</p>
                <p className="mt-1 text-sm font-semibold text-stone-600">
                  {result.status === "silent" ? t("speak.silent") : t("speak.micError")}
                </p>
              </div>
            )}

            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={record}
                className="rounded-full bg-stone-100 px-5 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-200"
              >
                🔁 {t("speak.retry")}
              </button>
              <button
                onClick={next}
                className="rounded-full bg-sakura-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sakura-600"
              >
                {t("speak.next")} →
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] text-stone-400">{t("speak.hint")}</p>
    </div>
  );
}
