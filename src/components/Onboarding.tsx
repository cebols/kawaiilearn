import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore, type Gender } from "../store/useAppStore";
import { charById, type CrushId } from "../content/characters";
import Avatar from "./Avatar";

/**
 * Onboarding de primeira abertura: como o app se refere a você
 * (com a dica de pronome japonês correspondente) e quem é a sua paquera.
 */
export default function Onboarding() {
  const { t } = useTranslation();
  const { saveProfile } = useAppStore();
  const [gender, setGender] = useState<Gender | null>(null);
  const [crush, setCrush] = useState<CrushId | null>(null);

  const genders: { id: Gender; label: string; pronoun: string; pronounNote: string }[] = [
    { id: "female", label: t("onboarding.female"), pronoun: "私 / あたし", pronounNote: "watashi / atashi" },
    { id: "male", label: t("onboarding.male"), pronoun: "私 / 僕", pronounNote: "watashi / boku" },
    { id: "neutral", label: t("onboarding.neutral"), pronoun: "私", pronounNote: "watashi" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm">
      <div className="pop-in max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">
        <h2 className="text-center text-xl font-extrabold text-stone-800">🌸 {t("onboarding.title")}</h2>
        <p className="mt-1 text-center text-xs text-stone-500">{t("onboarding.subtitle")}</p>

        {/* pergunta 1: gênero */}
        <p className="mt-5 text-sm font-bold text-stone-700">{t("onboarding.genderQ")}</p>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {genders.map((g) => (
            <button
              key={g.id}
              onClick={() => setGender(g.id)}
              className={`rounded-2xl border-2 p-3 text-center transition ${
                gender === g.id ? "border-sakura-400 bg-sakura-50" : "border-stone-100 hover:border-sakura-200"
              }`}
            >
              <p className="text-sm font-semibold text-stone-700">{g.label}</p>
              <p className="jp mt-1 text-base text-sakura-600">{g.pronoun}</p>
              <p className="text-[9px] text-stone-400">{g.pronounNote}</p>
            </button>
          ))}
        </div>
        <p className="mt-1.5 text-[10px] text-stone-400">💡 {t("onboarding.pronounNote")}</p>

        {/* pergunta 2: paquera */}
        <p className="mt-5 text-sm font-bold text-stone-700">{t("onboarding.crushQ")}</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["haruto", "mei"] as const).map((id) => {
            const c = charById(id);
            return (
              <button
                key={id}
                onClick={() => setCrush(id)}
                className={`flex flex-col items-center gap-2 rounded-2xl border-2 p-4 transition ${
                  crush === id ? "border-sakura-400 bg-sakura-50" : "border-stone-100 hover:border-sakura-200"
                }`}
              >
                <Avatar c={c} size={64} />
                <p className="text-sm font-semibold text-stone-700">
                  {c.name} <span className="jp text-xs text-stone-400">{c.nameJp}</span> ☕
                </p>
                <p className="text-center text-[10px] text-stone-500">{t(`onboarding.crush_${id}`)}</p>
              </button>
            );
          })}
        </div>

        <button
          disabled={!gender || !crush}
          onClick={() => gender && crush && void saveProfile({ gender, crush })}
          className="mt-6 w-full rounded-full bg-sakura-500 py-3 font-semibold text-white transition enabled:hover:bg-sakura-600 disabled:opacity-40"
        >
          {t("onboarding.start")} 🚀
        </button>
      </div>
    </div>
  );
}
