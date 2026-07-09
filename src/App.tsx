import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppStore } from "./store/useAppStore";
import { catchUpAndArm } from "./lib/notifications";
import { deckForWeek } from "./content/decks";
import Dashboard from "./components/Dashboard";
import CurriculumMap from "./components/CurriculumMap";
import Flashcards from "./components/Flashcards";
import TraceCanvas from "./components/TraceCanvas";
import DialogueList from "./components/DialogueList";
import ChatDialogue from "./components/ChatDialogue";
import SentenceBuild from "./components/SentenceBuild";
import WeekTest from "./components/WeekTest";
import LessonView from "./components/LessonView";
import SpeechShadow from "./components/SpeechShadow";
import ScenarioPlay from "./components/ScenarioPlay";
import NumberDrill from "./components/NumberDrill";
import Onboarding from "./components/Onboarding";

export default function App() {
  const { t, i18n } = useTranslation();
  const { view, go, init, profile, currentWeek } = useAppStore();

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
    <div className="min-h-dvh bg-gradient-to-b from-sakura-50/40 via-sakura-50/20 to-white pb-24">
      {profile === null && <Onboarding />}
      <header className="sticky top-0 z-10 border-b border-sakura-100/70 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5">
          <button onClick={() => go({ name: "home" })} className="flex items-center gap-2 text-left">
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-sakura-100 text-lg">🌸</span>
            <div className="leading-tight">
              <h1 className="whitespace-nowrap text-[15px] font-extrabold tracking-tight text-sakura-600">
                KawaiiLearn <span className="jp text-[11px] font-normal text-stone-400">日本語</span>
              </h1>
              <p className="hidden text-[9px] font-medium text-stone-400 sm:block">{t("app.tagline")}</p>
            </div>
          </button>
          <button
            onClick={toggleLang}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-stone-600 shadow-sm transition hover:border-sakura-200 hover:bg-sakura-50"
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
        {view.name === "lesson" && <LessonView id={view.id} key={view.id} />}
        {view.name === "shadow" && <SpeechShadow week={view.week} key={`shadow-${view.week}`} />}
        {view.name === "scenario" && <ScenarioPlay id={view.id} key={view.id} />}
        {view.name === "numbers" && <NumberDrill />}
        {view.name === "dialogues" && <DialogueList />}
        {view.name === "dialogue" && <ChatDialogue id={view.id} key={view.id} />}
      </main>

      {/* navegação inferior (mobile-first, estilo app) */}
      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-sakura-100/70 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl justify-around px-1 py-1.5" style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}>
          <NavBtn active={view.name === "home"} icon="🏠" label={t("nav.home")} onClick={() => go({ name: "home" })} />
          <NavBtn active={view.name === "curriculum"} icon="🗺️" label={t("nav.curriculum")} onClick={() => go({ name: "curriculum" })} />
          <NavBtn active={view.name === "flashcards"} icon="🎴" label={t("nav.flashcards")} onClick={() => go({ name: "flashcards", deck: deckForWeek(currentWeek) })} />
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
      className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-semibold transition ${
        active ? "text-sakura-600" : "text-stone-400 hover:text-stone-600"
      }`}
    >
      {active && (
        <span className="absolute -top-1.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-b-full bg-sakura-500" aria-hidden />
      )}
      <span className={`text-xl transition ${active ? "scale-110" : ""}`}>{icon}</span>
      <span className="text-[9px] font-bold uppercase tracking-wider">{label}</span>
    </button>
  );
}
