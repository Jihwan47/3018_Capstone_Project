import express from "express";
import * as orderController from "../controllers/orderController";
import { orderLimiterPerHour, orderLimiterPerDay } from "../middleware/rateLimit";
import isAuthorized from "../middleware/authorize";
import authenticate from "../middleware/authenticate";

const router = express.Router();

// Create post - validates body only
/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - customerName
 *               - items
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: 64b8f0c2e1d2c3a4b5c6d7e8
 *               restaurantName:
 *                 type: string
 *                 minLength: 1
 *                 example: Casual Dining
 *               customerName:
 *                 type: string
 *                 example: 123 Main St
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                    itemId:
 *                     type: string
 *                     example: 64b8f0c2e1d2c3a4b5c6d7e8
 *                    itemName:
 *                     type: string
 *                     example: Cheeseburger
 *                    price:
 *                     type: number
 *                     minimum: 0
 *                     example: 10.99
 *               totalPrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 21.98
 *               status:
 *                 type: enum
 *                 enum: [Pending, In Progress, Completed, Cancelled]
 *                 default: Pending
 *     responses:
 *       '201':
 *         description: order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/orders'
 *       '400':
 *         description: Invalid input data
 */
router.post("/orders", orderLimiterPerHour, orderLimiterPerDay, authenticate, isAuthorized({ hasRole: ["user"] }), orderController.createOrder);

// Get single post - validates params and optional query
/**
 * @openapi
 * /orders/:id:
 *   get:
 *     summary: Retrieve a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/orders'
 *       '404':
 *         description: order not found
 */
router.get("/orders/:id", authenticate, isAuthorized({ hasRole: ["owner", "user"] }), orderController.getOrderById);

// Update put - validates both params and body
/**
 * @openapi
 * /orders/:id:
 *   put:
 *     summary: Update an existing order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the order to update
 *         example: 64b8f0c2e1d2c3a4b5c6d7e8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - customerName
 *               - status
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 minLength: 1
 *                 example: Casual Dining
 *               customerName:
 *                 type: string
 *                 example: Daniel
 *               status:
 *                 type: enum
 *                 enum: [Pending, In Progress, Completed, Cancelled]
 *                 default: Pending
 *     responses:
 *       '200':
 *         description: order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/orders'
 *       '400':
 *         description: Invalid input data
 *       '404':
 *         description: order not found
 */
router.put("/orders/:id", authenticate, isAuthorized({ hasRole: ["admin", "owner"] }), orderController.updateOrder);

export default router;