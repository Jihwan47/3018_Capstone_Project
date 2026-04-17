import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { successResponse } from "../models/responseModel";
import { getAuth, UserRecord } from "firebase-admin/auth";

/**
 * Handles retrieving user details from Firebase Authentication.
 * This endpoint allows administrators to view user information
 * including email, creation date, and custom claims.
 *
 * @param {Request} req - The request object containing user ID in params.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getUserDetails = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const id: string = String(req.params.id);

    try {
        // Fetch user record from Firebase Authentication
        const user: UserRecord = await getAuth().getUser(id);
        res.status(HTTP_STATUS.OK).json(successResponse(user));
    } catch (error) {
        // Pass any errors to the centralized error handler
        next(error);
    }
};