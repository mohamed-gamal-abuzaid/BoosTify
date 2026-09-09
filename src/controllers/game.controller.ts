import { Request, Response, NextFunction } from 'express';
import * as gameService from '../services/game.service.js';
import {
  createGameSchema,
  createRankSchema,
  createSubRankSchema,
  createServiceSchema,
} from '../schemas/game.schema.js';

// --- Games Controllers ---
export const getGames = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gamesList = await gameService.getAllGames();
    res.json({ success: true, data: gamesList });
  } catch (error) {
    next(error);
  }
};

export const createGame = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createGameSchema.parse(req.body);
    const newGame = await gameService.createGame(validatedData);
    res.status(201).json({ success: true, data: newGame });
  } catch (error) {
    next(error);
  }
};

// --- Ranks & Sub-Ranks Controllers ---
export const getGameRanks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = Array.isArray(req.params.gameId) ? req.params.gameId[0] : req.params.gameId;
    const ranksList = await gameService.getGameRanksWithSubRanks(gameId);
    res.json({ success: true, data: ranksList });
  } catch (error) {
    next(error);
  }
};

export const createRank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createRankSchema.parse(req.body);
    const newRank = await gameService.createRank(validatedData);
    res.status(201).json({ success: true, data: newRank });
  } catch (error) {
    next(error);
  }
};

export const createSubRank = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createSubRankSchema.parse(req.body);
    const newSubRank = await gameService.createSubRank(validatedData);
    res.status(201).json({ success: true, data: newSubRank });
  } catch (error) {
    next(error);
  }
};

// --- Services / Accounts Controllers ---
export const getServices = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const gameId = Array.isArray(req.params.gameId) ? req.params.gameId[0] : req.params.gameId;
    const servicesList = await gameService.getServicesByGame(gameId);
    res.json({ success: true, data: servicesList });
  } catch (error) {
    next(error);
  }
};

export const createService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = createServiceSchema.parse(req.body);
    const newService = await gameService.createService(validatedData);
    res.status(201).json({ success: true, data: newService });
  } catch (error) {
    next(error);
  }
};