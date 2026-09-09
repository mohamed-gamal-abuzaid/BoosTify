import { pgTable, uuid, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const games = pgTable('games', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  imageUrl: text('image_url'),
  hasRankBoosting: boolean('has_rank_boosting').default(true).notNull(), 
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});