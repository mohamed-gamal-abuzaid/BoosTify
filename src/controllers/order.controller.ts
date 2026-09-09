import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service.js';
import {
  createBoostingOrderSchema,
  createAccountOrderSchema,
} from '../schemas/order.schema.js';


export const calculatePrice = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { currentSubRankId, desiredSubRankId } = req.body;
    const price = await orderService.calculateBoostingPrice(currentSubRankId, desiredSubRankId);
    res.json({ success: true, data: { price } });
  } catch (error) {
    next(error);
  }
};


export const createBoostingOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createBoostingOrderSchema.parse(req.body);
    const userId = req.user!.userId;
    const order = await orderService.createBoostingOrder(userId, validatedData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};


export const createAccountOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createAccountOrderSchema.parse(req.body);
    const userId = req.user!.userId;
    const order = await orderService.createAccountOrder(userId, validatedData);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};


export const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user!.userId;
    const ordersList = await orderService.getUserOrders(userId);
    res.json({ success: true, data: ordersList });
  } catch (error) {
    next(error);
  }
};