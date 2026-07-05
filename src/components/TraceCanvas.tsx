import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { HIRAGANA } from "../content/hiragana";
import STROKES from "../content/strokes/hiragana.json";
import { speak, ttsAvailable } from "../lib/tts";

const SIZE = 280;
/** viewBox padrão do KanjiVG */
const VB = 109;

type StrokeData = Record<string, { p: string[]; n: number[][] }>;
const strokeData: StrokeData = STROKES;

/**
 * Prática kinestésica: modelo com ordem de traços do KanjiVG
 * (números + seta de direção em cada traço, com animação), e o
 * usuário traça por cima com dedo/mouse.
 */
export default function TraceCanvas() {
  const { t } = useTranslation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [idx, setIdx] = useState(0);
  const [hasInk, setHasInk] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const item = HIRAGANA[idx];
  const strokes = strokeData[item.kana];

  const clear = () => {
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.clearRect(0, 0, SIZE, SIZE);
    setHasInk(false);
  };

  useEffect(() => {
    clear();
    setAnimKey((k) => k + 1); // reanima a ordem dos traços ao trocar de kana
  }, [idx]);

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
          <button
            onClick={() => setAnimKey((k) => k + 1)}
            className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-200"
          >
            ▶ {t("trace.animate")}
          </button>
        </div>

        {/* aspect-ratio 1:1 evita distorção em telas estreitas */}
        <div className="relative mx-auto touch-none" style={{ width: "min(280px, 100%)", aspectRatio: "1 / 1" }}>
          <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-stone-200">
            <div className="absolute left-1/2 top-0 h-full w-px bg-stone-100" />
            <div className="absolute left-0 top-1/2 h-px w-full bg-stone-100" />
          </div>

          {/* modelo KanjiVG: traços esmaecidos + números de ordem + seta de direção */}
          {strokes && (
            <svg key={animKey} viewBox={`0 0 ${VB} ${VB}`} className="pointer-events-none absolute inset-0 h-full w-full">
              <defs>
                <marker id="dir" viewBox="0 0 6 6" refX="3" refY="3" markerWidth="5" markerHeight="5" orient="auto">
                  <path d="M 1 1 L 5 3 L 1 5 Z" fill="#f472b6" />
                </marker>
              </defs>
              {strokes.p.map((d, i) => (
                <g key={i}>
                  {/* traço base esmaecido */}
                  <path d={d} fill="none" stroke="#e7e5e4" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                  {/* animação da ordem: cada traço se desenha na sua vez */}
                  <path
                    d={d}
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                    strokeDashoffset={1}
                    style={{ animation: `draw-stroke 0.7s ease-out ${i * 0.75}s forwards` }}
                  />
                  {/* setinha de direção no início do traço (orientação automática) */}
                  <path
                    d={d}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="0.1"
                    markerStart="url(#dir)"
                  />
                  {/* número da ordem */}
                  {strokes.n[i] && (
                    <text
                      x={strokes.n[i][0]}
                      y={strokes.n[i][1]}
                      fontSize="9"
                      fontWeight="bold"
                      fill="#db2777"
                    >
                      {i + 1}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          )}
          {/* fallback para caracteres ainda sem dados de traço */}
          {!strokes && (
            <span className="jp pointer-events-none absolute inset-0 flex select-none items-center justify-center text-stone-200" style={{ fontSize: "min(202px, 58vw)" }}>
              {item.kana}
            </span>
          )}

          <canvas
            ref={canvasRef}
            width={SIZE}
            height={SIZE}
            className="absolute inset-0 h-full w-full cursor-crosshair"
            onPointerDown={start}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
            onPointerCancel={end}
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
        <p className="mt-3 text-[9px] text-stone-300">{t("trace.attribution")}</p>
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
