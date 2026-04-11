import express from "express";
import * as menuController from "../controllers/menuController";

const router = express.Router();

// Create post - validates body only
/**
 * @openapi
 * /restaurants/:id/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menus]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *               - itemDescription
 *               - itemPrice
 *             properties:
 *               itemName:
 *                 type: string
 *                 minLength: 1
 *                 example: Casual Dining
 *               itemDescription:
 *                 type: string
 *                 example: A delicious dish
 *               itemPrice:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 10.99
 *     responses:
 *       '201':
 *         description: event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createMenuItems'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createMenuItems'
 */
router.post("/restaurants/:id/menu", menuController.createMenuItem);

// Get all post - validates params and optional query
/**
 * @openapi
 * /restaurants/:id/menu:
 *   get:
 *     summary: Retrieve all menu items for a specific restaurant
 *     tags: [Menus]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all menu items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/getAllMenuItems'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getAllMenuItems'
 */
router.get("/restaurants/:id/menu", menuController.getAllMenuItems);

// Update post - validates both params and body
/**
 * @openapi
 * /restaurants/:id/menu/:itemId:
 *   put:
 *     summary: Update an existing menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the menu item to update
 *         example: 64b8f0c2e1d2c3a4b5c6d7e8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - itemName
 *               - itemDescription
*                - itemPrice
 *             properties:
 *               itemName:
 *                 type: string
 *                 minLength: 1
 *                 example: Burger
 *               itemDescription:
 *                 type: string
 *                 example: A delicious burger
 *               itemPrice:
 *                 type: number
 *                 minimum: 0.01
 *                 example: 10.99
 *     responses:
 *       '200':
 *         description: menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateMenuItem'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateMenuItem'
 *       '404':
 *         description: Menu item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateMenuItem'
 */
router.put("/restaurants/:id/menu/:itemId", menuController.updateMenuItem);

// Delete post - validates params only
/**
 * @openapi
 * /restaurants/:id/menu/:itemId:
 *   delete:
 *     summary: Delete an existing menu item
 *     tags: [Menus]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully deleted the menu item
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 menus:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/deleteMenuItem'
 *       '404':
 *         description: Menu item not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deleteMenuItem'
 */
router.delete("/restaurants/:id/menu/:itemId", menuController.deleteMenuItem);

export default router;