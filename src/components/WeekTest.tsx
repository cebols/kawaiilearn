import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { testForWeek, type Question } from "../content/weekTests";
import { WEEKS } from "../content/curriculum";
import { speak, ttsAvailable } from "../lib/tts";
import { spaceOut } from "../lib/spacing";
import { useAppStore } from "../store/useAppStore";

type Phase = "intro" | "quiz" | "passed" | "failed";

/**
 * Teste rigoroso de passagem de semana. Regra: acertar 100% para avançar.
 * O aluno erra qualquer questão → recomeça o teste do zero (com nova ordem
 * de opções, mesmo pool). Passou → currentWeek++.
 */
export default function WeekTest({ week }: { week: number }) {
  const { t, i18n } = useTranslation();
  const { go, advanceWeek, currentWeek } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const weekInfo = WEEKS.find((w) => w.num === week);

  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [idx, setIdx] = useState(0);
  // resposta em curso (para frase = array de tiles escolhidas)
  const [choice, setChoice] = useState<string | null>(null);
  const [placed, setPlaced] = useState<number[]>([]);
  const [status, setStatus] = useState<"answering" | "right" | "wrong">("answering");
  const [wrongCount, setWrongCount] = useState(0);

  const test = useMemo(() => testForWeek(week, `${week}-${attempt}`), [week, attempt]);
  const q = test.questions[idx];
  const total = test.questions.length;

  const reset = () => {
    setPhase("intro");
    setIdx(0);
    setChoice(null);
    setPlaced([]);
    setStatus("answering");
    setWrongCount(0);
    setAttempt((a) => a + 1);
  };

  const start = () => {
    setPhase("quiz");
    setIdx(0);
    setChoice(null);
    setPlaced([]);
    setStatus("answering");
    setWrongCount(0);
  };

  const check = () => {
    if (!q) return;
    let correct = false;
    if (q.kind === "kana" || q.kind === "kana2r" || q.kind === "register") {
      correct = choice === q.answer;
    } else if (q.kind === "sentence") {
      correct = placed.length === q.answer.length && placed.every((ti, i) => q.tiles[ti] === q.answer[i]);
    }
    setStatus(correct ? "right" : "wrong");
    if (!correct) setWrongCount((w) => w + 1);
    if (correct && (q.kind === "sentence" || q.kind === "register")) {
      if (ttsAvailable()) void speak(q.kind === "sentence" ? q.answer.join("") : q.answer);
    } else if (correct && (q.kind === "kana" || q.kind === "kana2r") && ttsAvailable()) {
      void speak(q.kind === "kana" ? q.prompt : q.answer);
    }
  };

  const next = () => {
    if (idx + 1 >= total) {
      if (wrongCount > 0) setPhase("failed");
      else {
        setPhase("passed");
        void advanceWeek();
      }
      return;
    }
    setIdx((i) => i + 1);
    setChoice(null);
    setPlaced([]);
    setStatus("answering");
  };

  // ─── INTRO ───
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-md pop-in">
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <p className="text-4xl">🏯</p>
          <h2 className="mt-3 text-xl font-bold text-stone-800">
            {t("test.title", { week })}
          </h2>
          {weekInfo && <p className="mt-1 text-sm text-stone-500">{weekInfo.title[lang]}</p>}
          <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-left">
            <p className="text-xs font-bold uppercase tracking-wide text-amber-700">{t("test.rules")}</p>
            <ul className="mt-2 space-y-1 text-xs text-amber-900">
              <li>🎯 {t("test.rule1", { n: total })}</li>
              <li>🔥 {t("test.rule2")}</li>
              <li>♾️ {t("test.rule3")}</li>
            </ul>
          </div>
          <button
            onClick={start}
            className="mt-5 w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition hover:bg-sakura-600"
          >
            🚀 {t("test.start")}
          </button>
          <button
            onClick={() => go({ name: "home" })}
            className="mt-2 w-full rounded-full bg-stone-100 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-200"
          >
            {t("test.later")}
          </button>
        </div>
      </div>
    );
  }

  // ─── PASSED ───
  if (phase === "passed") {
    const nextWeek = Math.min(20, currentWeek);
    return (
      <div className="mx-auto max-w-md pop-in">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-sakura-50 p-8 text-center shadow-sm">
          <p className="text-5xl">🎉</p>
          <h2 className="mt-3 text-2xl font-extrabold text-emerald-700">{t("test.passed")}</h2>
          <p className="mt-2 text-sm text-stone-600">
            {t("test.passedSub", { week, next: nextWeek })}
          </p>
          {WEEKS.find((w) => w.num === nextWeek) && (
            <div className="mt-5 rounded-2xl bg-white p-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-sakura-600">{t("test.unlocked")}</p>
              <p className="mt-1 font-bold text-stone-800">
                {t("curriculum.week")} {nextWeek} — {WEEKS.find((w) => w.num === nextWeek)!.title[lang]}
              </p>
            </div>
          )}
          <button
            onClick={() => go({ name: "curriculum" })}
            className="mt-6 w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition hover:bg-sakura-600"
          >
            {t("test.goCurriculum")}
          </button>
        </div>
      </div>
    );
  }

  // ─── FAILED ───
  if (phase === "failed") {
    return (
      <div className="mx-auto max-w-md pop-in">
        <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
          <p className="text-5xl">🌱</p>
          <h2 className="mt-3 text-xl font-bold text-stone-800">{t("test.failed")}</h2>
          <p className="mt-2 text-sm text-stone-500">
            {t("test.failedSub", { n: wrongCount, total })}
          </p>
          <p className="mt-4 rounded-2xl bg-stone-50 p-3 text-xs text-stone-500">
            💡 {t("test.failedHint")}
          </p>
          <button
            onClick={reset}
            className="mt-5 w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition hover:bg-sakura-600"
          >
            🔁 {t("test.retry")}
          </button>
          <button
            onClick={() => go({ name: "home" })}
            className="mt-2 w-full rounded-full bg-stone-100 py-2.5 text-sm font-semibold text-stone-600 transition hover:bg-stone-200"
          >
            {t("test.later")}
          </button>
        </div>
      </div>
    );
  }

  // ─── QUIZ ───
  if (!q) return null;
  const percent = Math.round((idx / total) * 100);
  return (
    <div className="mx-auto max-w-md pop-in">
      {/* progresso */}
      <div className="mb-3 flex items-center gap-2 text-xs text-stone-500">
        <span className="font-bold">
          {idx + 1} / {total}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
          <div className="h-full rounded-full bg-sakura-400 transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      <div className="rounded-3xl bg-white p-6 shadow-sm">
        {q.kind === "kana" && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("test.readKana")}</p>
            <p className="jp mt-4 text-center text-7xl font-bold text-stone-800">{q.prompt}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {q.options.map((opt) => (
                <OptButton key={opt} opt={opt} status={status} chosen={choice} answer={q.answer} onClick={() => status === "answering" && setChoice(opt)} />
              ))}
            </div>
          </>
        )}

        {q.kind === "kana2r" && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("test.writeKana")}</p>
            <p className="mt-4 text-center text-4xl font-bold text-sakura-600 tracking-wide">{q.prompt}</p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              {q.options.map((opt) => (
                <OptButton key={opt} opt={opt} status={status} chosen={choice} answer={q.answer} jp onClick={() => status === "answering" && setChoice(opt)} />
              ))}
            </div>
          </>
        )}

        {q.kind === "register" && (
          <>
            <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{q.prompt[lang]}</p>
            <p className="jp mt-3 rounded-2xl bg-stone-50 p-4 text-center text-lg font-semibold text-stone-800">
              {spaceOut(q.source)}
            </p>
            <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-wide text-sakura-600">
              → {q.direction === "toCasual" ? t("dialogue.casual") : t("dialogue.polite")}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {q.options.map((opt) => (
                <OptButton key={opt} opt={spaceOut(opt)} realValue={opt} status={status} chosen={choice} answer={q.answer} big onClick={() => status === "answering" && setChoice(opt)} />
              ))}
            </div>
          </>
        )}

        {q.kind === "sentence" && (
          <SentenceQ q={q} placed={placed} setPlaced={setPlaced} status={status} lang={lang} t={t} />
        )}

        {/* feedback */}
        {status === "right" && (
          <p className="pop-in mt-4 text-center text-sm font-bold text-emerald-600">✓ {t("test.right")}</p>
        )}
        {status === "wrong" && (
          <div className="pop-in mt-4 rounded-2xl bg-rose-50 p-3 text-center text-sm text-rose-700">
            ✗ {t("test.wrong")}
            <p className="jp mt-1 text-xs">
              {t("test.correctWas")}{" "}
              <b>
                {q.kind === "sentence"
                  ? (q as Extract<Question, { kind: "sentence" }>).answer.join(" ")
                  : q.kind === "register"
                    ? spaceOut((q as Extract<Question, { kind: "register" }>).answer)
                    : (q as Extract<Question, { kind: "kana" | "kana2r" }>).answer}
              </b>
            </p>
          </div>
        )}

        <div className="mt-5">
          {status === "answering" && (
            <button
              disabled={
                (q.kind === "sentence" && placed.length !== q.tiles.length) ||
                ((q.kind === "kana" || q.kind === "kana2r" || q.kind === "register") && !choice)
              }
              onClick={check}
              className="w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition enabled:hover:bg-sakura-600 disabled:opacity-40"
            >
              {t("test.check")}
            </button>
          )}
          {status !== "answering" && (
            <button
              onClick={next}
              className={`w-full rounded-full py-3 font-semibold text-white transition ${
                status === "right" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-stone-500 hover:bg-stone-600"
              }`}
            >
              {idx + 1 >= total ? t("test.finish") : t("test.next")} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OptButton({
  opt,
  realValue,
  status,
  chosen,
  answer,
  onClick,
  big,
  jp,
}: {
  opt: string;
  /** Se opt é uma versão exibida (ex.: espaçada), use realValue pra comparar. */
  realValue?: string;
  status: "answering" | "right" | "wrong";
  chosen: string | null;
  answer: string;
  onClick: () => void;
  big?: boolean;
  jp?: boolean;
}) {
  const key = realValue ?? opt;
  let cls = "bg-stone-100 text-stone-700 hover:bg-sakura-100";
  if (status === "answering" && chosen === key) cls = "bg-sakura-500 text-white";
  else if (status !== "answering" && key === answer) cls = "bg-emerald-500 text-white";
  else if (status !== "answering" && chosen === key) cls = "bg-rose-400 text-white";
  const size = jp ? "jp text-3xl font-bold" : big ? "jp text-base" : "text-lg font-semibold";
  return (
    <button onClick={onClick} className={`${size} rounded-2xl px-3 py-3 transition ${cls}`}>
      {opt}
    </button>
  );
}

function SentenceQ({
  q,
  placed,
  setPlaced,
  status,
  lang,
  t,
}: {
  q: Extract<Question, { kind: "sentence" }>;
  placed: number[];
  setPlaced: (p: number[]) => void;
  status: "answering" | "right" | "wrong";
  lang: "pt" | "en";
  t: (k: string) => string;
}) {
  const remaining = q.tiles.map((_, i) => i).filter((i) => !placed.includes(i));
  const place = (i: number) => status === "answering" && setPlaced([...placed, i]);
  const unplace = (i: number) => status === "answering" && setPlaced(placed.filter((x) => x !== i));
  return (
    <>
      <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("sentence.prompt")}</p>
      <p className="mt-1 text-sm font-semibold text-stone-800">{q.prompt[lang]}</p>
      <div className="mt-3 flex min-h-14 flex-wrap items-center gap-2 rounded-2xl border-2 border-dashed border-stone-200 p-3">
        {placed.length === 0 && <span className="text-xs text-stone-300">{t("sentence.tapHint")}</span>}
        {placed.map((ti) => (
          <button key={ti} onClick={() => unplace(ti)} className="jp rounded-xl bg-sakura-500 px-3 py-1.5 text-sm font-semibold text-white">
            {q.tiles[ti]}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {remaining.map((ti) => (
          <button key={ti} onClick={() => place(ti)} className="jp rounded-xl bg-stone-100 px-3 py-1.5 text-sm font-semibold text-stone-700 hover:bg-sakura-100">
            {q.tiles[ti]}
          </button>
        ))}
      </div>
    </>
  );
}
