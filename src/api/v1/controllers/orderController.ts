import { NextFunction, Request, Response } from "express";
import { successResponse } from "../models/responseModel";
import * as orderService from "../services/orderService"

/**
 * GET /api/v1/orders/:id
 * retreive a specific order by its id
 */
export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const order = await orderService.getOrderById(id);

        res.status(200).json(successResponse(order, "Order retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * POST /api/v1/orders
 * create a new order
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const order = await orderService.createOrders(req.body);
        res.status(201).json(successResponse(order, "Order created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * PUT /api/v1/orders/:id/status
 * update a specific order by its id
 */
export const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);

        const order = await orderService.updateOrder(id, req.body);
        res.status(200).json(successResponse(order, "Order updated successfully"));
    } catch (error: unknown) {
        next(error);
    }
};