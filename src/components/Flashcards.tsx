import { useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { kanaDeck } from "../content/decks";
import type { Grade } from "ts-fsrs";
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
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";

/** Sessão de flashcards SRS do deck de hiragana (leitura). */
export default function Flashcards({ deck }: { deck: string }) {
  const { t, i18n } = useTranslation();
  const { go, refresh, recordActivity } = useAppStore();
  const [queue, setQueue] = useState<StoredCard[] | null>(null);
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [reviewed, setReviewed] = useState(0);
  const [moreNew, setMoreNew] = useState(0);
  /** modo prática: quiz sem remexer no agendamento FSRS */
  const [cram, setCram] = useState(false);
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const items = kanaDeck(deck).items;

  useEffect(() => {
    (async () => {
      await ensureDeck(
        deck,
        items.map((h) => h.id),
        "reading"
      );
      setQueue(await buildQueue(deck, "reading"));
    })();
  }, [deck, items]);

  const current = queue?.[idx];
  const item = current ? items.find((h) => h.id === current.itemId) : undefined;

  // ao chegar no fim da fila, recalcula quantos cards novos ainda restam no deck
  useEffect(() => {
    if (queue && !queue[idx]) void countNewInDeck(deck, "reading").then(setMoreNew);
  }, [queue, idx, deck]);

  // a leitura toca sozinha ao mostrar um card novo (imersão auditiva)
  useEffect(() => {
    if (item && ttsAvailable()) speak(item.kana);
  }, [item]);

  const grading = useRef(false);
  const grade = useCallback(
    async (rating: Grade) => {
      // evita que toque duplo avalie o mesmo card 2x e pule o seguinte
      if (!current || grading.current) return;
      grading.current = true;
      // no modo prática não persistimos nada (não altera o agendamento)
      const updated = cram ? current : await review(current, rating);
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
      // até a prática livre conta como atividade do dia (só não mexe no agendamento)
      void recordActivity("cards");
      if (!cram) void refresh();
    },
    [current, cram, refresh, recordActivity]
  );

  const loadMore = useCallback(async () => {
    const batch = Math.min(NEW_PER_DAY, moreNew);
    setCram(false);
    setQueue(await buildQueue(deck, "reading", batch));
    setIdx(0);
    setRevealed(false);
  }, [deck, moreNew]);

  const startCram = useCallback(async () => {
    setCram(true);
    setQueue(await buildCramQueue(deck, "reading"));
    setIdx(0);
    setRevealed(false);
    setReviewed(0);
  }, [deck]);

  if (!queue) return null;

  if (!current || !item) {
    const capHit = reviewed === 0 && moreNew > 0;
    const heading = reviewed > 0 ? t("flash.sessionDone") : moreNew > 0 ? t("flash.dailyDone") : t("flash.noCards");
    return (
      <div className="mx-auto max-w-md pop-in rounded-3xl bg-white p-10 text-center shadow-sm">
        <p className="text-4xl">{moreNew > 0 ? "🌸" : "🎉"}</p>
        <h2 className="mt-3 text-xl font-bold text-stone-800">{heading}</h2>
        {reviewed > 0 && !cram && (
          <p className="mt-1 text-sm text-stone-500">
            {reviewed} {t("flash.reviewed")}
          </p>
        )}
        {capHit && <p className="mt-2 text-xs text-stone-400">{t("flash.dailyDoneSub")}</p>}
        {moreNew === 0 && <p className="mt-2 text-xs text-stone-400">{t("flash.allLearned")}</p>}

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
