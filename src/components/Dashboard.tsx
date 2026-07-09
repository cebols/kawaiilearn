import { useTranslation } from "react-i18next";
import type { TFunction } from "i18next";
import { useAppStore } from "../store/useAppStore";

// t: aceitamos qualquer chave (string) com valores opcionais — evita conflito de tipos genéricos
type TFn = TFunction;
import { VOCAB_W1, registerStats } from "../content/vocab";
import { castFor } from "../content/characters";
import { DIALOGUES } from "../content/dialogues";
import { WEEKS, PHASES } from "../content/curriculum";
import { goalForWeek, dailyPercent, type DailyProgress } from "../lib/daily";
import { testAvailable } from "../content/weekTests";
import { lessonsForWeek } from "../content/lessons";
import { deckForWeek, kanaDeck } from "../content/decks";
import Avatar from "./Avatar";
import NotificationsCard from "./NotificationsCard";
import type { View } from "../store/useAppStore";

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const { stats, streak, go, profile, daily, completedDialogues, currentWeek } = useAppStore();
  const lang = i18n.language.startsWith("pt") ? "pt" : "en";
  const cast = castFor(profile?.crush ?? "haruto");
  const goal = goalForWeek(currentWeek);
  const pct = dailyPercent(daily, goal);
  const week = WEEKS.find((w) => w.num === currentWeek);
  const lessons = lessonsForWeek(currentWeek);
  const deckId = deckForWeek(currentWeek);
  const deckTitle = kanaDeck(deckId).title[lang];
  const readyForTest = pct >= 100 && testAvailable(currentWeek) && currentWeek < 20;

  const reg = computeRegister(completedDialogues);

  return (
    <div className="mx-auto max-w-3xl space-y-5 pop-in">
      {/* ── faixa: streak + medidor de registro compactos ── */}
      <TopStrip streak={streak} due={stats.due} reg={reg.reg} regFromPractice={reg.fromPractice} t={t} />

      {/* ── trilha das 20 semanas ── */}
      <WeekTrack currentWeek={currentWeek} onPick={() => go({ name: "curriculum" })} weekTitle={week?.title[lang]} lang={lang} t={t} />

      {/* ── HERO CTA contextual ── */}
      <HeroCTA
        readyForTest={readyForTest}
        lessons={lessons}
        goal={goal}
        daily={daily}
        currentWeek={currentWeek}
        deckId={deckId}
        deckTitle={deckTitle}
        go={go}
        lang={lang}
        t={t}
      />

      {/* ── meta do dia + ações rápidas ── */}
      <DailySection
        pct={pct}
        goal={goal}
        daily={daily}
        currentWeek={currentWeek}
        deckId={deckId}
        deckTitle={deckTitle}
        go={go}
        t={t}
      />

      {/* ── social: elenco compacto + link notif ── */}
      <SocialBlock cast={cast} go={go} t={t} />

      {/* ── notificações (colapsado se ainda não ativou) ── */}
      <NotificationsCard />
    </div>
  );
}

// ═══════════════ TOP STRIP ═══════════════
function TopStrip({
  streak,
  due,
  reg,
  regFromPractice,
  t,
}: {
  streak: number;
  due: number;
  reg: { polite: number; casual: number };
  regFromPractice: boolean;
  t: TFn;
}) {
  return (
    <div className="rounded-2xl border border-sakura-100 bg-white/70 p-3 shadow-sm backdrop-blur">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-lg">🔥</span>
          <span className="text-lg font-extrabold tabular-nums text-amber-500">{streak}</span>
          <span className="text-[10px] text-stone-500">{t("home.streak")}</span>
        </div>
        <div className="hidden items-center gap-1.5 sm:flex">
          <span className="text-lg">🎴</span>
          <span className="text-lg font-extrabold tabular-nums text-sakura-600">{due}</span>
          <span className="text-[10px] text-stone-500">{t("home.dueCards")}</span>
        </div>
        <div className="ml-auto min-w-0 flex-1 sm:max-w-[210px]">
          <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-stone-500">
            <span>🎩 {reg.polite}%</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[8px] font-semibold ${
                regFromPractice ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-500"
              }`}
            >
              {regFromPractice ? t("home.regTagPractice") : t("home.regTagSample")}
            </span>
            <span>{reg.casual}% 🎉</span>
          </div>
          <div className="mt-1 flex h-2 overflow-hidden rounded-full">
            <div className="bg-indigo-400" style={{ width: `${reg.polite}%` }} />
            <div className="bg-sakura-400" style={{ width: `${reg.casual}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════ WEEK TRACK — a trilha de 20 pontos ═══════════════
function WeekTrack({
  currentWeek,
  onPick,
  weekTitle,
  lang,
  t,
}: {
  currentWeek: number;
  onPick: () => void;
  weekTitle?: string;
  lang: "pt" | "en";
  t: TFn;
}) {
  return (
    <button onClick={() => onPick()} className="block w-full text-left">
      <div className="rounded-2xl border border-sakura-100 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="flex items-baseline justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-sakura-600">
              {t("home.trailEyebrow", { week: currentWeek })}
            </p>
            <p className="mt-0.5 truncate text-base font-bold text-stone-800">{weekTitle ?? ""}</p>
          </div>
          <span className="shrink-0 rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-bold text-stone-600 tabular-nums">
            {currentWeek}/20
          </span>
        </div>

        {/* 20 pontinhos coloridos por fase */}
        <div className="mt-3 flex items-center gap-[3px]">
          {WEEKS.map((w) => {
            const isPast = w.num < currentWeek;
            const isCurrent = w.num === currentWeek;
            const color = PHASES[w.phase].color;
            return (
              <div
                key={w.num}
                className={`h-2 flex-1 rounded-full transition ${
                  isCurrent ? "h-3 ring-2 ring-sakura-400 ring-offset-1" : ""
                }`}
                style={{
                  background: isPast || isCurrent ? color : "#e7e5e4",
                  opacity: isPast ? 0.7 : 1,
                }}
                title={`${t("curriculum.week")} ${w.num} — ${w.title[lang]}`}
              />
            );
          })}
        </div>

        {/* legenda das fases */}
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[9px] text-stone-500">
          {Object.entries(PHASES).map(([n, p]) => (
            <span key={n} className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
              {p[lang]}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

// ═══════════════ HERO CTA — 1 grande ação contextual ═══════════════
type CTAKind = "test" | "lesson" | "cards" | "chat" | "sentences" | "done";
interface CTAConfig {
  kind: CTAKind;
  icon: string;
  title: string;
  sub: string;
  cta: string;
  view: View;
  gradient: string;
}

function HeroCTA({
  readyForTest,
  lessons,
  goal,
  daily,
  currentWeek,
  deckId,
  deckTitle,
  go,
  lang,
  t,
}: {
  readyForTest: boolean;
  lessons: ReturnType<typeof lessonsForWeek>;
  goal: ReturnType<typeof goalForWeek>;
  daily: DailyProgress;
  currentWeek: number;
  deckId: string;
  deckTitle: string;
  go: (v: View) => void;
  lang: "pt" | "en";
  t: TFn;
}) {
  // Prioridade da CTA: teste > lição pendente > cards abaixo da meta > frases abaixo > conversa > done
  const cfg: CTAConfig = readyForTest
    ? {
        kind: "test",
        icon: "🏯",
        title: t("home.ctaTest.title", { week: currentWeek }),
        sub: t("home.ctaTest.sub"),
        cta: t("home.ctaTest.button"),
        view: { name: "weekTest", week: currentWeek },
        gradient: "from-amber-100 via-sakura-100 to-violet-100",
      }
    : lessons.length > 0
      ? {
          kind: "lesson",
          icon: lessons[0].emoji,
          title: t("home.ctaLesson.title"),
          sub: lessons[0].title[lang],
          cta: t("home.ctaLesson.button"),
          view: { name: "lesson", id: lessons[0].id },
          gradient: "from-amber-50 to-sakura-100",
        }
      : goal.cards > 0 && daily.cards < goal.cards
        ? {
            kind: "cards",
            icon: "🎴",
            title: t("home.ctaCards.title"),
            sub: t("home.ctaCards.sub", { deck: deckTitle, done: daily.cards, total: goal.cards }),
            cta: t("home.ctaCards.button"),
            view: { name: "flashcards", deck: deckId },
            gradient: "from-sakura-100 to-violet-100",
          }
        : goal.sentences > 0 && daily.sentences < goal.sentences
          ? {
              kind: "sentences",
              icon: "🧩",
              title: t("home.ctaSentences.title"),
              sub: t("home.ctaSentences.sub", { done: daily.sentences, total: goal.sentences }),
              cta: t("home.ctaSentences.button"),
              view: { name: "sentences", week: currentWeek },
              gradient: "from-violet-100 to-sakura-100",
            }
          : goal.convos > 0 && daily.convos < goal.convos
            ? {
                kind: "chat",
                icon: "💬",
                title: t("home.ctaChat.title"),
                sub: t("home.ctaChat.sub"),
                cta: t("home.ctaChat.button"),
                view: { name: "dialogues" },
                gradient: "from-emerald-100 to-sakura-100",
              }
            : {
                kind: "done",
                icon: "🌸",
                title: t("home.ctaDone.title"),
                sub: t("home.ctaDone.sub"),
                cta: t("home.ctaDone.button"),
                view: { name: "dialogues" },
                gradient: "from-emerald-100 via-sakura-100 to-amber-100",
              };

  const isDark = cfg.kind === "test";
  return (
    <button
      onClick={() => go(cfg.view)}
      className={`group block w-full rounded-3xl bg-gradient-to-br ${cfg.gradient} p-5 text-left shadow-sm transition hover:shadow-lg`}
    >
      <div className="flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/80 text-3xl shadow-sm">
          {cfg.icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-600">{t("home.nextStep")}</p>
          <h2 className="mt-0.5 text-lg font-extrabold leading-tight text-stone-800">{cfg.title}</h2>
          <p className="mt-1 text-sm text-stone-600">{cfg.sub}</p>
        </div>
      </div>
      <div className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-2.5 font-semibold shadow transition group-hover:translate-y-0"
        style={isDark ? { background: "#1c1917", color: "#fff" } : { background: "#ec4899", color: "#fff" }}
      >
        {cfg.cta} →
      </div>
    </button>
  );
}

// ═══════════════ DAILY SECTION — meta + atalhos ═══════════════
function DailySection({
  pct,
  goal,
  daily,
  currentWeek,
  deckId,
  deckTitle,
  go,
  t,
}: {
  pct: number;
  goal: ReturnType<typeof goalForWeek>;
  daily: DailyProgress;
  currentWeek: number;
  deckId: string;
  deckTitle: string;
  go: (v: View) => void;
  t: TFn;
}) {
  return (
    <div className="rounded-3xl border border-sakura-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-4">
        <ProgressRing pct={pct} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{t("home.today")}</p>
          <p className="mt-0.5 text-lg font-bold text-stone-800">
            {pct >= 100 ? t("home.goalDoneShort") : t("home.goalWorkingShort", { pct })}
          </p>
          <p className="text-xs text-stone-500">{t("home.goalHintShort")}</p>
        </div>
      </div>

      {/* chips das trilhas */}
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {goal.cards > 0 && (
          <TrackChip
            icon="🎴"
            label={t("home.goalCards")}
            detail={deckTitle}
            done={daily.cards}
            goal={goal.cards}
            onClick={() => go({ name: "flashcards", deck: deckId })}
          />
        )}
        {goal.sentences > 0 && (
          <TrackChip
            icon="🧩"
            label={t("home.goalSentences")}
            done={daily.sentences}
            goal={goal.sentences}
            onClick={() => go({ name: "sentences", week: currentWeek })}
          />
        )}
        {goal.convos > 0 && (
          <TrackChip
            icon="💬"
            label={t("home.goalConvos")}
            done={daily.convos}
            goal={goal.convos}
            onClick={() => go({ name: "dialogues" })}
          />
        )}
        {goal.speak > 0 && (
          <TrackChip
            icon="🎤"
            label={t("home.goalSpeak")}
            done={daily.speak}
            goal={goal.speak}
            onClick={() => go({ name: "shadow", week: currentWeek })}
          />
        )}
      </div>

      {/* atalhos secundários */}
      <div className="mt-4 border-t border-stone-100 pt-3">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">{t("home.quickActions")}</p>
        <div className="flex flex-wrap gap-2">
          <SecondaryLink icon="🎤" label={t("home.speakAction")} onClick={() => go({ name: "shadow", week: currentWeek })} />
          <SecondaryLink icon="🔢" label={t("home.numbersAction")} onClick={() => go({ name: "numbers" })} />
          <SecondaryLink icon="✍️" label={t("home.traceAction")} onClick={() => go({ name: "trace" })} />
          <SecondaryLink icon="🗺️" label={t("nav.curriculum")} onClick={() => go({ name: "curriculum" })} />
        </div>
      </div>
    </div>
  );
}

function TrackChip({
  icon,
  label,
  detail,
  done,
  goal,
  onClick,
}: {
  icon: string;
  label: string;
  detail?: string;
  done: number;
  goal: number;
  onClick: () => void;
}) {
  const complete = done >= goal;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-2xl border p-2.5 text-left transition ${
        complete
          ? "border-emerald-200 bg-emerald-50/60 hover:bg-emerald-50"
          : "border-stone-100 bg-stone-50/50 hover:border-sakura-200 hover:bg-sakura-50"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-bold text-stone-700">{label}</p>
        {detail && <p className="truncate text-[10px] text-stone-500">{detail}</p>}
      </div>
      <span
        className={`text-xs font-extrabold tabular-nums ${
          complete ? "text-emerald-600" : "text-stone-400"
        }`}
      >
        {Math.min(done, goal)}/{goal}
      </span>
    </button>
  );
}

function SecondaryLink({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1.5 text-xs font-semibold text-stone-700 transition hover:bg-sakura-100"
    >
      <span>{icon}</span> {label}
    </button>
  );
}

// ═══════════════ PROGRESS RING — anel circular pra meta do dia ═══════════════
function ProgressRing({ pct }: { pct: number }) {
  const size = 68;
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const dash = (Math.min(100, pct) / 100) * circ;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#f5f5f4" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#ringGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          fill="none"
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className="text-sm font-extrabold tabular-nums text-stone-800">{pct}%</span>
      </div>
    </div>
  );
}

// ═══════════════ SOCIAL BLOCK — elenco + link pras conversas ═══════════════
function SocialBlock({
  cast,
  go,
  t,
}: {
  cast: ReturnType<typeof castFor>;
  go: (v: View) => void;
  t: TFn;
}) {
  return (
    <div className="rounded-3xl border border-sakura-100 bg-white p-5 shadow-sm">
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{t("home.friendsEyebrow")}</p>
          <h3 className="mt-0.5 text-base font-bold text-stone-800">{t("dialogue.friendsTitle")}</h3>
        </div>
        <button
          onClick={() => go({ name: "dialogues" })}
          className="text-xs font-semibold text-sakura-600 hover:text-sakura-700"
        >
          {t("home.seeAll")} →
        </button>
      </div>
      <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
        {cast.map((c) => (
          <button
            key={c.id}
            onClick={() => go({ name: "dialogues" })}
            className="flex shrink-0 flex-col items-center gap-1"
            title={c.name}
          >
            <Avatar c={c} size={54} />
            <span className="text-[10px] font-semibold text-stone-700">{c.name}</span>
            <span className="text-[9px]" style={{ color: c.accent }}>
              {c.register === "polite" ? "🎩" : c.register === "casual" ? "🎉" : "〜"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════ helpers ═══════════════
function computeRegister(completed: Set<string>) {
  const practiced = DIALOGUES.filter((d) => completed.has(d.id));
  if (practiced.length === 0) return { reg: registerStats(VOCAB_W1), fromPractice: false };
  let pol = 0;
  let cas = 0;
  for (const d of practiced) {
    if (d.register === "polite") pol++;
    else if (d.register === "casual") cas++;
    else {
      pol += 0.5;
      cas += 0.5;
    }
  }
  return {
    reg: { polite: Math.round((pol / (pol + cas)) * 100), casual: Math.round((cas / (pol + cas)) * 100) },
    fromPractice: true,
  };
}
