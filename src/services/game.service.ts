import { db } from '../db/index.js';
import { games, ranks, subRanks, services } from '../db/schema.js';
import { eq, asc } from 'drizzle-orm';
import {
  CreateGameInput,
  CreateRankInput,
  CreateSubRankInput,
  CreateServiceInput,
} from '../schemas/game.schema.js';

// --- Games Services ---
export const getAllGames = async () => {
  return await db.select().from(games).where(eq(games.isActive, true));
};

export const createGame = async (input: CreateGameInput) => {
  const [newGame] = await db.insert(games).values(input).returning();
  return newGame;
};

// --- Ranks & SubRanks Services ---
export const getGameRanksWithSubRanks = async (gameId: string) => {
  const gameRanks = await db
    .select()
    .from(ranks)
    .where(eq(ranks.gameId, gameId))
    .orderBy(asc(ranks.order));

  // جلب الـ Sub-Ranks لكل Rank وترتيبها
  const result = await Promise.all(
    gameRanks.map(async (rank) => {
      const subs = await db
        .select()
        .from(subRanks)
        .where(eq(subRanks.rankId, rank.id))
        .orderBy(asc(subRanks.order));
      return { ...rank, subRanks: subs };
    })
  );

  return result;
};

export const createRank = async (input: CreateRankInput) => {
  const [newRank] = await db.insert(ranks).values(input).returning();
  return newRank;
};

export const createSubRank = async (input: CreateSubRankInput) => {
  const [newSubRank] = await db
    .insert(subRanks)
    .values({
      ...input,
      price: input.price.toString(), // تحويل السعر لـ String للتوافق مع numeric في Postgres
    })
    .returning();
  return newSubRank;
};

// --- Services (Accounts / Offers) Services ---
export const getServicesByGame = async (gameId: string) => {
  return await db.select().from(services).where(eq(services.gameId, gameId));
};

export const createService = async (input: CreateServiceInput) => {
  const [newService] = await db
    .insert(services)
    .values({
      ...input,
      price: input.price.toString(),
    })
    .returning();
  return newService;
};