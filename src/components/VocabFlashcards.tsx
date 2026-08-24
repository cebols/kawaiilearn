import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import type { Grade } from "ts-fsrs";
import { vocabForWeek, vocabDeckId } from "../content/vocab";
import type { VocabItem } from "../types";
import {
  ensureDeck,
  buildQueue,
  buildCramQueue,
  countNewInDeck,
  review,
  Rating,
  NEW_PER_DAY,
} from "../srs/engine";
import type { StoredCard } from "../db/db";
import { useAppStore } from "../store/useAppStore";

const REGISTER_COLOR: Record<string, string> = {
  polite: "bg-indigo-100 text-indigo-700",
  neutral: "bg-stone-100 text-stone-600",
  casual: "bg-sakura-100 text-sakura-700",
};

export default function VocabFlashcards({ week }: { week: number }) {
  const { t, i18n } = useTranslation();
  const { go, refresh, recordActivity } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  const items = vocabForWeek(week);
  const deckId = vocabDeckId(week);

  const [queue, setQueue] = useState<StoredCard[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [moreNew, setMoreNew] = useState(0);
  const [cram, setCram] = useState(false);
  const [sessionAgains, setSessionAgains] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      await ensureDeck(deckId, items.map((v) => v.id), "vocab");
      setQueue(await buildQueue(deckId, "vocab"));
    })();
  }, [deckId, items]);

  const current = queue?.[idx];
  const item: VocabItem | undefined = current
    ? items.find((v) => v.id === current.itemId)
    : undefined;

  useEffect(() => {
    if (queue && !queue[idx]) {
      void countNewInDeck(deckId, "vocab").then(setMoreNew);
    }
  }, [queue, idx, deckId]);

  const grading = useRef(false);
  const grade = useCallback(
    async (rating: Grade) => {
      if (!current || grading.current) return;
      grading.current = true;
      const updated = cram ? current : await review(current, rating);
      setReviewed((n) => n + 1);
      setRevealed(false);
      if (rating === Rating.Again) {
        setSessionAgains((prev) =>
          prev.includes(current.itemId) ? prev : [...prev, current.itemId]
        );
      }
      setQueue((q) => {
        if (!q) return q;
        const next = [...q];
        if (rating === Rating.Again) next.push(updated);
        return next;
      });
      setIdx((i) => i + 1);
      grading.current = false;
      void recordActivity("vocab");
      if (!cram) void refresh();
    },
    [current, cram, refresh, recordActivity]
  );

  const loadMore = useCallback(async () => {
    const batch = Math.min(NEW_PER_DAY, moreNew);
    setCram(false);
    setQueue(await buildQueue(deckId, "vocab", batch));
    setIdx(0);
    setRevealed(false);
  }, [deckId, moreNew]);

  const startCram = useCallback(async () => {
    setCram(true);
    setQueue(await buildCramQueue(deckId, "vocab"));
    setIdx(0);
    setRevealed(false);
    setReviewed(0);
  }, [deckId]);

  if (!queue) return null;

  if (!current || !item) {
    const capHit = reviewed === 0 && moreNew > 0;
    const heading = reviewed > 0
      ? t("vocab.sessionDone")
      : moreNew > 0
        ? t("vocab.dailyDone")
        : t("vocab.noCards");

    const againItems = sessionAgains
      .map((id) => items.find((v) => v.id === id))
      .filter(Boolean) as VocabItem[];

    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">{moreNew > 0 ? "🌸" : "🎉"}</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{heading}</h2>
        {reviewed > 0 && !cram && (
          <p className="mt-1 text-sm text-stone-500">
            {reviewed} {t("vocab.reviewed")}
          </p>
        )}
        {capHit && <p className="mt-2 text-xs text-stone-400">{t("vocab.dailyDoneSub")}</p>}

        {againItems.length > 0 && (
          <div className="mt-5 rounded-2xl bg-rose-50 p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
              {t("flash.struggles")}
            </p>
            <div className="mt-2 space-y-1.5">
              {againItems.map((v) => (
                <div key={v.id} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-sm">
                  <p className="jp text-lg font-bold text-stone-800">{v.polite}</p>
                  <p className="flex-1 text-[11px] text-stone-500">{v.meaning[lang]}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[10px] text-rose-500">{t("flash.struggleHint")}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          {moreNew > 0 ? (
            <button
              onClick={loadMore}
              className="rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition hover:bg-sakura-600"
            >
              {t("flash.learnMore", { count: Math.min(NEW_PER_DAY, moreNew) })}
            </button>
          ) : (
            <button
              onClick={startCram}
              className="rounded-full bg-violet-500 px-6 py-2.5 font-semibold text-white transition hover:bg-violet-600"
            >
              {t("flash.practice")}
            </button>
          )}
          <button
            onClick={() => go({ name: "home" })}
            className="rounded-full bg-stone-100 px-6 py-2.5 font-semibold text-stone-600 transition hover:bg-stone-200"
          >
            {t("flash.backHome")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md pop-in">
      <p className="mb-2 flex items-center justify-center gap-2 text-center text-xs text-stone-400">
        <span>
          {idx + 1} / {queue.length}
        </span>
        {cram && (
          <span className="rounded-full bg-violet-100 px-2 py-0.5 font-semibold text-violet-600">
            {t("flash.practiceBadge")}
          </span>
        )}
      </p>

      <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm text-stone-400">{t("vocab.prompt")}</p>

        <div className="my-6">
          <p className="jp text-5xl font-bold text-stone-800">{item.polite}</p>
          {item.politeReading && (
            <p className="mt-1 text-base text-stone-400">{item.politeReading}</p>
          )}
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${REGISTER_COLOR[item.register]}`}
          >
            {t(`dialogue.${item.register}`)}
          </span>
        </div>

        {revealed ? (
          <div className="pop-in space-y-3">
            <p className="text-2xl font-bold text-sakura-600">{item.meaning[lang]}</p>

            {item.casual && (
              <div className="rounded-2xl bg-sakura-50 p-3 text-center">
                <p className="mb-0.5 text-[10px] font-bold uppercase tracking-wider text-sakura-500">
                  {t("vocab.casualForm")}
                </p>
                <p className="jp text-2xl font-bold text-sakura-700">{item.casual}</p>
                {item.casualReading && (
                  <p className="mt-0.5 text-xs text-sakura-400">{item.casualReading}</p>
                )}
              </div>
            )}

            {item.note && (
              <p className="rounded-2xl bg-amber-50 p-3 text-xs text-amber-800">
                💡 {item.note[lang]}
              </p>
            )}

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
