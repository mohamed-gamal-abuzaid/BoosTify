import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError, ZodRawShape } from 'zod';

export const validate = (schema: ZodObject<ZodRawShape>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: error.issues.map((err) => ({
            field: err.path.slice(1).join('.'),
            message: err.message,
          })),
        });
      }
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
};