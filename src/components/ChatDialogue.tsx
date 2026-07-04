import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DIALOGUES_W1 } from "../content/dialogues";
import { resolveChar } from "../content/characters";
import Avatar from "./Avatar";
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";
import type { Register } from "../types";

interface ChatMsg {
  from: "them" | "you";
  polite: string;
  casual: string;
  translation: { pt: string; en: string };
}

/** Conversa estilo app de mensagem, com toggle polido⇄casual em toda fala. */
export default function ChatDialogue({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { go, profile } = useAppStore();
  const dialogue = DIALOGUES_W1.find((d) => d.id === id)!;
  const char = resolveChar(dialogue.characterId, profile?.crush ?? "haruto");
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [register, setRegister] = useState<Register>(dialogue.register === "polite" ? "polite" : "casual");
  const [lineIdx, setLineIdx] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [showTranslations, setShowTranslations] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const line = dialogue.lines[lineIdx];
  const finished = lineIdx >= dialogue.lines.length;
  const casual = register === "casual";

  // falas do personagem entram sozinhas; as suas esperam a escolha
  useEffect(() => {
    if (finished || !line || line.speaker === "you") return;
    const timer = setTimeout(() => {
      setMsgs((m) => [...m, { from: "them", polite: line.polite, casual: line.casual, translation: line.translation }]);
      if (ttsAvailable()) speak(casual ? line.casual : line.polite);
      setLineIdx((i) => i + 1);
    }, msgs.length === 0 ? 400 : 1100);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIdx, finished]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, finished]);

  const choose = (c: { polite: string; casual: string; translation: { pt: string; en: string } }) => {
    setMsgs((m) => [...m, { from: "you", ...c }]);
    setLineIdx((i) => i + 1);
  };

  const replay = () => {
    setMsgs([]);
    setLineIdx(0);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col pop-in" style={{ height: "calc(100dvh - 130px)" }}>
      {/* header do chat */}
      <div className="flex items-center gap-3 rounded-t-3xl bg-white p-4 shadow-sm">
        <button onClick={() => go({ name: "dialogues" })} className="text-stone-400 hover:text-stone-600">
          ←
        </button>
        <Avatar c={char} size={44} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-stone-800">
            {char.name} <span className="jp text-xs text-stone-400">{char.nameJp}</span> {char.emoji}
          </p>
          <p className="truncate text-xs text-stone-400">{dialogue.scene[lang]}</p>
        </div>
        {/* toggle de registro */}
        <div className="flex rounded-full bg-stone-100 p-0.5 text-[10px] font-bold">
          <button
            onClick={() => setRegister("polite")}
            className={`rounded-full px-2.5 py-1 transition ${!casual ? "bg-indigo-500 text-white" : "text-stone-400"}`}
          >
            🎩
          </button>
          <button
            onClick={() => setRegister("casual")}
            className={`rounded-full px-2.5 py-1 transition ${casual ? "bg-sakura-500 text-white" : "text-stone-400"}`}
          >
            🎉
          </button>
        </div>
      </div>

      {/* mensagens */}
      <div className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-sakura-50 to-violet-50 p-4">
        {msgs.map((m, i) => {
          const text = casual ? m.casual : m.polite;
          return (
            <div key={i} className={`flex items-end gap-2 pop-in ${m.from === "you" ? "flex-row-reverse" : ""}`}>
              {m.from === "them" && <Avatar c={char} size={30} />}
              <div className="max-w-[75%]">
                <button
                  onClick={() => ttsAvailable() && speak(text)}
                  className={`jp rounded-2xl px-3.5 py-2 text-left text-sm shadow-sm transition ${
                    m.from === "you"
                      ? "rounded-br-sm bg-sakura-500 text-white"
                      : "rounded-bl-sm bg-white text-stone-800"
                  }`}
                  title="🔊"
                >
                  {text}
                </button>
                {showTranslations && (
                  <p className={`mt-0.5 text-[10px] text-stone-400 ${m.from === "you" ? "text-right" : ""}`}>
                    {m.translation[lang]}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {finished && (
          <div className="pop-in pt-2 text-center">
            <p className="text-sm font-bold text-stone-600">{t("dialogue.finished")}</p>
            <button
              onClick={replay}
              className="mt-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-sakura-600 shadow-sm hover:bg-sakura-100"
            >
              ↻ {t("dialogue.replay")}
            </button>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* área de escolha */}
      <div className="rounded-b-3xl bg-white p-3 shadow-sm">
        <label className="mb-2 flex items-center gap-1.5 px-1 text-[10px] text-stone-400">
          <input
            type="checkbox"
            checked={showTranslations}
            onChange={(e) => setShowTranslations(e.target.checked)}
            className="accent-pink-500"
          />
          {t("dialogue.showTranslation")}
        </label>
        {!finished && line?.speaker === "you" && line.choices ? (
          <div className="space-y-2">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wide text-stone-400">{t("dialogue.yourTurn")}</p>
            {line.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => choose(c)}
                className="jp w-full rounded-2xl border border-sakura-200 bg-sakura-50 px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:border-sakura-400 hover:bg-sakura-100"
              >
                {casual ? c.casual : c.polite}
                <span className="mt-0.5 block font-sans text-[10px] text-stone-400">{c.translation[lang]}</span>
              </button>
            ))}
          </div>
        ) : (
          !finished && <p className="px-1 pb-1 text-center text-xs text-stone-300">…</p>
        )}
      </div>
    </div>
  );
}
