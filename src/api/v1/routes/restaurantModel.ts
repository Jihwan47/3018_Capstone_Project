
import express from "express";
import * as restaurantController from "../controllers/restaurantController";

const router = express.Router();

// Create post - validates body only
router.post("/restaurants", restaurantController.createRestaurant);

// Get all post - validates params and optional query
router.get("/restaurants", restaurantController.getAllRestaurants);

// Get single post - validates params and optional query
router.get("/restaurants/:id", restaurantController.getRestaurantById);

// Update post - validates both params and body
router.put("/restaurants/:id", restaurantController.updateRestaurant);

// Delete post - validates params only
router.delete("/restaurants/:id", restaurantController.deleteRestaurant);

export default router;