import Dexie, { type EntityTable } from "dexie";
import type { Card } from "ts-fsrs";
import type { Skill } from "../types";

/** Um card SRS persistido: item de conteúdo × habilidade. */
export interface StoredCard {
  id: string; // `${deck}:${itemId}:${skill}`
  deck: string;
  itemId: string;
  skill: Skill;
  fsrs: Card;
  addedAt: number;
}

export interface ReviewLog {
  id?: number;
  cardId: string;
  rating: number;
  reviewedAt: number;
}

export interface KV {
  key: string;
  value: string;
}

const db = new Dexie("kawaiilearn") as Dexie & {
  cards: EntityTable<StoredCard, "id">;
  reviews: EntityTable<ReviewLog, "id">;
  kv: EntityTable<KV, "key">;
};

db.version(1).stores({
  cards: "id, deck, skill",
  reviews: "++id, cardId, reviewedAt",
  kv: "key",
});

export async function getKV(key: string): Promise<string | null> {
  return (await db.kv.get(key))?.value ?? null;
}

export async function setKV(key: string, value: string): Promise<void> {
  await db.kv.put({ key, value });
}

export default db;
