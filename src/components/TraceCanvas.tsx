import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HIRAGANA } from "../content/hiragana";
import { speak, ttsAvailable } from "../lib/tts";

const SIZE = 280;

/**
 * Prática kinestésica: traçar o kana por cima do modelo esmaecido.
 * Funciona com mouse e toque (celular/tablet = dedo, a melhor forma).
 */
export default function TraceCanvas() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [idx, setIdx] = useState(0);
  const [hasInk, setHasInk] = useState(false);
  const item = HIRAGANA[idx];

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, SIZE, SIZE);
    setHasInk(false);
  };

  useEffect(clear, [idx]);

  const pos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * SIZE,
      y: ((e.clientY - rect.top) / rect.height) * SIZE,
    };
  };

  const start = (e: React.PointerEvent<HTMLCanvasElement>) => {
    drawing.current = true;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const { x, y } = pos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#db2777";
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setHasInk(true);
  };

  const end = () => {
    drawing.current = false;
  };

  return (
    <div className="mx-auto max-w-md pop-in text-center">
      <h2 className="text-2xl font-bold text-stone-800">{t("trace.title")} ✍️</h2>
      <p className="mt-1 text-sm text-stone-500">{t("trace.instructions")}</p>

      <div className="mt-5 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-3 flex items-center justify-center gap-3">
          <p className="text-lg font-bold text-sakura-600">{item.romaji}</p>
          {ttsAvailable() && (
            <button
              onClick={() => speak(item.kana)}
              className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-200"
            >
              🔊
            </button>
          )}
        </div>

        <div className="relative mx-auto touch-none" style={{ width: SIZE, height: SIZE, maxWidth: "100%" }}>
          {/* grade de caligrafia */}
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-stone-200">
            <div className="absolute left-1/2 top-0 h-full w-px bg-stone-100" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-stone-100" />
          </div>
          {/* modelo esmaecido */}
          <span
            className="jp pointer-events-none absolute inset-0 flex select-none items-center justify-center text-stone-200"
            style={{ fontSize: SIZE * 0.72 }}
          >
            {item.kana}
          </span>
          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            className="absolute inset-0 h-full w-full cursor-crosshair"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
          />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            onClick={() => setIdx((i) => (i - 1 + HIRAGANA.length) % HIRAGANA.length)}
            className="rounded-full bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-200"
          >
            ← {t("trace.prev")}
          </button>
          <button
            onClick={clear}
            className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-200"
          >
            {t("trace.clear")}
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % HIRAGANA.length)}
            className="rounded-full bg-sakura-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sakura-600"
          >
            {t("trace.next")} →
          </button>
        </div>

        {hasInk && (
          <p className="pop-in mt-3 text-xs text-stone-400">
            {t("trace.selfGrade")} — {t("trace.gradeGood")} 🌸
          </p>
        )}
      </div>

      {/* seletor rápido */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {HIRAGANA.map((h, i) => (
          <button
            key={h.id}
            onClick={() => setIdx(i)}
            className={`jp h-9 w-9 rounded-lg text-sm transition ${
              i === idx ? "bg-sakura-500 text-white" : "bg-white text-stone-600 shadow-sm hover:bg-sakura-100"
            }`}
          >
            {h.kana}
          </button>
        ))}
      </div>
    </div>
  );
}
