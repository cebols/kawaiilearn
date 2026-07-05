import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DIALOGUES } from "../content/dialogues";
import { resolveChar } from "../content/characters";
import Avatar from "./Avatar";
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";
import type { Register, SpeechPair } from "../types";

interface ChatMsg extends SpeechPair {
  from: "them" | "you";
}

/** Texto exibido/falado de uma mensagem, conforme registro e modo kana. */
function textOf(m: SpeechPair, casual: boolean, kanaMode: boolean): string {
  if (casual) return kanaMode ? (m.casualKana ?? m.casual) : m.casual;
  return kanaMode ? (m.politeKana ?? m.polite) : m.polite;
}

/** Leitura em kana quando o texto exibido contém kanji (senão null). */
function kanaOf(m: SpeechPair, casual: boolean): string | null {
  const kana = casual ? m.casualKana : m.politeKana;
  return kana ?? null;
}

/** Conversa estilo app de mensagem, com toggle polido⇄casual em toda fala. */
export default function ChatDialogue({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { go, profile, completeDialogue } = useAppStore();
  const dialogue = DIALOGUES.find((d) => d.id === id)!;
  const char = resolveChar(dialogue.characterId, profile?.crush ?? "haruto");
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";

  const [register, setRegister] = useState<Register>(dialogue.register === "polite" ? "polite" : "casual");
  // iniciantes começam sem kanji; o toggle mostra o texto "adulto" quando quiserem
  const [kanaMode, setKanaMode] = useState(true);
  const [lineIdx, setLineIdx] = useState(0);
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [showTranslations, setShowTranslations] = useState(false);
  const [readingShown, setReadingShown] = useState<Set<number>>(new Set());
  const [typing, setTyping] = useState(false);
  // quanto o personagem deve esperar antes de responder — o suficiente para
  // o áudio da SUA última fala terminar de tocar
  const pendingWaitRef = useRef(0);
  const listRef = useRef<HTMLDivElement>(null);

  const line = dialogue.lines[lineIdx];
  const finished = lineIdx >= dialogue.lines.length;
  const casual = register === "casual";

  // falas do personagem entram sozinhas, com "digitando…" antes
  useEffect(() => {
    if (finished || !line || line.speaker === "you") return;
    const base = msgs.length === 0 ? 400 : 900;
    const wait = Math.max(base, pendingWaitRef.current);
    pendingWaitRef.current = 0; // consome a espera do áudio do usuário
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "them", ...line }]);
      if (ttsAvailable()) speak(textOf(line, casual, false));
      setLineIdx((i) => i + 1);
    }, wait);
    return () => clearTimeout(timer);
    // `casual` nas deps: se o toggle mudar com fala pendente, o TTS sai no registro certo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lineIdx, finished, casual]);

  useEffect(() => {
    // rola só a lista de mensagens — scrollIntoView rolava a página e enterrava o header
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, finished]);

  useEffect(() => {
    if (finished) void completeDialogue(id);
  }, [finished, id, completeDialogue]);

  /** Estima a duração da fala para o personagem esperar o áudio terminar. */
  const speechMs = (text: string) => Math.min(6000, Math.max(1300, text.length * 150));

  const choose = (c: SpeechPair) => {
    setMsgs((m) => [...m, { from: "you", ...c }]);
    // sua mensagem também é falada — ouvir a própria fala fixa a pronúncia
    const text = textOf(c, casual, false);
    if (ttsAvailable()) {
      speak(text);
      // segura a resposta do personagem até o áudio da sua fala terminar
      pendingWaitRef.current = speechMs(text);
    }
    setLineIdx((i) => i + 1);
  };

  const toggleReading = (i: number) =>
    setReadingShown((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const replay = () => {
    setMsgs([]);
    setReadingShown(new Set());
    setLineIdx(0);
  };

  return (
    <div className="mx-auto flex max-w-md flex-col pop-in" style={{ height: "calc(100dvh - 200px)", minHeight: 420 }}>
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
            title={t("dialogue.polite")}
          >
            🎩
          </button>
          <button
            onClick={() => setRegister("casual")}
            className={`rounded-full px-2.5 py-1 transition ${casual ? "bg-sakura-500 text-white" : "text-stone-400"}`}
            title={t("dialogue.casual")}
          >
            🎉
          </button>
        </div>
      </div>

      {/* mensagens */}
      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-sakura-50 to-violet-50 p-4">
        {msgs.map((m, i) => {
          const text = textOf(m, casual, kanaMode);
          const reading = !kanaMode ? kanaOf(m, casual) : null;
          const you = m.from === "you";
          return (
            <div key={i} className={`flex items-end gap-2 pop-in ${you ? "flex-row-reverse" : ""}`}>
              {!you && <Avatar c={char} size={30} />}
              <div className="max-w-[78%]">
                <div
                  className={`jp rounded-2xl px-3.5 py-2 text-left text-sm shadow-sm ${
                    you ? "rounded-br-sm bg-sakura-500 text-white" : "rounded-bl-sm bg-white text-stone-800"
                  }`}
                >
                  {text}
                </div>
                <div className={`mt-1 flex items-center gap-1.5 ${you ? "flex-row-reverse" : ""}`}>
                  {ttsAvailable() && (
                    <button
                      onClick={() => speak(textOf(m, casual, false))}
                      className="rounded-full bg-white px-2 py-0.5 text-[10px] text-violet-600 shadow-sm transition hover:bg-violet-100"
                      title={t("dialogue.play")}
                    >
                      🔊
                    </button>
                  )}
                  {reading && (
                    <button
                      onClick={() => toggleReading(i)}
                      className={`jp rounded-full px-2 py-0.5 text-[10px] shadow-sm transition ${
                        readingShown.has(i) ? "bg-amber-400 text-white" : "bg-white text-amber-600 hover:bg-amber-100"
                      }`}
                      title={t("dialogue.reading")}
                    >
                      あ
                    </button>
                  )}
                  {showTranslations && (
                    <span className={`text-[10px] text-stone-400 ${you ? "text-right" : ""}`}>{m.translation[lang]}</span>
                  )}
                </div>
                {reading && readingShown.has(i) && (
                  <p className={`jp pop-in mt-0.5 text-[11px] text-amber-700 ${you ? "text-right" : ""}`}>{reading}</p>
                )}
              </div>
            </div>
          );
        })}

        {/* "digitando…" enquanto o áudio da sua fala toca */}
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
      </div>

      {/* área de escolha */}
      <div className="rounded-b-3xl bg-white p-3 shadow-sm">
        <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 px-1 text-[10px] text-stone-400">
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={showTranslations}
              onChange={(e) => setShowTranslations(e.target.checked)}
              className="accent-pink-500"
            />
            {t("dialogue.showTranslation")}
          </label>
          <label className="flex items-center gap-1.5">
            <input
              type="checkbox"
              checked={!kanaMode}
              onChange={(e) => setKanaMode(!e.target.checked)}
              className="accent-pink-500"
            />
            {t("dialogue.kanjiMode")}
          </label>
        </div>
        {!finished && line?.speaker === "you" && line.choices ? (
          <div className="space-y-2">
            <p className="px-1 text-[10px] font-bold uppercase tracking-wide text-stone-400">{t("dialogue.yourTurn")}</p>
            {line.choices.map((c, i) => (
              <button
                key={i}
                onClick={() => choose(c)}
                className="jp w-full rounded-2xl border border-sakura-200 bg-sakura-50 px-3.5 py-2.5 text-left text-sm text-stone-700 transition hover:border-sakura-400 hover:bg-sakura-100"
              >
                {textOf(c, casual, kanaMode)}
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
