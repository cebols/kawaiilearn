import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "./store/useAppStore";
import Dashboard from "./components/Dashboard";
import CurriculumMap from "./components/CurriculumMap";
import Flashcards from "./components/Flashcards";
import TraceCanvas from "./components/TraceCanvas";
import DialogueList from "./components/DialogueList";
import ChatDialogue from "./components/ChatDialogue";

export default function App() {
  const { t, i18n } = useTranslation();
  const { view, go, init } = useAppStore();

  useEffect(() => {
    void init();
  }, [init]);

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith("pt") ? "en-US" : "pt-BR");

  return (
    <div className="min-h-dvh pb-24">
      <header className="sticky top-0 z-10 border-b border-sakura-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <button onClick={() => go({ name: "home" })} className="text-left">
            <h1 className="text-lg font-extrabold text-sakura-600">
              🌸 KawaiiLearn <span className="jp text-sm font-normal text-stone-400">日本語</span>
            </h1>
            <p className="hidden text-[10px] text-stone-400 sm:block">{t("app.tagline")}</p>
          </button>
          <button
            onClick={toggleLang}
            className="rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-600 transition hover:bg-stone-200"
          >
            🌐 {t("lang.switch")}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-6">
        {view.name === "home" && <Dashboard />}
        {view.name === "curriculum" && <CurriculumMap />}
        {view.name === "flashcards" && <Flashcards deck={view.deck} key={view.deck} />}
        {view.name === "trace" && <TraceCanvas />}
        {view.name === "dialogues" && <DialogueList />}
        {view.name === "dialogue" && <ChatDialogue id={view.id} key={view.id} />}
      </main>

      {/* navegação inferior (mobile-first, estilo app) */}
      <nav className="fixed inset-x-0 bottom-0 border-t border-sakura-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl justify-around py-2">
          <NavBtn active={view.name === "home"} icon="🏠" label={t("nav.home")} onClick={() => go({ name: "home" })} />
          <NavBtn active={view.name === "curriculum"} icon="🗺️" label={t("nav.curriculum")} onClick={() => go({ name: "curriculum" })} />
          <NavBtn active={view.name === "flashcards"} icon="🎴" label={t("nav.flashcards")} onClick={() => go({ name: "flashcards", deck: "hiragana" })} />
          <NavBtn active={view.name === "trace"} icon="✍️" label={t("nav.trace")} onClick={() => go({ name: "trace" })} />
          <NavBtn active={view.name === "dialogues" || view.name === "dialogue"} icon="💬" label={t("nav.dialogues")} onClick={() => go({ name: "dialogues" })} />
        </div>
      </nav>
    </div>
  );
}

function NavBtn({ active, icon, label, onClick }: { active: boolean; icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1 text-[10px] font-semibold transition ${
        active ? "text-sakura-600" : "text-stone-400 hover:text-stone-600"
      }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
