import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { HIRAGANA } from "../content/hiragana";
import type { Grade } from "ts-fsrs";
import { ensureDeck, buildQueue, review, Rating } from "../srs/engine";
import type { StoredCard } from "../db/db";
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";

/** Sessão de flashcards SRS do deck de hiragana (leitura). */
export default function Flashcards({ deck }: { deck: string }) {
  const { t, i18n } = useTranslation();
  const { go, refresh } = useAppStore();
  const [queue, setQueue] = useState<StoredCard[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  useEffect(() => {
    (async () => {
      await ensureDeck(
        deck,
        HIRAGANA.map((h) => h.id),
        "reading"
      );
      setQueue(await buildQueue(deck, "reading"));
    })();
  }, [deck]);

  const current = queue?.[idx];
  const item = current ? HIRAGANA.find((h) => h.id === current.itemId) : undefined;

  const grading = useRef(false);
  const grade = useCallback(
    async (rating: Grade) => {
      // evita que toque duplo avalie o mesmo card 2x e pule o seguinte
      if (!current || grading.current) return;
      grading.current = true;
      const updated = await review(current, rating);
      setReviewed((n) => n + 1);
      setRevealed(false);
      setQueue((q) => {
        if (!q) return q;
        const next = [...q];
        // "De novo" volta pro fim da fila da sessão
        if (rating === Rating.Again) next.push(updated);
        return next;
      });
      setIdx((i) => i + 1);
      grading.current = false;
      void refresh();
    },
    [current, refresh]
  );

  if (!queue) return null;

  if (!current || !item) {
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">
          {reviewed > 0 ? t("flash.sessionDone") : t("flash.noCards")}
        </h2>
        {reviewed > 0 && (
          <p className="mt-1 text-sm text-stone-500">
            {reviewed} {t("flash.reviewed")}
          </p>
        )}
        <button
          onClick={() => go({ name: "home" })}
          className="mt-6 rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
        >
          {t("flash.backHome")}
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md pop-in">
      <p className="mb-2 text-center text-xs text-stone-400">
        {idx + 1} / {queue.length}
      </p>
      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-stone-400">{t("flash.whichRomaji")}</p>
        <p className="jp my-6 text-8xl font-bold text-stone-800">{item.kana}</p>

        {ttsAvailable() && (
          <button
            onClick={() => speak(item.kana)}
            className="mb-4 rounded-full bg-violet-100 px-4 py-1.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-200"
          >
            {t("flash.listen")}
          </button>
        )}

        {revealed ? (
          <div className="pop-in">
            <p className="text-3xl font-bold text-sakura-600">{item.romaji}</p>
            <p className="mt-3 rounded-2xl bg-amber-50 p-3 text-xs text-amber-800">
              💡 {t("flash.mnemonic")}: {item.mnemonic[lang]}
            </p>
            <div className="mt-5 grid grid-cols-4 gap-2 text-sm font-semibold">
              <GradeBtn label={t("flash.again")} color="bg-rose-100 text-rose-700 hover:bg-rose-200" onClick={() => grade(Rating.Again)} />
              <GradeBtn label={t("flash.hard")} color="bg-amber-100 text-amber-700 hover:bg-amber-200" onClick={() => grade(Rating.Hard)} />
              <GradeBtn label={t("flash.good")} color="bg-emerald-100 text-emerald-700 hover:bg-emerald-200" onClick={() => grade(Rating.Good)} />
              <GradeBtn label={t("flash.easy")} color="bg-sky-100 text-sky-700 hover:bg-sky-200" onClick={() => grade(Rating.Easy)} />
            </div>
          </div>
        ) : (
          <button
            onClick={() => setRevealed(true)}
            className="mt-2 w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition hover:bg-sakura-600"
          >
            {t("flash.showAnswer")}
          </button>
        )}
      </div>
    </div>
  );
}

function GradeBtn({ label, color, onClick }: { label: string; color: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`rounded-xl px-2 py-2.5 transition ${color}`}>
      {label}
    </button>
  );
}
