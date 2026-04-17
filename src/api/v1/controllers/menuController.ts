import { NextFunction, Request, Response } from "express";
import { successResponse } from "../models/responseModel";
import * as menuService from "../services/menuService"

/**
 * GET /api/v1/restaurants/:id/menu
 * Retrieve all menus for a specific restaurant
 * validate required fields
 */
export const getAllMenuItems = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurantId = String(req.params.id);

        if (!restaurantId) {
            res.status(400).json({ message: "Restaurant ID is required" });
            return;
        }
        // get all menu items
        const menuItems = await menuService.getAllMenuItems(restaurantId);
        // count the number of menu items in the database
        const totalCount = menuItems.length;
        res.status(200).json(successResponse(menuItems, "Succesfully retreived", totalCount));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * POST /api/v1/restaurants/:id/menu/:itemId
 * create a new menu item
 */
export const createMenuItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const menuItem = await menuService.createMenuItems(req.body);
        res.status(201).json(successResponse(menuItem, "Menu item created successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * PUT /api/v1/restaurants/:id/menu/:itemId
 * update a specific menu item by its id
 */
export const updateMenuItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.itemId);

        if (!id) {
            res.status(400).json({ message: "Menu Item ID is required" });
            return;
        }
        const menuItem = await menuService.updateMenuItem(id, req.body);
        res.status(200).json(successResponse(menuItem, "Menu item updated successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * DELETE /api/v1/restaurants/:id/menu/:itemId
 * delete a specific menu item by its id
 */
export const deleteMenuItem = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.itemId);

        if (!id) {
            res.status(400).json({ message: "Menu Item ID is required" });
            return;
        }
        const menuItem = await menuService.deleteMenuItem(id);
        res.status(200).json(successResponse(menuItem, "Menu item deleted successfully"));
    } catch (error: unknown) {
        next(error);
    }
};