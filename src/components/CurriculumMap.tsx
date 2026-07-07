import { useTranslation } from "react-i18next";
import { WEEKS, PHASES } from "../content/curriculum";
import { sentencesForWeek } from "../content/sentences";
import { lessonsForWeek } from "../content/lessons";
import { testAvailable } from "../content/weekTests";
import { useAppStore, type View } from "../store/useAppStore";

interface Activity {
  icon: string;
  labelKey: string;
  view: View;
}

/** Atividades jogáveis de cada semana (deriva do conteúdo existente). */
function weekActivities(week: number): Activity[] {
  const acts: Activity[] = [];
  if (week === 1) {
    acts.push({ icon: "🎴", labelKey: "curriculum.actKana", view: { name: "flashcards", deck: "hiragana" } });
    acts.push({ icon: "✍️", labelKey: "curriculum.actTrace", view: { name: "trace" } });
    acts.push({ icon: "💬", labelKey: "curriculum.actChat", view: { name: "dialogues" } });
  } else if (week === 2) {
    acts.push({ icon: "🎴", labelKey: "curriculum.actKana", view: { name: "flashcards", deck: "katakana" } });
    acts.push({ icon: "✍️", labelKey: "curriculum.actTrace", view: { name: "trace" } });
    acts.push({ icon: "💬", labelKey: "curriculum.actChat", view: { name: "dialogues" } });
  }
  if (sentencesForWeek(week).length > 0) {
    acts.push({ icon: "🧩", labelKey: "curriculum.actSentence", view: { name: "sentences", week } });
  }
  return acts;
}

/** Lições de gramática da semana (ordem lógica). */
function weekLessons(week: number) {
  return lessonsForWeek(week);
}

export default function CurriculumMap() {
  const { t, i18n } = useTranslation();
  const { currentWeek, go } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  return (
    <div className="mx-auto max-w-md pop-in">
      <h2 className="text-2xl font-bold text-stone-800">{t("curriculum.title")}</h2>
      <p className="mt-1 text-sm text-stone-500">{t("curriculum.subtitleMastery")}</p>

      <ol className="mt-6 space-y-3">
        {WEEKS.map((w, i) => {
          const isCurrent = w.num === currentWeek;
          const isCompleted = w.num < currentWeek;
          const isFuture = w.num > currentWeek;
          const acts = weekActivities(w.num);
          const phase = PHASES[w.phase];
          const newPhase = i === 0 || WEEKS[i - 1].phase !== w.phase;
          return (
            <li key={w.num}>
              {newPhase && (
                <div className="mb-2 mt-5 flex items-center gap-2 first:mt-0">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: phase.color }} />
                  <span className="text-sm font-extrabold" style={{ color: phase.color }}>
                    {phase[lang]}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-400">· {phaseLevel(w.phase, lang)}</span>
                  <span className="h-px flex-1 bg-stone-100" />
                </div>
              )}
              <div
                className={`rounded-2xl p-4 shadow-sm transition ${
                  isCurrent
                    ? "bg-white ring-2 ring-sakura-400"
                    : isCompleted
                      ? "bg-emerald-50/40"
                      : "bg-white opacity-70"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-stone-800">
                    {isCompleted && "✓ "}
                    {t("curriculum.week")} {w.num} — {w.title[lang]}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                    style={{ background: phase.color }}
                  >
                    {w.level}
                  </span>
                  {isCurrent && (
                    <span className="rounded-full bg-sakura-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      🌸 {t("curriculum.here")}
                    </span>
                  )}
                  {isCompleted && (
                    <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                      {t("curriculum.passed")}
                    </span>
                  )}
                </div>

                <ul className="mt-1.5 space-y-0.5 text-xs text-stone-500">
                  {w.goals.map((g, gi) => (
                    <li key={gi}>・{g[lang]}</li>
                  ))}
                </ul>

                {/* lições de gramática — leia ANTES do exercício */}
                {weekLessons(w.num).length > 0 && (
                  <div className="mt-3 rounded-2xl bg-amber-50 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">
                      📖 {t("curriculum.lessons")}
                    </p>
                    <div className="mt-2 space-y-1.5">
                      {weekLessons(w.num).map((l) => (
                        <button
                          key={l.id}
                          onClick={() => go({ name: "lesson", id: l.id })}
                          className="flex w-full items-center gap-2 rounded-xl bg-white px-3 py-2 text-left text-xs shadow-sm transition hover:bg-amber-100"
                        >
                          <span>{l.emoji}</span>
                          <span className="flex-1 font-semibold text-stone-800">{l.title[lang]}</span>
                          <span className="text-stone-300">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {acts.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {acts.map((a, ai) => (
                      <button
                        key={ai}
                        onClick={() => go(a.view)}
                        className="rounded-full bg-sakura-50 px-3 py-1.5 text-xs font-semibold text-sakura-700 transition hover:bg-sakura-100"
                      >
                        {a.icon} {t(a.labelKey)}
                      </button>
                    ))}
                    {isCurrent && testAvailable(w.num) && (
                      <button
                        onClick={() => go({ name: "weekTest", week: w.num })}
                        className="rounded-full bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-stone-700"
                      >
                        🏯 {t("curriculum.actTest")}
                      </button>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-[11px] italic text-stone-400">{t("curriculum.comingSoon")}</p>
                )}
                {isFuture && (
                  <p className="mt-2 text-[11px] italic text-stone-400">
                    🔒 {t("curriculum.lockedByMastery")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Rótulo de dificuldade da fase, para a curva de aprendizado. */
function phaseLevel(phase: number, lang: "pt" | "en"): string {
  const ranges: Record<number, string> = { 1: "N5", 2: "N5", 3: "N5", 4: "N5+", 5: "N4", 6: "N4" };
  const word = lang === "pt" ? "nível" : "level";
  return `${word} ${ranges[phase]}`;
}
