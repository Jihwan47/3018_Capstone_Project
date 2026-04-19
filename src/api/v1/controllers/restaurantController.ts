import { NextFunction, Request, Response } from "express";
import { successResponse } from "../models/responseModel";
import * as restaurantService from "../services/restaurantService"

/**
 * GET /api/v1/restaurants
 * Retrieve all restaurants in the database
 * validate required fields
 */
export const getAllRestaurants = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get all restaurants
        const restaurant = await restaurantService.getAllRestaurants();
        // count the number of restaurants in the database
        const totalCount = restaurant.length;
        res.status(200).json(successResponse(restaurant, "Succesfully retreived", totalCount));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * GET /api/v1/restaurants/:id
 * retreive a specific restaurants by its id
 */
export const getRestaurantById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);
        const restaurant = await restaurantService.getRestaurantById(id);

        res.status(200).json(successResponse(restaurant, "Restaurant retrieved successfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * POST /api/v1/restaurants
 * create a new restaurant
 */
export const createRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const restaurant = await restaurantService.createRestaurants(req.body);
        res.status(201).json(successResponse(restaurant, "Restaurant created succesfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * PUT /api/v1/restaurants/:id
 * update a specific restaurant by its id
 */
export const updateRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);

        const restaurant = await restaurantService.updateRestaurant(id, req.body);
        res.status(200).json(successResponse(restaurant, "Restaurant updated succesfully"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * DELETE /api/v1/restaurants/:id
 * delete a specific restaurant by its id
 */
export const deleteRestaurant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = String(req.params.id);

        const restaurant = await restaurantService.deleteRestaurant(id);
        res.status(200).json(successResponse(restaurant, "Restaurant deleted succesfully"));
    } catch (error: unknown) {
        next(error);
    }
};
