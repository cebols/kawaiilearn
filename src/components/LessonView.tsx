import { useTranslation } from "react-i18next";
import { lessonById } from "../content/lessons";
import { speak, ttsAvailable } from "../lib/tts";
import { useAppStore } from "../store/useAppStore";
import type { LessonBlock } from "../content/lessons";

/** Renderiza uma lição de gramática (leitura curta com exemplos falados). */
export default function LessonView({ id }: { id: string }) {
  const { t, i18n } = useTranslation();
  const { go } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const lesson = lessonById(id);

  if (!lesson) {
    return (
      <div className="mx-auto max-w-md pop-in text-center">
        <p className="text-sm text-stone-500">{t("lesson.notFound")}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md pop-in space-y-4">
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-sakura-600">
          {t("curriculum.week")} {lesson.week} · {t("lesson.tag")}
        </p>
        <h2 className="mt-2 flex items-start gap-2 text-xl font-extrabold text-stone-800">
          <span className="text-2xl">{lesson.emoji}</span>
          <span>{lesson.title[lang]}</span>
        </h2>
        <p className="mt-1 text-sm text-stone-500">{lesson.subtitle[lang]}</p>
      </div>

      {lesson.blocks.map((b, i) => (
        <Block key={i} block={b} lang={lang} />
      ))}

      <div className="flex gap-2">
        <button
          onClick={() => go({ name: "curriculum" })}
          className="flex-1 rounded-full bg-stone-100 py-3 text-sm font-semibold text-stone-600 transition hover:bg-stone-200"
        >
          ← {t("lesson.backToWeek")}
        </button>
        <button
          onClick={() => go({ name: "sentences", week: lesson.week })}
          className="flex-1 rounded-full bg-sakura-500 py-3 font-semibold text-white transition hover:bg-sakura-600"
        >
          🧩 {t("lesson.practice")}
        </button>
      </div>
    </div>
  );
}

function Block({ block, lang }: { block: LessonBlock; lang: "pt" | "en" }) {
  if (block.kind === "text") {
    return (
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <RichText body={block.body[lang]} />
      </div>
    );
  }
  if (block.kind === "example") {
    return (
      <div className="rounded-2xl border border-sakura-200 bg-sakura-50 p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <p className="jp flex-1 text-lg font-bold text-stone-800">{block.jp}</p>
          {ttsAvailable() && (
            <button
              onClick={() => speak(block.jp)}
              className="rounded-full bg-white px-2 py-1 text-xs text-violet-700 shadow-sm hover:bg-violet-100"
              title="Ouvir"
            >
              🔊
            </button>
          )}
        </div>
        <p className="mt-1 text-sm italic text-stone-600">"{block.translation[lang]}"</p>
        {block.note && <p className="mt-2 text-xs text-stone-500">💡 {block.note[lang]}</p>}
      </div>
    );
  }
  if (block.kind === "compare") {
    return (
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <ComparePart part={block.a} lang={lang} tone="indigo" />
        <ComparePart part={block.b} lang={lang} tone="sakura" />
        {block.note && (
          <p className="text-center text-xs text-stone-500 sm:col-span-2">💡 {block.note[lang]}</p>
        )}
      </div>
    );
  }
  if (block.kind === "callout") {
    const tone = block.tone ?? "tip";
    const cls =
      tone === "warn" ? "bg-amber-50 border-amber-200 text-amber-900" : "bg-emerald-50 border-emerald-200 text-emerald-900";
    return (
      <div className={`rounded-2xl border p-4 text-sm shadow-sm ${cls}`}>
        <p className="text-lg">{tone === "warn" ? "⚠️" : "💡"}</p>
        <RichText body={block.body[lang]} />
      </div>
    );
  }
  return null;
}

function ComparePart({
  part,
  lang,
  tone,
}: {
  part: { jp: string; label: { pt: string; en: string } };
  lang: "pt" | "en";
  tone: "indigo" | "sakura";
}) {
  const bg = tone === "indigo" ? "bg-indigo-50 border-indigo-200" : "bg-sakura-50 border-sakura-200";
  return (
    <div className={`rounded-2xl border p-4 ${bg}`}>
      <p className="jp text-base font-bold text-stone-800">{part.jp}</p>
      <p className="mt-1 text-xs text-stone-600">{part.label[lang]}</p>
    </div>
  );
}

/** Substitui **negrito** por <strong>. */
function RichText({ body }: { body: string }) {
  const parts = body.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="text-sm text-stone-700">
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-bold text-sakura-700">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </p>
  );
}
