import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { scenarioById, type ScenarioChoice, type ScenarioEnding } from "../content/scenarios";
import { speak, ttsAvailable } from "../lib/tts";
import { listen, stopListening, speechAvailable } from "../lib/speech";
import { spaceOut } from "../lib/spacing";
import { useAppStore } from "../store/useAppStore";

interface Msg {
  from: "npc" | "you";
  jp: string;
  jpKana?: string;
  translation: { pt: string; en: string };
}

/**
 * Player de cenário de viagem: grafo ramificado, registro sempre polido.
 * Você responde tocando OU falando no microfone (🎤 em cada opção).
 */
export default function ScenarioPlay({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { go, recordActivity } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const scenario = scenarioById(id);

  const [nodeId, setNodeId] = useState(scenario?.start ?? "");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [ending, setEnding] = useState<ScenarioEnding | null>(null);
  const [typing, setTyping] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [kanaMode, setKanaMode] = useState(true);
  const [micBusy, setMicBusy] = useState<number | null>(null);
  const [micMiss, setMicMiss] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const spokenNode = useRef<string | null>(null);

  const node = scenario?.nodes[nodeId];

  // fala do NPC entra com "digitando…"
  useEffect(() => {
    if (!node || spokenNode.current === node.id) return;
    spokenNode.current = node.id;
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "npc", ...node.npc }]);
      if (ttsAvailable()) void speak(node.npc.jp.replace(/（[^）]*）/g, ""));
    }, msgs.length === 0 ? 500 : 1400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, ending]);

  useEffect(() => () => stopListening(), []);

  if (!scenario || !node) return null;

  const pick = (c: ScenarioChoice) => {
    setMicMiss(null);
    setMsgs((m) => [...m, { from: "you", jp: c.jp, jpKana: c.jpKana, translation: c.translation }]);
    if (ttsAvailable()) void speak(c.jp);
    if (c.next.startsWith("end:")) {
      const endId = c.next.slice(4);
      const end = scenario.endings[endId];
      setTimeout(() => {
        setEnding(end ?? null);
        if (end?.ok) void recordActivity("convos");
      }, 900);
    } else {
      setNodeId(c.next);
    }
  };

  /** fala a opção no microfone; se bater (≥0.7) escolhe ela */
  const sayChoice = async (c: ScenarioChoice, i: number) => {
    setMicBusy(i);
    setMicMiss(null);
    const r = await listen(c.jp);
    setMicBusy(null);
    if (r.similarity >= 0.7) {
      pick(c);
      if (r.similarity >= 0.9) void recordActivity("speak");
    } else {
      setMicMiss(r.transcript ? t("scenario.micMiss", { heard: r.transcript }) : t("speak.silent"));
    }
  };

  const textOf = (m: Msg) => (kanaMode && m.jpKana ? m.jpKana : m.jp);

  return (
    <div className="mx-auto flex max-w-md flex-col pop-in" style={{ height: "calc(100dvh - 200px)", minHeight: 460 }}>
      {/* header */}
      <div className="rounded-t-3xl bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => go({ name: "dialogues" })} className="text-stone-400 hover:text-stone-600">
            ←
          </button>
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-xl">{scenario.emoji}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-stone-800">{scenario.title[lang]}</p>
            <p className="truncate text-[11px] text-stone-400">
              📍 {scenario.place[lang]} · 🎯 {scenario.goal[lang]}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold text-indigo-700">
            🎩 {t("dialogue.polite")}
          </span>
        </div>
      </div>

      {/* mensagens */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-amber-50/60 to-sakura-50 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 pop-in ${m.from === "you" ? "flex-row-reverse" : ""}`}>
            {m.from === "npc" && (
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-base shadow-sm">
                {scenario.emoji}
              </span>
            )}
            <div className="max-w-[80%]">
              <div
                className={`jp rounded-2xl px-3.5 py-2 text-left text-sm shadow-sm ${
                  m.from === "you" ? "rounded-br-sm bg-indigo-500 text-white" : "rounded-bl-sm bg-white text-stone-800"
                }`}
              >
                {spaceOut(textOf(m))}
              </div>
              <div className={`mt-1 flex items-center gap-1.5 ${m.from === "you" ? "flex-row-reverse" : ""}`}>
                {ttsAvailable() && (
                  <button
                    onClick={() => void speak(m.jp.replace(/（[^）]*）/g, ""))}
                    className="rounded-full bg-white px-2 py-0.5 text-[10px] text-violet-600 shadow-sm hover:bg-violet-100"
                  >
                    🔊
                  </button>
                )}
                {showTranslations && (
                  <span className={`text-[10px] text-stone-400 ${m.from === "you" ? "text-right" : ""}`}>
                    {m.translation[lang]}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-2 pop-in">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-base shadow-sm">{scenario.emoji}</span>
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}

        {ending && (
          <div className="pop-in rounded-3xl bg-white p-5 text-center shadow-md">
            <p className="text-4xl">{ending.emoji}</p>
            <p className="mt-2 font-extrabold text-stone-800">{ending.title[lang]}</p>
            <p className="mt-1 text-xs text-stone-500">{ending.text[lang]}</p>
            <div className="mt-4 flex justify-center gap-2">
              <button
                onClick={() => {
                  setMsgs([]);
                  setEnding(null);
                  spokenNode.current = null;
                  setNodeId(scenario.start);
                }}
                className="rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-200"
              >
                ↻ {t("dialogue.replay")}
              </button>
              <button
                onClick={() => go({ name: "dialogues" })}
                className="rounded-full bg-sakura-500 px-4 py-2 text-xs font-semibold text-white hover:bg-sakura-600"
              >
                {t("scenario.backToList")}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* escolhas */}
      <div className="rounded-b-3xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[10px] text-stone-400">
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={showTranslations} onChange={(e) => setShowTranslations(e.target.checked)} className="accent-pink-500" />
            {t("dialogue.showTranslation")}
          </label>
          <label className="flex items-center gap-1.5">
            <input type="checkbox" checked={!kanaMode} onChange={(e) => setKanaMode(!e.target.checked)} className="accent-pink-500" />
            {t("dialogue.kanjiMode")}
          </label>
        </div>
        {micMiss && <p className="pop-in mb-2 px-1 text-[11px] font-semibold text-rose-500">{micMiss}</p>}
        {!ending && !typing && node && (
          <div className="space-y-2">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wide text-stone-400">{t("dialogue.yourTurn")}</p>
            {node.choices.map((c, i) => (
              <div key={i} className="flex items-stretch gap-1.5">
                <button
                  onClick={() => pick(c)}
                  className="jp min-w-0 flex-1 rounded-2xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:border-indigo-400 hover:bg-indigo-100"
                >
                  {spaceOut(kanaMode && c.jpKana ? c.jpKana : c.jp)}
                  <span className="mt-0.5 block font-sans text-[10px] text-stone-400">{c.translation[lang]}</span>
                </button>
                {speechAvailable() && (
                  <button
                    onClick={() => void sayChoice(c, i)}
                    disabled={micBusy !== null}
                    title={t("scenario.sayIt")}
                    className={`shrink-0 rounded-2xl px-3 text-lg transition disabled:opacity-40 ${
                      micBusy === i ? "animate-pulse bg-rose-500 text-white" : "bg-stone-100 hover:bg-sakura-100"
                    }`}
                  >
                    🎤
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
