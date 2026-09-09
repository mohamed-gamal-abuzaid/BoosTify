import { Router } from 'express';
import * as gameController from '../controllers/game.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Games & Ranks
 *   description: Management for Games, Ranks, Sub-Ranks, and Services
 */

/**
 * @openapi
 * /games:
 *   get:
 *     summary: Get all active games
 *     tags: [Games & Ranks]
 *     responses:
 *       200:
 *         description: List of active games retrieved successfully
 */
router.get('/', gameController.getGames);

/**
 * @openapi
 * /games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games & Ranks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - slug
 *             properties:
 *               title:
 *                 type: string
 *                 example: Valorant
 *               slug:
 *                 type: string
 *                 example: valorant
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/valorant.png
 *     responses:
 *       201:
 *         description: Game created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 */
router.post('/', authenticate, requireAdmin, gameController.createGame);

/**
 * @openapi
 * /games/{gameId}/ranks:
 *   get:
 *     summary: Get ranks and sub-ranks for a specific game
 *     tags: [Games & Ranks]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Game UUID
 *     responses:
 *       200:
 *         description: Ranks and sub-ranks retrieved successfully
 */
router.get('/:gameId/ranks', gameController.getGameRanks);

/**
 * @openapi
 * /games/ranks:
 *   post:
 *     summary: Create a main rank for a game
 *     tags: [Games & Ranks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameId
 *               - name
 *               - order
 *             properties:
 *               gameId:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *                 example: Gold
 *               order:
 *                 type: integer
 *                 example: 3
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/gold.png
 *     responses:
 *       201:
 *         description: Rank created successfully
 *       403:
 *         description: Admin access required
 */
router.post('/ranks', authenticate, requireAdmin, gameController.createRank);

/**
 * @openapi
 * /games/sub-ranks:
 *   post:
 *     summary: Create a sub-rank under a main rank
 *     tags: [Games & Ranks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rankId
 *               - name
 *               - order
 *               - price
 *             properties:
 *               rankId:
 *                 type: string
 *                 format: uuid
 *               name:
 *                 type: string
 *                 example: Gold I
 *               order:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: number
 *                 example: 12.50
 *     responses:
 *       201:
 *         description: Sub-rank created successfully
 *       403:
 *         description: Admin access required
 */
router.post('/sub-ranks', authenticate, requireAdmin, gameController.createSubRank);

/**
 * @openapi
 * /games/{gameId}/services:
 *   get:
 *     summary: Get account/boosting services for a game
 *     tags: [Games & Ranks]
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Services retrieved successfully
 */
router.get('/:gameId/services', gameController.getServices);

/**
 * @openapi
 * /games/services:
 *   post:
 *     summary: Create a service or account offer
 *     tags: [Games & Ranks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gameId
 *               - type
 *               - title
 *               - price
 *             properties:
 *               gameId:
 *                 type: string
 *                 format: uuid
 *               type:
 *                 type: string
 *                 enum: [BOOSTING, ACCOUNT]
 *               title:
 *                 type: string
 *                 example: Radiant Account - 50 Skins
 *               price:
 *                 type: number
 *                 example: 150.00
 *               details:
 *                 type: object
 *     responses:
 *       201:
 *         description: Service created successfully
 *       403:
 *         description: Admin access required
 */
router.post('/services', authenticate, requireAdmin, gameController.createService);

export default router;