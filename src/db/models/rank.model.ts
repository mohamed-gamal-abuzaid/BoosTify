import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { games } from './game.model';

export const ranks = pgTable('ranks', {
  id: uuid('id').defaultRandom().primaryKey(),
  gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // مثل: Silver, Gold, Platinum, Diamond
  order: integer('order').notNull(), // ترتيب الرتبة (مثلاً: 1 للـ Bronze، 2 للـ Silver)
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});