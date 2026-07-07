import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "./store/useAppStore";
import { catchUpAndArm } from "./lib/notifications";
import Dashboard from "./components/Dashboard";
import CurriculumMap from "./components/CurriculumMap";
import Flashcards from "./components/Flashcards";
import TraceCanvas from "./components/TraceCanvas";
import DialogueList from "./components/DialogueList";
import ChatDialogue from "./components/ChatDialogue";
import SentenceBuild from "./components/SentenceBuild";
import WeekTest from "./components/WeekTest";
import Onboarding from "./components/Onboarding";

export default function App() {
  const { t, i18n } = useTranslation();
  const { view, go, init, profile } = useAppStore();

  useEffect(() => {
    void init();
    // deep link: /?dialogue=<id> abre a conversa direto (clique numa notificação)
    const url = new URL(window.location.href);
    const dlg = url.searchParams.get("dialogue");
    if (dlg) {
      go({ name: "dialogue", id: dlg });
      url.searchParams.delete("dialogue");
      window.history.replaceState({}, "", url.toString());
    }
    // dispara nudges atrasados e agenda o próximo
    void catchUpAndArm();
  }, [init, go]);

  const toggleLang = () => i18n.changeLanguage(i18n.language.startsWith("pt") ? "en-US" : "pt-BR");

  return (
    <div className="min-h-dvh pb-24">
      {profile === null && <Onboarding />}
      <header className="sticky top-0 z-10 border-b border-sakura-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <button onClick={() => go({ name: "home" })} className="text-left">
            <h1 className="whitespace-nowrap text-lg font-extrabold text-sakura-600">
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
        {view.name === "sentences" && <SentenceBuild week={view.week} key={view.week} />}
        {view.name === "weekTest" && <WeekTest week={view.week} key={`test-${view.week}`} />}
        {view.name === "dialogues" && <DialogueList />}
        {view.name === "dialogue" && <ChatDialogue id={view.id} key={view.id} />}
      </main>

      {/* navegação inferior (mobile-first, estilo app) */}
      <nav className="fixed inset-x-0 bottom-0 border-t border-sakura-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl justify-around py-2">
          <NavBtn active={view.name === "home"} icon="🏠" label={t("nav.home")} onClick={() => go({ name: "home" })} />
          <NavBtn active={view.name === "curriculum"} icon="🗺️" label={t("nav.curriculum")} onClick={() => go({ name: "curriculum" })} />
          <NavBtn active={view.name === "flashcards"} icon="🎴" label={t("nav.flashcards")} onClick={() => go({ name: "flashcards", deck: "hiragana" })} />
          {/* comunicação em primeiro plano: conversas antes da escrita manual */}
          <NavBtn active={view.name === "dialogues" || view.name === "dialogue"} icon="💬" label={t("nav.dialogues")} onClick={() => go({ name: "dialogues" })} />
          <NavBtn active={view.name === "trace"} icon="✍️" label={t("nav.trace")} onClick={() => go({ name: "trace" })} />
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
