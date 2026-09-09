import { Router } from 'express';
import * as orderController from '../controllers/order.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Orders
 *   description: Order creation and pricing engine
 */

/**
 * @openapi
 * /orders/calculate-price:
 *   post:
 *     summary: Calculate boosting price dynamically
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentSubRankId
 *               - desiredSubRankId
 *             properties:
 *               currentSubRankId:
 *                 type: string
 *                 format: uuid
 *               desiredSubRankId:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       200:
 *         description: Price calculated successfully
 */
router.post('/calculate-price', orderController.calculatePrice);

/**
 * @openapi
 * /orders/boosting:
 *   post:
 *     summary: Create a boosting order
 *     tags: [Orders]
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
 *               - currentSubRankId
 *               - desiredSubRankId
 *             properties:
 *               gameId:
 *                 type: string
 *                 format: uuid
 *               currentSubRankId:
 *                 type: string
 *                 format: uuid
 *               desiredSubRankId:
 *                 type: string
 *                 format: uuid
 *               orderDetails:
 *                 type: object
 *     responses:
 *       201:
 *         description: Boosting order created successfully
 */
router.post('/boosting', authenticate, orderController.createBoostingOrder);

/**
 * @openapi
 * /orders/account:
 *   post:
 *     summary: Create an account or direct service order
 *     tags: [Orders]
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
 *               - serviceId
 *             properties:
 *               gameId:
 *                 type: string
 *                 format: uuid
 *               serviceId:
 *                 type: string
 *                 format: uuid
 *               orderDetails:
 *                 type: object
 *     responses:
 *       201:
 *         description: Account order created successfully
 */
router.post('/account', authenticate, orderController.createAccountOrder);

/**
 * @openapi
 * /orders/my-orders:
 *   get:
 *     summary: Get all orders for the authenticated user
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User orders retrieved successfully
 */
router.get('/my-orders', authenticate, orderController.getMyOrders);

export default router;