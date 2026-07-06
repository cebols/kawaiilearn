import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { sentencesForWeek } from "../content/sentences";
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";

/** Embaralha estável (não remexe a cada render). */
function shuffled<T>(arr: T[], seed: string): T[] {
  const a = arr.map((v, i) => ({ v, k: (seed.charCodeAt(i % seed.length) * (i + 7)) % 97 }));
  return a.sort((x, y) => x.k - y.k).map((o) => o.v);
}

/** Construção de frase: monte a frase na ordem certa tocando nas peças. */
export default function SentenceBuild({ week }: { week: number }) {
  const { t, i18n } = useTranslation();
  const { go, recordActivity } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const items = useMemo(() => sentencesForWeek(week), [week]);

  const [idx, setIdx] = useState(0);
  const [placed, setPlaced] = useState<number[]>([]); // índices de tiles na ordem escolhida
  const [status, setStatus] = useState<"building" | "correct" | "wrong">("building");
  const [done, setDone] = useState(0);

  const item = items[idx];

  // peças embaralhadas (por id da frase, estável)
  const order = useMemo(() => (item ? shuffled(item.tiles.map((_, i) => i), item.id) : []), [item]);
  const remaining = order.filter((i) => !placed.includes(i));

  if (!item) {
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{t("sentence.emptyTitle")}</h2>
        <p className="mt-1 text-sm text-stone-500">{t("sentence.emptySub")}</p>
        <button
          onClick={() => go({ name: "curriculum" })}
          className="mt-6 rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
        >
          {t("sentence.backCurriculum")}
        </button>
      </div>
    );
  }

  const finishedAll = idx >= items.length;
  if (finishedAll) {
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">🏯</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{t("sentence.done")}</h2>
        <p className="mt-1 text-sm text-stone-500">
          {done} {t("sentence.built")}
        </p>
        <button
          onClick={() => go({ name: "curriculum" })}
          className="mt-6 rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
        >
          {t("sentence.backCurriculum")}
        </button>
      </div>
    );
  }

  const place = (tileIdx: number) => {
    if (status !== "building") return;
    setPlaced((p) => [...p, tileIdx]);
  };
  const unplace = (tileIdx: number) => {
    if (status !== "building") return;
    setPlaced((p) => p.filter((i) => i !== tileIdx));
  };

  const check = () => {
    const correct = placed.every((ti, i) => ti === i) && placed.length === item.tiles.length;
    setStatus(correct ? "correct" : "wrong");
    if (correct) {
      setDone((d) => d + 1);
      void recordActivity("sentences");
      if (ttsAvailable()) speak(item.tiles.join(""));
    }
  };

  const retry = () => {
    setPlaced([]);
    setStatus("building");
  };

  const next = () => {
    setPlaced([]);
    setStatus("building");
    setIdx((i) => i + 1);
  };

  return (
    <div className="mx-auto max-w-md pop-in">
      <p className="mb-2 text-center text-xs text-stone-400">
        {idx + 1} / {items.length} · {t("curriculum.week")} {week}
      </p>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        {/* pedido: traduzir do idioma do usuário para o japonês */}
        <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("sentence.prompt")}</p>
        <p className="mt-1 text-lg font-semibold text-stone-800">{item.translation[lang]}</p>

        {/* linha de resposta */}
        <div className="mt-4 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-stone-200 p-3">
          {placed.length === 0 && <span className="text-sm text-stone-300">{t("sentence.tapHint")}</span>}
          {placed.map((ti) => (
            <button
              key={ti}
              onClick={() => unplace(ti)}
              className={`jp rounded-xl px-3 py-2 text-lg font-semibold shadow-sm transition ${
                status === "correct"
                  ? "bg-emerald-100 text-emerald-800"
                  : status === "wrong"
                    ? "bg-rose-100 text-rose-700"
                    : "bg-sakura-500 text-white hover:bg-sakura-600"
              }`}
            >
              {item.tiles[ti]}
            </button>
          ))}
        </div>

        {/* banco de peças */}
        <div className="mt-3 flex flex-wrap gap-2">
          {remaining.map((ti) => (
            <button
              key={ti}
              onClick={() => place(ti)}
              className="jp rounded-xl bg-stone-100 px-3 py-2 text-lg font-semibold text-stone-700 shadow-sm transition hover:bg-sakura-100"
            >
              {item.tiles[ti]}
            </button>
          ))}
        </div>

        {/* feedback + ações */}
        {status === "correct" && (
          <div className="pop-in mt-4 rounded-2xl bg-emerald-50 p-3 text-center">
            <p className="jp text-lg font-bold text-emerald-700">
              {item.tiles.join("")}
              {ttsAvailable() && (
                <button onClick={() => speak(item.tiles.join(""))} className="ml-2 text-sm">
                  🔊
                </button>
              )}
            </p>
            <p className="mt-1 text-xs text-emerald-800">💡 {item.note[lang]}</p>
          </div>
        )}
        {status === "wrong" && (
          <p className="pop-in mt-4 text-center text-sm font-semibold text-rose-600">{t("sentence.wrong")}</p>
        )}

        <div className="mt-5">
          {status === "building" && (
            <button
              disabled={placed.length !== item.tiles.length}
              onClick={check}
              className="w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition enabled:hover:bg-sakura-600 disabled:opacity-40"
            >
              {t("sentence.check")}
            </button>
          )}
          {status === "correct" && (
            <button onClick={next} className="w-full rounded-full bg-emerald-500 py-3 font-semibold text-white transition hover:bg-emerald-600">
              {t("sentence.next")} →
            </button>
          )}
          {status === "wrong" && (
            <button onClick={retry} className="w-full rounded-full bg-amber-500 py-3 font-semibold text-white transition hover:bg-amber-600">
              {t("sentence.retry")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
