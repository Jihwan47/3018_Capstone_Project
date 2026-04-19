// Order 

// POST - /api/v1/orders – Customer place an order (Customer can order their food)
// GET - /api/v1/orders/:id – Customer can review their order / Owner can review customer’s order (customer / Owner) 
// PUT - /api/v1/orders/:id/status – Update order status (Delivery or Pickup)(Owner can update the status of orders) 

import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();

// Create post - validates body only
router.post("/orders", orderController.createOrder);

// Get single post - validates params and optional query
router.get("/orders/:id", orderController.getOrderById);

// Update put - validates both params and body
router.put("/orders/:id", orderController.updateOrder);

export default router;