import { create } from "zustand";
import { getKV, setKV } from "../db/db";
import { deckStats, computeStreak, type DeckStats } from "../srs/engine";
import type { CrushId } from "../content/characters";

export type View =
  | { name: "home" }
  | { name: "curriculum" }
  | { name: "flashcards"; deck: string }
  | { name: "trace" }
  | { name: "dialogues" }
  | { name: "dialogue"; id: string };

/** Como o app se refere ao usuário — também define a dica de pronome (私/僕/あたし). */
export type Gender = "female" | "male" | "neutral";

export interface Profile {
  gender: Gender;
  crush: CrushId;
}

interface AppState {
  view: View;
  stats: DeckStats;
  streak: number;
  startedAt: number | null;
  /** null = onboarding pendente; undefined = ainda carregando do banco */
  profile: Profile | null | undefined;
  /** ids de diálogos já concluídos — para marcar ✓ e destacar os novos */
  completedDialogues: Set<string>;
  go: (view: View) => void;
  refresh: () => Promise<void>;
  init: () => Promise<void>;
  saveProfile: (profile: Profile) => Promise<void>;
  completeDialogue: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  view: { name: "home" },
  stats: { due: 0, fresh: 0, learning: 0, mastered: 0, total: 0 },
  streak: 0,
  startedAt: null,
  profile: undefined,
  completedDialogues: new Set(),
  go: (view) => set({ view }),
  refresh: async () => {
    const [stats, streak] = await Promise.all([deckStats(), computeStreak()]);
    set({ stats, streak });
  },
  init: async () => {
    let started = await getKV("startedAt");
    if (!started) {
      started = String(Date.now());
      await setKV("startedAt", started);
    }
    const [stats, streak, rawProfile, rawDone] = await Promise.all([
      deckStats(),
      computeStreak(),
      getKV("profile"),
      getKV("completedDialogues"),
    ]);
    set({
      startedAt: Number(started),
      stats,
      streak,
      profile: rawProfile ? (JSON.parse(rawProfile) as Profile) : null,
      completedDialogues: new Set(rawDone ? (JSON.parse(rawDone) as string[]) : []),
    });
  },
  saveProfile: async (profile) => {
    await setKV("profile", JSON.stringify(profile));
    set({ profile });
  },
  completeDialogue: async (id) => {
    const next = new Set(get().completedDialogues);
    if (next.has(id)) return;
    next.add(id);
    await setKV("completedDialogues", JSON.stringify([...next]));
    set({ completedDialogues: next });
  },
}));

/** Ritmo sugerido (não trava nada): semana/dia projetados desde o início. */
export function suggestedPace(startedAt: number | null): { week: number; day: number } {
  if (!startedAt) return { week: 1, day: 1 };
  const days = Math.floor((Date.now() - startedAt) / 86_400_000);
  if (days >= 84) return { week: 12, day: 7 }; // fim da trilha: não cicla o dia
  return {
    week: Math.floor(days / 7) + 1,
    day: (days % 7) + 1,
  };
}
