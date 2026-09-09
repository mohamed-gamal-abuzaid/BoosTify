import { z } from 'zod';

export const createGameSchema = z.object({
  title: z.string().min(2, 'game title required and should be at least 2 characters long'),
  slug: z.string().min(2, 'the slug is required and important for the URL'),
  imageUrl: z.url('invalid image URL').optional(),
});

export const createRankSchema = z.object({
  gameId: z.uuid('invalid game ID'),
  name: z.string().min(1, 'rank name is required (e.g., Gold)'),
  order: z.number().int().positive('order must be a positive integer'),
  imageUrl: z.url('invalid image URL').optional(),
});

export const createSubRankSchema = z.object({
  rankId: z.uuid('invalid rank ID'),
  name: z.string().min(1, 'sub-rank name is required (e.g., Gold I)'),
  order: z.number().int().positive('order must be a positive integer'),
  price: z.number().positive('price must be a positive number'),
});

export const createServiceSchema = z.object({
  gameId: z.uuid('invalid game ID'),
  type: z.enum(['BOOSTING', 'ACCOUNT']),
  title: z.string().min(3, 'service title is required'),
  price: z.number().positive('price must be a positive number'),
  details: z.record(z.any(), z.any()).optional(),
});

export type CreateGameInput = z.infer<typeof createGameSchema>;
export type CreateRankInput = z.infer<typeof createRankSchema>;
export type CreateSubRankInput = z.infer<typeof createSubRankSchema>;
export type CreateServiceInput = z.infer<typeof createServiceSchema>;