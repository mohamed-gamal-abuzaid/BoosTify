import { pgTable, uuid, text, numeric, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { users } from './user.model';
import { games } from './game.model';
import { services } from './service.model';
import { orderStatusEnum, serviceTypeEnum } from './enums';

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  gameId: uuid('game_id').references(() => games.id).notNull(),
  serviceId: uuid('service_id').references(() => services.id),
  type: serviceTypeEnum('type').notNull(),
  status: orderStatusEnum('status').default('PENDING').notNull(),
  totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
  paypalOrderId: text('paypal_order_id'),
  orderDetails: jsonb('order_details'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});