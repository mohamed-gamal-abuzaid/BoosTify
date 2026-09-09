import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { orders } from './order.model';
import { users } from './user.model';

export const chatRooms = pgTable('chat_rooms', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id, { onDelete: 'cascade' }).notNull().unique(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});