import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(2, 'Username must be at least 2 characters'),
    email: z.email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    role: z.enum(['ADMIN', 'USER']).optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email('Invalid email format'),
    password: z.string().min(8, 'Password is required'),
  }),
});