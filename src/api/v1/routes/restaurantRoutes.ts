import express from "express";
import * as restaurantController from "../controllers/restaurantController";
import isAuthorized from "../middleware/authorize";
import authenticate from "../middleware/authenticate";
import { postSchemas } from "../validation/restaurantValidation";
import { validateRequest } from "../middleware/restaurantMiddleware";

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
 *         description: restaurant created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Restaurants'
 *       '400':
 *         description: Invalid input data
 */
router.post("/restaurants", 
    authenticate, 
    isAuthorized({ hasRole: ["admin"] }), 
    validateRequest(postSchemas.create),
    restaurantController.createRestaurant);

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
 *                     $ref: '#/components/schemas/Restaurants'
 *       '500':
 *         description: Internal server error
 */
router.get("/restaurants", 
    authenticate, 
    restaurantController.getAllRestaurants);    

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
 *                     $ref: '#/components/schemas/Restaurants'
 *       '404':
 *         description: Restaurant not found
 */
router.get("/restaurants/:id", 
    authenticate, 
    validateRequest(postSchemas.getById), 
    restaurantController.getRestaurantById);

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
 *               $ref: '#/components/schemas/Restaurants'
 *       '400':
 *         description: Invalid input data
 *       '404':
 *         description: Restaurant not found
 */
router.put("/restaurants/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["admin", "owner"] }), 
    validateRequest(postSchemas.update),
    restaurantController.updateRestaurant);

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
 *                     $ref: '#/components/schemas/Restaurants'
 *       '404':
 *         description: Restaurant not found
 */
router.delete("/restaurants/:id", 
    authenticate, 
    isAuthorized({ hasRole: ["admin"] }), 
    validateRequest(postSchemas.delete),
    restaurantController.deleteRestaurant);

export default router;