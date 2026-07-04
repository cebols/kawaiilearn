import { useTranslation } from "react-i18next";
import { WEEKS } from "../content/curriculum";
import { useAppStore, suggestedPace } from "../store/useAppStore";

const PHASE_COLORS: Record<number, string> = {
  1: "bg-sakura-100 text-sakura-700",
  2: "bg-violet-100 text-violet-700",
  3: "bg-emerald-100 text-emerald-700",
  4: "bg-amber-100 text-amber-700",
};

export default function CurriculumMap() {
  const { t, i18n } = useTranslation();
  const { startedAt, go } = useAppStore();
  const pace = suggestedPace(startedAt);
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  return (
    <div className="mx-auto max-w-3xl pop-in">
      <h2 className="text-2xl font-bold text-stone-800">{t("curriculum.title")}</h2>
      <p className="mt-1 text-sm text-stone-500">{t("curriculum.subtitle")}</p>

      <ol className="mt-6 space-y-3">
        {WEEKS.map((w) => {
          const isSuggested = w.num === pace.week;
          return (
            <li
              key={w.num}
              className={`rounded-2xl bg-white p-4 shadow-sm transition ${
                isSuggested ? "ring-2 ring-sakura-400" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-stone-800">
                      {t("curriculum.week")} {w.num} — {w.title[lang]}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${PHASE_COLORS[w.phase]}`}>
                      {t(`curriculum.phase${w.phase}`)}
                    </span>
                    {isSuggested && (
                      <span className="rounded-full bg-sakura-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        🌸 {t("curriculum.suggested")}
                      </span>
                    )}
                  </div>
                  <ul className="mt-1.5 space-y-0.5 text-xs text-stone-500">
                    {w.goals.map((g, i) => (
                      <li key={i}>・{g[lang]}</li>
                    ))}
                  </ul>
                  {!w.available && (
                    <p className="mt-1.5 text-[11px] italic text-stone-400">{t("curriculum.comingSoon")}</p>
                  )}
                </div>
                {w.available && (
                  <button
                    onClick={() => go({ name: "flashcards", deck: "hiragana" })}
                    className="shrink-0 rounded-full bg-sakura-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-sakura-600"
                  >
                    {t("curriculum.start")}
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
