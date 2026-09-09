import { z } from 'zod';

export const createBoostingOrderSchema = z.object({
  gameId: z.uuid('invalid game ID'),
  currentSubRankId: z.uuid('invalid current sub-rank ID'),
  desiredSubRankId: z.uuid('invalid desired sub-rank ID'),
  orderDetails: z.record(z.string(), z.any()).optional(),
});

export const createAccountOrderSchema = z.object({
  gameId: z.uuid('invalid game ID'),
  serviceId: z.uuid('invalid service ID'),
  orderDetails: z.record(z.string(), z.any()).optional(),
});

export type CreateBoostingOrderInput = z.infer<typeof createBoostingOrderSchema>;
export type CreateAccountOrderInput = z.infer<typeof createAccountOrderSchema>;