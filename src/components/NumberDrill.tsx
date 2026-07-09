import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { numberToKana, yenToKana, timeToKana, randomPrice, randomTime, COUNTERS } from "../lib/jaNumbers";
import { speak, ttsAvailable } from "../lib/tts";
import { listen, stopListening, speechAvailable } from "../lib/speech";
import { useAppStore } from "../store/useAppStore";

type Mode = "price" | "hear" | "time" | "counter";

/**
 * Treino de números e dinheiro — onde 90% dos turistas travam.
 * 💴 ver preço → dizer · 👂 ouvir → digitar · 🕐 horas · 🧮 contadores.
 */
export default function NumberDrill() {
  const { t } = useTranslation();
  const [mode, setMode] = useState<Mode>("price");

  useEffect(() => () => stopListening(), []);

  return (
    <div className="mx-auto max-w-md pop-in">
      <h2 className="text-2xl font-bold text-stone-800">{t("numbers.title")} 🔢</h2>
      <p className="mt-1 text-sm text-stone-500">{t("numbers.subtitle")}</p>

      {/* seletor de modo */}
      <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-full bg-stone-100 p-1 text-center text-[11px] font-bold">
        <ModeTab active={mode === "price"} onClick={() => setMode("price")} icon="💴" label={t("numbers.modePrice")} />
        <ModeTab active={mode === "hear"} onClick={() => setMode("hear")} icon="👂" label={t("numbers.modeHear")} />
        <ModeTab active={mode === "time"} onClick={() => setMode("time")} icon="🕐" label={t("numbers.modeTime")} />
        <ModeTab active={mode === "counter"} onClick={() => setMode("counter")} icon="🧮" label={t("numbers.modeCounter")} />
      </div>

      <div className="mt-4">
        {mode === "price" && <PriceSay key="price" />}
        {mode === "hear" && <HearType key="hear" />}
        {mode === "time" && <TimeSay key="time" />}
        {mode === "counter" && <CounterPick key="counter" />}
      </div>
    </div>
  );
}

function ModeTab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-1 py-1.5 transition ${active ? "bg-sakura-500 text-white shadow" : "text-stone-500 hover:text-stone-700"}`}
    >
      {icon} {label}
    </button>
  );
}

/** 💴 Vê o preço, fala (ou revela) a leitura. */
function PriceSay() {
  const { t } = useTranslation();
  const { recordActivity } = useAppStore();
  const [price, setPrice] = useState(randomPrice);
  const [revealed, setRevealed] = useState(false);
  const [mic, setMic] = useState<"idle" | "listening" | "hit" | "miss">("idle");
  const reading = yenToKana(price);

  const next = () => {
    setPrice(randomPrice());
    setRevealed(false);
    setMic("idle");
  };

  const say = async () => {
    setMic("listening");
    const r = await listen(reading);
    if (r.similarity >= 0.75) {
      setMic("hit");
      setRevealed(true);
      if (r.similarity >= 0.9) void recordActivity("speak");
    } else {
      setMic("miss");
    }
  };

  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{t("numbers.sayPrice")}</p>
      <p className="mt-4 text-5xl font-extrabold tabular-nums text-stone-800">¥{price.toLocaleString("ja-JP")}</p>

      {revealed && (
        <p className="jp pop-in mt-4 rounded-2xl bg-emerald-50 p-3 text-lg font-bold text-emerald-700">
          {reading}
          {ttsAvailable() && (
            <button onClick={() => void speak(reading)} className="ml-2 text-sm">
              🔊
            </button>
          )}
        </p>
      )}
      {mic === "miss" && <p className="pop-in mt-2 text-xs font-semibold text-rose-500">{t("numbers.micMiss")}</p>}
      {mic === "hit" && <p className="pop-in mt-2 text-xs font-semibold text-emerald-600">{t("speak.perfect")}</p>}

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {speechAvailable() && (
          <button
            onClick={() => void say()}
            disabled={mic === "listening"}
            className={`rounded-full px-5 py-2.5 font-semibold text-white transition disabled:opacity-60 ${
              mic === "listening" ? "animate-pulse bg-rose-500" : "bg-sakura-500 hover:bg-sakura-600"
            }`}
          >
            {mic === "listening" ? `🎙️ ${t("speak.listening")}` : `🎤 ${t("numbers.sayBtn")}`}
          </button>
        )}
        {!revealed && (
          <button onClick={() => setRevealed(true)} className="rounded-full bg-stone-100 px-5 py-2.5 font-semibold text-stone-600 hover:bg-stone-200">
            👀 {t("numbers.reveal")}
          </button>
        )}
        <button onClick={next} className="rounded-full bg-violet-100 px-5 py-2.5 font-semibold text-violet-700 hover:bg-violet-200">
          {t("numbers.next")} →
        </button>
      </div>
    </div>
  );
}

/** 👂 Ouve o preço, digita em algarismos. */
function HearType() {
  const { t } = useTranslation();
  const [price, setPrice] = useState(randomPrice);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<"idle" | "right" | "wrong">("idle");
  const reading = yenToKana(price);

  const next = () => {
    setPrice(randomPrice());
    setTyped("");
    setStatus("idle");
  };

  const check = () => {
    setStatus(Number(typed.replace(/\D/g, "")) === price ? "right" : "wrong");
  };

  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{t("numbers.hearPrompt")}</p>
      <button
        onClick={() => void speak(reading)}
        className="mt-4 rounded-full bg-violet-100 px-8 py-4 text-2xl transition hover:bg-violet-200"
      >
        🔊
      </button>
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="text-2xl font-bold text-stone-400">¥</span>
        <input
          type="text"
          inputMode="numeric"
          value={typed}
          onChange={(e) => {
            setTyped(e.target.value);
            setStatus("idle");
          }}
          onKeyDown={(e) => e.key === "Enter" && typed && check()}
          className="w-40 rounded-2xl border-2 border-stone-200 p-3 text-center text-2xl font-bold tabular-nums outline-none focus:border-sakura-400"
          placeholder="???"
        />
      </div>
      {status === "right" && (
        <p className="jp pop-in mt-3 rounded-2xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700">
          ✓ ¥{price.toLocaleString("ja-JP")} — {reading}
        </p>
      )}
      {status === "wrong" && (
        <p className="pop-in mt-3 rounded-2xl bg-rose-50 p-3 text-sm font-bold text-rose-600">{t("numbers.tryAgain")}</p>
      )}
      <div className="mt-5 flex justify-center gap-2">
        {status !== "right" ? (
          <button
            onClick={check}
            disabled={!typed}
            className="rounded-full bg-sakura-500 px-6 py-2.5 font-semibold text-white transition enabled:hover:bg-sakura-600 disabled:opacity-40"
          >
            {t("test.check")}
          </button>
        ) : (
          <button onClick={next} className="rounded-full bg-emerald-500 px-6 py-2.5 font-semibold text-white hover:bg-emerald-600">
            {t("numbers.next")} →
          </button>
        )}
      </div>
    </div>
  );
}

/** 🕐 Vê a hora, fala/revela a leitura (com o pesadelo do ふん/ぷん). */
function TimeSay() {
  const { t } = useTranslation();
  const { recordActivity } = useAppStore();
  const [time, setTime] = useState(randomTime);
  const [revealed, setRevealed] = useState(false);
  const [mic, setMic] = useState<"idle" | "listening" | "hit" | "miss">("idle");
  const reading = timeToKana(time.hour, time.minute);

  const next = () => {
    setTime(randomTime());
    setRevealed(false);
    setMic("idle");
  };

  const say = async () => {
    setMic("listening");
    const r = await listen(reading);
    if (r.similarity >= 0.75) {
      setMic("hit");
      setRevealed(true);
      if (r.similarity >= 0.9) void recordActivity("speak");
    } else setMic("miss");
  };

  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{t("numbers.sayTime")}</p>
      <p className="mt-4 text-5xl font-extrabold tabular-nums text-stone-800">
        {time.hour}:{String(time.minute).padStart(2, "0")}
      </p>
      {revealed && (
        <p className="jp pop-in mt-4 rounded-2xl bg-emerald-50 p-3 text-lg font-bold text-emerald-700">
          {reading}
          {ttsAvailable() && (
            <button onClick={() => void speak(reading)} className="ml-2 text-sm">
              🔊
            </button>
          )}
        </p>
      )}
      {mic === "miss" && <p className="pop-in mt-2 text-xs font-semibold text-rose-500">{t("numbers.micMiss")}</p>}
      {mic === "hit" && <p className="pop-in mt-2 text-xs font-semibold text-emerald-600">{t("speak.perfect")}</p>}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {speechAvailable() && (
          <button
            onClick={() => void say()}
            disabled={mic === "listening"}
            className={`rounded-full px-5 py-2.5 font-semibold text-white transition disabled:opacity-60 ${
              mic === "listening" ? "animate-pulse bg-rose-500" : "bg-sakura-500 hover:bg-sakura-600"
            }`}
          >
            {mic === "listening" ? `🎙️ ${t("speak.listening")}` : `🎤 ${t("numbers.sayBtn")}`}
          </button>
        )}
        {!revealed && (
          <button onClick={() => setRevealed(true)} className="rounded-full bg-stone-100 px-5 py-2.5 font-semibold text-stone-600 hover:bg-stone-200">
            👀 {t("numbers.reveal")}
          </button>
        )}
        <button onClick={next} className="rounded-full bg-violet-100 px-5 py-2.5 font-semibold text-violet-700 hover:bg-violet-200">
          {t("numbers.next")} →
        </button>
      </div>
      <p className="mt-3 text-[10px] text-stone-400">{t("numbers.timeHint")}</p>
    </div>
  );
}

/** 🧮 Contadores: significado → escolha a leitura certa. */
function CounterPick() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const [idx, setIdx] = useState(() => Math.floor(Math.random() * COUNTERS.length));
  const [chosen, setChosen] = useState<string | null>(null);
  const item = COUNTERS[idx];

  // 3 distratores de outros contadores
  const [options, setOptions] = useState<string[]>([]);
  useEffect(() => {
    const others = COUNTERS.filter((c) => c.kana !== item.kana)
      .map((c) => c.kana)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    setOptions([item.kana, ...others].sort(() => Math.random() - 0.5));
    setChosen(null);
  }, [idx, item.kana]);

  const next = () => setIdx(Math.floor(Math.random() * COUNTERS.length));

  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-stone-400">{t("numbers.counterPrompt")}</p>
      <p className="mt-3 text-2xl font-extrabold text-stone-800">{item.meaning[lang]}</p>
      <p className="jp mt-1 text-sm text-stone-400">{item.jp}</p>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {options.map((opt) => {
          let cls = "bg-stone-100 text-stone-700 hover:bg-sakura-100";
          if (chosen) {
            if (opt === item.kana) cls = "bg-emerald-500 text-white";
            else if (opt === chosen) cls = "bg-rose-400 text-white";
          }
          return (
            <button
              key={opt}
              onClick={() => {
                if (!chosen) {
                  setChosen(opt);
                  if (ttsAvailable()) void speak(item.kana);
                }
              }}
              className={`jp rounded-2xl px-3 py-3 text-lg font-bold transition ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {chosen && (
        <button onClick={next} className="pop-in mt-4 rounded-full bg-emerald-500 px-6 py-2.5 font-semibold text-white hover:bg-emerald-600">
          {t("numbers.next")} →
        </button>
      )}
      <p className="mt-3 text-[10px] text-stone-400">{t("numbers.counterHint")}</p>
    </div>
  );
}
