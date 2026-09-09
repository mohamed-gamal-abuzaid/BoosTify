import { pgTable, uuid, text, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
import { ranks } from './rank.model';

export const subRanks = pgTable('sub_ranks', {
  id: uuid('id').defaultRandom().primaryKey(),
  rankId: uuid('rank_id').references(() => ranks.id, { onDelete: 'cascade' }).notNull(),
  name: text('name').notNull(), // مثل: Diamond I, Diamond II, Diamond III
  order: integer('order').notNull(), // ترتيب الفرع داخل الرتبة
  price: numeric('price', { precision: 10, scale: 2 }).notNull(), // سعر الترقية لـ Sub-Rank
  createdAt: timestamp('created_at').defaultNow().notNull(),
});