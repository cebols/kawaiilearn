import { useTranslation } from "react-i18next";
import { DIALOGUES_W1 } from "../content/dialogues";
import { resolveChar, castFor } from "../content/characters";
import Avatar from "./Avatar";
import { useAppStore } from "../store/useAppStore";

export default function DialogueList() {
  const { t, i18n } = useTranslation();
  const { go, profile } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const crush = profile?.crush ?? "haruto";

  return (
    <div className="mx-auto max-w-md pop-in">
      <h2 className="text-2xl font-bold text-stone-800">{t("dialogue.title")} 💬</h2>
      <p className="mt-1 text-sm text-stone-500">{t("dialogue.subtitle")}</p>

      <div className="mt-5 space-y-3">
        {DIALOGUES_W1.map((d) => {
          const c = resolveChar(d.characterId, crush);
          return (
            <button
              key={d.id}
              onClick={() => go({ name: "dialogue", id: d.id })}
              className="flex w-full items-center gap-3 rounded-2xl bg-white p-4 text-left shadow-sm transition hover:shadow-md"
            >
              <Avatar c={c} />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-stone-800">{d.title[lang]}</p>
                <p className="truncate text-xs text-stone-500">
                  {c.name} · {t(`chars.${c.id}.role`)}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold" style={{ color: c.accent }}>
                  {d.register === "polite" ? `🎩 ${t("dialogue.polite")}` : `🎉 ${t("dialogue.casual")}`}
                </p>
              </div>
              <span className="text-stone-300">→</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("dialogue.friendsTitle")}</p>
        <div className="mt-3 space-y-3">
          {castFor(crush).map((c) => {
            const id = c.id;
            return (
              <div key={id} className="flex items-start gap-3">
                <Avatar c={c} size={40} />
                <div>
                  <p className="text-sm font-semibold text-stone-700">
                    {c.name} {c.emoji} <span className="text-xs font-normal text-stone-400">— {t(`chars.${id}.role`)}</span>
                  </p>
                  <p className="text-xs text-stone-500">{t(`chars.${id}.bio`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
