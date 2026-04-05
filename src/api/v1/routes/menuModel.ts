import express from "express";
import * as menuController from "../controllers/menuController";

const router = express.Router();

// Create post - validates body only
router.post("/restaurants/:id/menu", menuController.createMenuItem);

// Get all post - validates params and optional query
router.get("/restaurants/:id/menu", menuController.getAllMenuItems);

// Get single post - validates params and optional query
router.get("/restaurants/:id/menu/:itemId", menuController.getMenuItemById);

// Update post - validates both params and body
router.put("/restaurants/:id/menu/:itemId", menuController.updateMenuItem);

// Delete post - validates params only
router.delete("/restaurants/:id/menu/:itemId", menuController.deleteMenuItem);

export default router;