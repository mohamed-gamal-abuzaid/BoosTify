import { pgTable, uuid, text, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { games } from './game.model';
import { serviceTypeEnum } from './enums';

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  gameId: uuid('game_id').references(() => games.id, { onDelete: 'cascade' }).notNull(),
  type: serviceTypeEnum('type').notNull(),
  title: text('title').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  details: jsonb('details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});