import type { Register } from "../types";

/**
 * O elenco do app: cada personagem "vive" num registro,
 * então conversar com todos = treinar a barra 55/45 inteira.
 * Avatares: SVG original desenhado no Avatar.tsx (estilo kawaii/shoujo).
 */
export interface Character {
  id: string;
  name: string;
  nameJp: string;
  register: Register;
  /** paleta do avatar */
  hair: string;
  hairDark: string;
  skin: string;
  accent: string;
  /** estilo do cabelo desenhado no Avatar.tsx */
  hairstyle: "twintails" | "short" | "neat" | "bun" | "long" | "bob";
  emoji: string;
}

export const CHARACTERS: Character[] = [
  {
    id: "yuki",
    name: "Yuki",
    nameJp: "ゆき",
    register: "casual",
    hair: "#8b5cf6",
    hairDark: "#6d28d9",
    skin: "#ffe4d1",
    accent: "#f472b6",
    hairstyle: "twintails",
    emoji: "⭐",
  },
  {
    id: "haruto",
    name: "Haruto",
    nameJp: "はると",
    register: "casual",
    hair: "#78716c",
    hairDark: "#57534e",
    skin: "#ffe9d6",
    accent: "#60a5fa",
    hairstyle: "short",
    emoji: "☕",
  },
  {
    id: "mei",
    name: "Mei",
    nameJp: "めい",
    register: "casual",
    hair: "#f9a8d4",
    hairDark: "#ec4899",
    skin: "#ffe4d1",
    accent: "#fb7185",
    hairstyle: "bob",
    emoji: "☕",
  },
  {
    id: "kenji",
    name: "Kenji",
    nameJp: "けんじ",
    register: "polite",
    hair: "#1f2937",
    hairDark: "#111827",
    skin: "#ffdfc4",
    accent: "#34d399",
    hairstyle: "neat",
    emoji: "💼",
  },
  {
    id: "hana",
    name: "Hana",
    nameJp: "はな",
    register: "polite",
    hair: "#e5e7eb",
    hairDark: "#9ca3af",
    skin: "#ffe4d1",
    accent: "#fb923c",
    hairstyle: "bun",
    emoji: "🍊",
  },
  {
    id: "aiko",
    name: "Aiko",
    nameJp: "あいこ",
    register: "neutral",
    hair: "#7c2d12",
    hairDark: "#581c0c",
    skin: "#ffe9d6",
    accent: "#facc15",
    hairstyle: "long",
    emoji: "📖",
  },
];

export const charById = (id: string): Character =>
  CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0];

/** ID de paquera escolhido no onboarding. */
export type CrushId = "haruto" | "mei";

/** Resolve o papel dinâmico "crush" para o personagem escolhido pelo usuário. */
export const resolveChar = (id: string, crush: CrushId): Character =>
  charById(id === "crush" ? crush : id);

/** Elenco visível para o usuário: a paquera não escolhida fica fora do jogo. */
export const castFor = (crush: CrushId): Character[] =>
  CHARACTERS.filter((c) => c.id === crush || (c.id !== "haruto" && c.id !== "mei"));
