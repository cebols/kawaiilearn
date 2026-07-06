import { useTranslation } from "react-i18next";
import { useAppStore, suggestedPace } from "../store/useAppStore";
import { VOCAB_W1, registerStats } from "../content/vocab";
import { castFor } from "../content/characters";
import { DAILY_GOAL, dailyPercent } from "../lib/daily";
import Avatar from "./Avatar";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { stats, streak, startedAt, go, profile, daily } = useAppStore();
  const pace = suggestedPace(startedAt);
  const reg = registerStats(VOCAB_W1);
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const cast = castFor(profile?.crush ?? "haruto");
  const pct = dailyPercent(daily);
  // status honesto: acúmulo de revisões = atrasado; domínio acima da projeção = adiantado
  const paceStatus = stats.due > 25 ? "behind" : stats.mastered > pace.week * 10 ? "ahead" : "onTrack";

  return (
    <div className="mx-auto max-w-3xl space-y-6 pop-in">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-stone-800">{t("home.greeting")} 🌸</h2>
        <p className="mt-1 text-sm text-stone-500">
          {t("home.suggestedPace", { week: pace.week, day: pace.day })} · {t(`home.${paceStatus}`)}
        </p>
        <p className="mt-1 text-xs text-stone-400">{t("home.freePace")}</p>

        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <Stat value={stats.due} label={t("home.dueCards")} color="text-sakura-600" />
          <Stat value={stats.fresh} label={t("home.newCards")} color="text-violet-600" />
          <Stat value={streak} label={t("home.streak")} color="text-amber-500" />
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => go({ name: "flashcards", deck: "hiragana" })}
            className="rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white shadow transition hover:bg-sakura-600"
          >
            {stats.due > 0 ? t("home.startReview") : t("home.learnNew")}
          </button>
          <button
            onClick={() => go({ name: "trace" })}
            className="rounded-full bg-violet-100 px-6 py-2.5 font-semibold text-violet-700 transition hover:bg-violet-200"
          >
            ✍️ {t("home.traceAction")}
          </button>
          <button
            onClick={() => go({ name: "dialogues" })}
            className="rounded-full bg-emerald-100 px-6 py-2.5 font-semibold text-emerald-700 transition hover:bg-emerald-200"
          >
            💬 {t("home.dialogueAction")}
          </button>
        </div>
      </div>

      {/* meta do dia: barra de progresso + checklist */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <div className="flex items-baseline justify-between">
          <h3 className="font-bold text-stone-700">{t("home.dailyGoal")}</h3>
          <span className="text-sm font-bold text-sakura-600">{pct}%</span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sakura-400 to-sakura-600 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-stone-400">
          {pct >= 100 ? t("home.goalDone") : t("home.goalHint")}
        </p>
        <div className="mt-4 space-y-2">
          <GoalRow icon="🎴" label={t("home.goalCards")} done={daily.cards} goal={DAILY_GOAL.cards} onClick={() => go({ name: "flashcards", deck: "hiragana" })} remainLabel={t("home.remaining")} doneLabel={t("home.completed")} />
          <GoalRow icon="🧩" label={t("home.goalSentences")} done={daily.sentences} goal={DAILY_GOAL.sentences} onClick={() => go({ name: "curriculum" })} remainLabel={t("home.remaining")} doneLabel={t("home.completed")} />
          <GoalRow icon="💬" label={t("home.goalConvos")} done={daily.convos} goal={DAILY_GOAL.convos} onClick={() => go({ name: "dialogues" })} remainLabel={t("home.remaining")} doneLabel={t("home.completed")} />
        </div>
      </div>

      {/* medidor 55/45 */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="font-bold text-stone-700">{t("home.registerMeter")}</h3>
        <div className="mt-3 flex h-5 overflow-hidden rounded-full text-[10px] font-bold text-white">
          <div className="flex items-center justify-center bg-indigo-400" style={{ width: `${reg.polite}%` }}>
            {reg.polite}%
          </div>
          <div className="flex items-center justify-center bg-sakura-400" style={{ width: `${reg.casual}%` }}>
            {reg.casual}%
          </div>
        </div>
        <div className="mt-1.5 flex justify-between text-xs text-stone-500">
          <span>🎩 {t("home.polite")} (です・ます)</span>
          <span>{t("home.casual")} (タメ口) 🎉</span>
        </div>
      </div>

      {/* elenco */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="font-bold text-stone-700">{t("dialogue.friendsTitle")}</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cast.map((c) => (
            <button
              key={c.id}
              onClick={() => go({ name: "dialogues" })}
              className="flex items-center gap-3 rounded-2xl border border-stone-100 p-3 text-left transition hover:border-sakura-200 hover:bg-sakura-50"
            >
              <Avatar c={c} />
              <div className="min-w-0">
                <p className="font-semibold text-stone-800">
                  {c.name} <span className="jp text-xs text-stone-400">{c.nameJp}</span> {c.emoji}
                </p>
                <p className="truncate text-xs text-stone-500">{t(`chars.${c.id}.role`)}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide" style={{ color: c.accent }}>
                  {c.register === "polite" ? t("dialogue.polite") : c.register === "casual" ? t("dialogue.casual") : "〜"}
                </p>
              </div>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-stone-400">
          {lang === "pt"
            ? "Cada amigo vive num registro — conversar com todos treina a barra inteira."
            : "Each friend lives in one register — chatting with everyone trains the whole bar."}
        </p>
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="rounded-2xl bg-stone-50 p-3">
      <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  );
}

function GoalRow({
  icon,
  label,
  done,
  goal,
  onClick,
  remainLabel,
  doneLabel,
}: {
  icon: string;
  label: string;
  done: number;
  goal: number;
  onClick: () => void;
  remainLabel: string;
  doneLabel: string;
}) {
  const complete = done >= goal;
  const remaining = Math.max(0, goal - done);
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border p-2.5 text-left transition ${
        complete ? "border-emerald-100 bg-emerald-50/50" : "border-stone-100 hover:border-sakura-200 hover:bg-sakura-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-stone-700">{label}</p>
        <p className="text-xs text-stone-400">
          {complete ? `✓ ${doneLabel}` : `${remaining} ${remainLabel}`}
        </p>
      </div>
      <span className={`text-sm font-bold tabular-nums ${complete ? "text-emerald-600" : "text-stone-400"}`}>
        {Math.min(done, goal)}/{goal}
      </span>
    </button>
  );
}
