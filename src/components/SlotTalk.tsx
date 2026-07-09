import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { slotTalkById, type SlotOption } from "../content/slotTalks";
import { resolveChar } from "../content/characters";
import Avatar from "./Avatar";
import { speak, ttsAvailable } from "../lib/tts";
import { listen, stopListening, speechAvailable } from "../lib/speech";
import { useAppStore } from "../store/useAppStore";

interface Msg {
  from: "them" | "you";
  jp: string;
  jpKana?: string;
  translation: { pt: string; en: string };
}

/**
 * Conversação por slots: o personagem pergunta, você COMPÕE a resposta
 * (template + escolha do pool) e ele reage à sua escolha específica.
 * Parece conversa livre — e é 100% offline, sem LLM.
 */
export default function SlotTalk({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { go, profile, recordActivity } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const talk = slotTalkById(id);
  const char = resolveChar(talk?.characterId ?? "yuki", profile?.crush ?? "haruto");

  const [qIdx, setQIdx] = useState(0);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [picked, setPicked] = useState<SlotOption | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showTranslations, setShowTranslations] = useState(true);
  const [mic, setMic] = useState<"idle" | "listening" | "miss">("idle");
  const [done, setDone] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const askedFor = useRef(-1);

  const q = talk?.questions[qIdx];

  // pergunta do personagem entra com "digitando…"
  useEffect(() => {
    if (!talk || !q || askedFor.current === qIdx) return;
    askedFor.current = qIdx;
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "them", jp: q.question.jp, jpKana: q.question.jpKana, translation: q.question.translation }]);
      if (ttsAvailable()) void speak(q.question.jp);
    }, msgs.length === 0 ? 500 : 1400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIdx, talk]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, done]);

  useEffect(() => () => stopListening(), []);

  if (!talk || !q) return null;

  const assembled = picked ? q.template.jp.replace("___", picked.jp) : null;

  const send = (viaMic = false) => {
    if (!picked || !assembled) return;
    setAnswered(true);
    setMic("idle");
    setMsgs((m) => [...m, { from: "you", jp: assembled, translation: picked.translation }]);
    if (!viaMic && ttsAvailable()) void speak(assembled);
    // reação do personagem à SUA escolha
    setTimeout(() => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMsgs((m) => [...m, { from: "them", jp: picked.reaction.jp, jpKana: picked.reaction.jpKana, translation: picked.reaction.translation }]);
        if (ttsAvailable()) void speak(picked.reaction.jp);
        // próxima pergunta ou fim
        setTimeout(() => {
          if (qIdx + 1 >= talk.questions.length) {
            setDone(true);
            void recordActivity("convos");
          } else {
            setPicked(null);
            setAnswered(false);
            setQIdx((i) => i + 1);
          }
        }, 1600);
      }, 1500);
    }, 800);
  };

  const sayIt = async () => {
    if (!assembled) return;
    setMic("listening");
    const r = await listen(assembled);
    if (r.similarity >= 0.75) {
      if (r.similarity >= 0.9) void recordActivity("speak");
      send(true);
    } else {
      setMic("miss");
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col pop-in" style={{ height: "calc(100dvh - 200px)", minHeight: 480 }}>
      {/* header */}
      <div className="flex items-center gap-3 rounded-t-3xl bg-white p-4 shadow-sm">
        <button onClick={() => go({ name: "dialogues" })} className="text-stone-400 hover:text-stone-600">
          ←
        </button>
        <Avatar c={char} size={44} />
        <div className="min-w-0 flex-1">
          <p className="font-bold text-stone-800">
            {char.name} <span className="jp text-xs text-stone-400">{char.nameJp}</span> {char.emoji}
          </p>
          <p className="truncate text-xs text-stone-400">{talk.title[lang]}</p>
        </div>
        <span className="shrink-0 rounded-full bg-violet-100 px-2 py-0.5 text-[9px] font-bold text-violet-700">
          🗣️ {t("slot.badge")}
        </span>
      </div>

      {/* mensagens */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-violet-50/60 to-sakura-50 p-4">
        {msgs.map((m, i) => (
          <div key={i} className={`flex items-end gap-2 pop-in ${m.from === "you" ? "flex-row-reverse" : ""}`}>
            {m.from === "them" && <Avatar c={char} size={30} />}
            <div className="max-w-[80%]">
              <div
                className={`jp rounded-2xl px-3.5 py-2 text-left text-sm shadow-sm ${
                  m.from === "you" ? "rounded-br-sm bg-violet-500 text-white" : "rounded-bl-sm bg-white text-stone-800"
                }`}
              >
                {m.jpKana ?? m.jp}
              </div>
              <div className={`mt-1 flex items-center gap-1.5 ${m.from === "you" ? "flex-row-reverse" : ""}`}>
                {ttsAvailable() && (
                  <button
                    onClick={() => void speak(m.jp)}
                    className="rounded-full bg-white px-2 py-0.5 text-[10px] text-violet-600 shadow-sm hover:bg-violet-100"
                  >
                    🔊
                  </button>
                )}
                {showTranslations && (
                  <span className={`text-[10px] text-stone-400 ${m.from === "you" ? "text-right" : ""}`}>{m.translation[lang]}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex items-end gap-2 pop-in">
            <Avatar c={char} size={30} />
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white px-3.5 py-3 shadow-sm">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        )}

        {done && (
          <div className="pop-in rounded-3xl bg-white p-5 text-center shadow-md">
            <p className="text-4xl">🗣️</p>
            <p className="mt-2 font-extrabold text-stone-800">{t("slot.done")}</p>
            <p className="mt-1 text-xs text-stone-500">{t("slot.doneSub")}</p>
            <button
              onClick={() => go({ name: "dialogues" })}
              className="mt-4 rounded-full bg-sakura-500 px-5 py-2 text-sm font-semibold text-white hover:bg-sakura-600"
            >
              {t("scenario.backToList")}
            </button>
          </div>
        )}
      </div>

      {/* área de composição */}
      {!done && (
        <div className="rounded-b-3xl bg-white p-3 shadow-sm">
          <label className="mb-2 flex items-center gap-1.5 px-1 text-[10px] text-stone-400">
            <input type="checkbox" checked={showTranslations} onChange={(e) => setShowTranslations(e.target.checked)} className="accent-pink-500" />
            {t("dialogue.showTranslation")}
          </label>

          {!answered && !typing && (
            <>
              {/* template com o slot */}
              <div className="rounded-2xl bg-violet-50 p-3">
                <p className="text-[10px] font-bold uppercase tracking-wide text-violet-600">{t("slot.compose")}</p>
                <p className="jp mt-1 text-center text-lg font-bold text-stone-800">
                  {q.template.jp.split("___").map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className={`mx-1 inline-block min-w-16 rounded-lg border-b-2 px-2 text-center ${picked ? "border-violet-400 text-violet-700" : "border-dashed border-stone-300 text-stone-300"}`}>
                          {picked ? picked.jp : "？"}
                        </span>
                      )}
                    </span>
                  ))}
                </p>
                <p className="mt-0.5 text-center text-[10px] text-stone-400">{q.template.translation[lang]}</p>
              </div>

              {/* pool de opções */}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {q.options.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setPicked(o);
                      setMic("idle");
                    }}
                    className={`jp rounded-xl px-3 py-2 text-sm font-semibold transition ${
                      picked?.id === o.id ? "bg-violet-500 text-white shadow" : "bg-stone-100 text-stone-700 hover:bg-violet-100"
                    }`}
                    title={o.translation[lang]}
                  >
                    {o.jp}
                  </button>
                ))}
              </div>

              {mic === "miss" && <p className="pop-in mt-2 px-1 text-[11px] font-semibold text-rose-500">{t("numbers.micMiss")}</p>}

              {/* enviar */}
              <div className="mt-2 flex gap-2">
                <button
                  disabled={!picked}
                  onClick={() => send()}
                  className="flex-1 rounded-full bg-violet-500 py-2.5 text-sm font-semibold text-white transition enabled:hover:bg-violet-600 disabled:opacity-40"
                >
                  💬 {t("slot.send")}
                </button>
                {speechAvailable() && (
                  <button
                    disabled={!picked || mic === "listening"}
                    onClick={() => void sayIt()}
                    className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-40 ${
                      mic === "listening" ? "animate-pulse bg-rose-500" : "bg-sakura-500 hover:bg-sakura-600"
                    }`}
                  >
                    🎤 {t("slot.sayIt")}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
