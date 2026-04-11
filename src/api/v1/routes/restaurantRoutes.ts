
import express from "express";
import * as restaurantController from "../controllers/restaurantController";

const router = express.Router();

// Create post - validates body only
/**
 * @openapi
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - restaurantAddress
 *               - restaurantPhone
 *               - restaurantEmail
 *               - restaurantCategory
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 minLength: 1
 *                 example: Casual Dining
 *               restaurantAddress:
 *                 type: string
 *                 example: 123 Main St
 *               restaurantPhone:
 *                 type: string
 *                 example: (123) 456-7890
 *               restaurantEmail:
 *                 type: string
 *                 format: email
 *                 example: info@rrc.com
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 default: 0
 *                 example: 0
 *               reviewCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 example: 50
 *               restaurantCategory:
 *                 type: string
 *                 enum: [Fast Food, Casual Dining, Fine Dining]
 *                 default: Casual Dining
 *                 example: Casual Dining
 *     responses:
 *       '201':
 *         description: event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createRestaurant'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/createRestaurant'
 */
router.post("/restaurants", restaurantController.createRestaurant);

// Get all post - validates params and optional query
/**
 * @openapi
 * /restaurants:
 *   get:
 *     summary: Retrieve all restaurants
 *     tags: [Restaurants]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all restaurants
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/getAllRestaurants'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getAllRestaurants'
 */
router.get("/restaurants",restaurantController.getAllRestaurants);

// Get single post - validates params and optional query
/**
 * @openapi
 * /restaurants/{id}:
 *   get:
 *     summary: Retrieve a single restaurant by ID
 *     tags: [Restaurants]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/getRestaurantById'
 *       '404':
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/getRestaurantById'
 */
router.get("/restaurants/:id", restaurantController.getRestaurantById);

// Update post - validates both params and body
/**
 * @openapi
 * /restaurants/{id}:
 *   put:
 *     summary: Update an existing restaurant
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The id of the restaurant to update
 *         example: 64b8f0c2e1d2c3a4b5c6d7e8
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantName
 *               - restaurantAddress
 *               - restaurantPhone
 *               - restaurantEmail
 *               - restaurantCategory
 *             properties:
 *               restaurantName:
 *                 type: string
 *                 minLength: 1
 *                 example: Casual Dining
 *               restaurantAddress:
 *                 type: string
 *                 example: 123 Main St
 *               restaurantPhone:
 *                 type: string
 *                 example: (123) 456-7890
 *               restaurantEmail:
 *                 type: string
 *                 format: email
 *                 example: info@rrc.com
 *               rating:
 *                 type: number
 *                 minimum: 0
 *                 default: 0
 *                 example: 0
 *               reviewCount:
 *                 type: integer
 *                 minimum: 0
 *                 default: 0
 *                 example: 50
 *               restaurantCategory:
 *                 type: string
 *                 enum: [Fast Food, Casual Dining, Fine Dining]
 *                 default: Casual Dining
 *                 example: Casual Dining
 *     responses:
 *       '200':
 *         description: restaurant updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateRestaurant'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateRestaurant'
 *       '404':
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateRestaurant'
 */
router.put("/restaurants/:id", restaurantController.updateRestaurant);

// Delete post - validates params only
/**
 * @openapi
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete an existing restaurant
 *     tags: [Restaurants]
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
 *         description: Successfully deleted the restaurant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/deleteRestaurant'
 *       '404':
 *         description: Restaurant not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/deleteRestaurant'
 */
router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

export default router;