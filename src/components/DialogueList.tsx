import { useTranslation } from "react-i18next";
import { DIALOGUES, CHAR_ORDER } from "../content/dialogues";
import { SCENARIOS } from "../content/scenarios";
import { SLOT_TALKS } from "../content/slotTalks";
import { resolveChar, castFor } from "../content/characters";
import Avatar from "./Avatar";
import { useAppStore, suggestedPace } from "../store/useAppStore";
import type { Dialogue } from "../types";

export default function DialogueList() {
  const { t, i18n } = useTranslation();
  const { go, profile, completedDialogues, startedAt, currentWeek } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const crush = profile?.crush ?? "haruto";
  const pace = suggestedPace(startedAt);

  // agrupa por personagem, na ordem do elenco, com os do seu nível primeiro
  const byChar = CHAR_ORDER.map((cid) => ({
    cid,
    dialogues: DIALOGUES.filter((d) => (cid === "crush" ? d.characterId === "crush" : d.characterId === cid))
      .slice()
      .sort((a, b) => a.week - b.week),
  })).filter((g) => g.dialogues.length > 0);

  return (
    <div className="mx-auto max-w-md pop-in">
      <h2 className="text-2xl font-bold text-stone-800">{t("dialogue.title")} 💬</h2>
      <p className="mt-1 text-sm text-stone-500">{t("dialogue.subtitle")}</p>

      {/* 🧳 cenários de sobrevivência de viagem */}
      <div className="mt-5 rounded-3xl bg-gradient-to-br from-amber-50 to-sakura-50 p-4 shadow-sm">
        <div className="flex items-baseline justify-between gap-2 px-1">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700">🧳 {t("scenario.eyebrow")}</p>
            <p className="text-sm font-bold text-stone-800">{t("scenario.sectionTitle")}</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {SCENARIOS.map((s) => {
            const recommended = s.week === currentWeek;
            const ahead = s.week > currentWeek;
            return (
              <button
                key={s.id}
                onClick={() => go({ name: "scenario", id: s.id })}
                className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm transition hover:shadow-md"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-50 text-xl">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1.5 text-sm font-bold text-stone-800">
                    <span className="truncate">{s.title[lang]}</span>
                    {recommended && (
                      <span className="shrink-0 rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                        {t("scenario.now")}
                      </span>
                    )}
                  </p>
                  <p className="truncate text-[11px] text-stone-500">🎯 {s.goal[lang]}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                    ahead ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {t("dialogue.week")} {s.week}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🗣️ conversação por slots (aparece a partir da semana 13) */}
      {currentWeek >= 13 && SLOT_TALKS.length > 0 && (
        <div className="mt-5 rounded-3xl bg-gradient-to-br from-violet-50 to-sakura-50 p-4 shadow-sm">
          <div className="px-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-violet-700">🗣️ {t("slot.eyebrow")}</p>
            <p className="text-sm font-bold text-stone-800">{t("slot.sectionTitle")}</p>
          </div>
          <div className="mt-3 space-y-2">
            {SLOT_TALKS.map((s) => {
              const char = resolveChar(s.characterId, crush);
              return (
                <button
                  key={s.id}
                  onClick={() => go({ name: "slotTalk", id: s.id })}
                  className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left shadow-sm transition hover:shadow-md"
                >
                  <Avatar c={char} size={38} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-stone-800">{s.title[lang]}</p>
                    <p className="truncate text-[11px] text-stone-500">{s.questions.length} {t("slot.rounds")}</p>
                  </div>
                  <span className="text-stone-300">→</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-5 space-y-6">
        {byChar.map(({ cid, dialogues }) => {
          const c = resolveChar(cid, crush);
          return (
            <div key={cid}>
              {/* cabeçalho do personagem = "thread" de conversa */}
              <div className="mb-2 flex items-center gap-2 px-1">
                <Avatar c={c} size={34} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-stone-700">
                    {c.name} <span className="jp text-xs font-normal text-stone-400">{c.nameJp}</span> {c.emoji}
                  </p>
                  <p className="truncate text-[11px] text-stone-400">{t(`chars.${c.id}.role`)}</p>
                </div>
              </div>

              <div className="space-y-2">
                {dialogues.map((d) => (
                  <DialogueRow
                    key={d.id}
                    d={d}
                    lang={lang}
                    done={completedDialogues.has(d.id)}
                    aheadOfPace={d.week > pace.week}
                    onClick={() => go({ name: "dialogue", id: d.id })}
                    t={t}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* elenco / bios */}
      <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-stone-400">{t("dialogue.friendsTitle")}</p>
        <div className="mt-3 space-y-3">
          {castFor(crush).map((c) => (
            <div key={c.id} className="flex items-start gap-3">
              <Avatar c={c} size={40} />
              <div>
                <p className="text-sm font-semibold text-stone-700">
                  {c.name} {c.emoji} <span className="text-xs font-normal text-stone-400">— {t(`chars.${c.id}.role`)}</span>
                </p>
                <p className="text-xs text-stone-500">{t(`chars.${c.id}.bio`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DialogueRow({
  d,
  lang,
  done,
  aheadOfPace,
  onClick,
  t,
}: {
  d: Dialogue;
  lang: "pt" | "en";
  done: boolean;
  aheadOfPace: boolean;
  onClick: () => void;
  t: (k: string) => string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left shadow-sm transition hover:shadow-md ${
        done ? "border-emerald-100 bg-emerald-50/40" : "border-transparent bg-white"
      }`}
    >
      <span className="text-lg">{d.medium === "text" ? "📱" : "💬"}</span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 font-semibold text-stone-800">
          <span className="truncate">{d.title[lang]}</span>
          {done && <span className="shrink-0 text-emerald-500">✓</span>}
          {!done && !aheadOfPace && (
            <span className="shrink-0 rounded-full bg-sakura-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
              {t("dialogue.new")}
            </span>
          )}
        </p>
        <p className="mt-0.5 flex items-center gap-2 text-[10px]">
          <span
            className="font-semibold"
            style={{ color: d.register === "polite" ? "#6366f1" : d.register === "neutral" ? "#0d9488" : "#ec4899" }}
          >
            {d.register === "polite"
              ? `🎩 ${t("dialogue.polite")}`
              : d.register === "neutral"
                ? `🎓 ${t("dialogue.neutral")}`
                : `🎉 ${t("dialogue.casual")}`}
          </span>
          <span className={`rounded-full px-1.5 py-0.5 font-semibold ${aheadOfPace ? "bg-amber-100 text-amber-700" : "bg-stone-100 text-stone-500"}`}>
            {t("dialogue.week")} {d.week}
          </span>
        </p>
      </div>
      <span className="text-stone-300">→</span>
    </button>
  );
}
