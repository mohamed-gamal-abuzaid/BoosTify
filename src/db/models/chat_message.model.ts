import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { chatRooms } from './chat_room.model';
import { users } from './user.model';

export const chatMessages = pgTable('chat_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  roomId: uuid('room_id').references(() => chatRooms.id, { onDelete: 'cascade' }).notNull(),
  senderId: uuid('sender_id').references(() => users.id).notNull(),
  message: text('message'),
  attachmentUrl: text('attachment_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});