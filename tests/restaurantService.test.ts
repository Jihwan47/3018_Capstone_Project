import { Request, Response, NextFunction } from "express";
import * as restaurantController from "../src/api/v1/controllers/restaurantController";
import * as restaurantService from "../src/api/v1/services/restaurantService";
import { successResponse } from "../src/api/v1/models/responseModel";

jest.mock("../src/api/v1/services/restaurantService");
jest.mock("../src/api/v1/models/responseModel");

describe("Restaurant Controller", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: Partial<NextFunction>;

    beforeEach(() => {
        mockRequest = {
            params: {},
            body: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis()
        };
        mockNext = jest.fn();
        jest.clearAllMocks();
    });

    describe("getAllRestaurants", () => {
        it("should return all restaurants with status 200", async () => {
            const mockRestaurants = [
                {
                    restaurantId: "1",
                    restaurantName: "Restaurant 1",
                    restaurantAddress: "123 Main St",
                    restaurantPhone: "(123) 456-7890",
                    restaurantEmail: "rest1@example.com",
                    rating: 4.5,
                    reviewCount: 50,
                    restaurantCategory: "Casual Dining",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            (restaurantService.getAllRestaurants as jest.Mock).mockResolvedValue(
                mockRestaurants
            );
            (successResponse as jest.Mock).mockReturnValue({
                data: mockRestaurants
            });

            await restaurantController.getAllRestaurants(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalled();
            expect(restaurantService.getAllRestaurants).toHaveBeenCalled();
        });

        it("should handle errors and call next middleware", async () => {
            const error = new Error("Database error");
            (restaurantService.getAllRestaurants as jest.Mock).mockRejectedValue(
                error
            );

            await restaurantController.getAllRestaurants(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should return correct count of restaurants", async () => {
            const mockRestaurants = [
                {
                    restaurantId: "1",
                    restaurantName: "Restaurant 1",
                    restaurantAddress: "123 Main St",
                    restaurantPhone: "(123) 456-7890",
                    restaurantEmail: "rest1@example.com",
                    rating: 4.5,
                    reviewCount: 50,
                    restaurantCategory: "Casual Dining",
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    restaurantId: "2",
                    restaurantName: "Restaurant 2",
                    restaurantAddress: "456 Oak Ave",
                    restaurantPhone: "(456) 789-0123",
                    restaurantEmail: "rest2@example.com",
                    rating: 4.0,
                    reviewCount: 30,
                    restaurantCategory: "Fine Dining",
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ];

            (restaurantService.getAllRestaurants as jest.Mock).mockResolvedValue(
                mockRestaurants
            );
            (successResponse as jest.Mock).mockReturnValue({
                data: mockRestaurants,
                count: 2
            });

            await restaurantController.getAllRestaurants(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(successResponse).toHaveBeenCalledWith(
                mockRestaurants,
                expect.any(String),
                2
            );
        });
    });

    describe("getRestaurantById", () => {
        it("should return a specific restaurant by ID with status 200", async () => {
            const mockRestaurant = {
                restaurantId: "1",
                restaurantName: "Restaurant 1",
                restaurantAddress: "123 Main St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "rest1@example.com",
                rating: 4.5,
                reviewCount: 50,
                restaurantCategory: "Casual Dining",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockRequest.params = { id: "1" };

            (restaurantService.getRestaurantById as jest.Mock).mockResolvedValue(
                mockRestaurant
            );
            (successResponse as jest.Mock).mockReturnValue({
                data: mockRestaurant
            });

            await restaurantController.getRestaurantById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.getRestaurantById).toHaveBeenCalledWith("1");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalled();
        });

        it("should handle not found error", async () => {
            mockRequest.params = { id: "999" };
            const error = new Error("Id is invalid");

            (restaurantService.getRestaurantById as jest.Mock).mockRejectedValue(
                error
            );

            await restaurantController.getRestaurantById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should convert ID to string", async () => {
            mockRequest.params = { id: "123" };
            const mockRestaurant = {
                restaurantId: "123",
                restaurantName: "Restaurant 123",
                restaurantAddress: "789 Elm St",
                restaurantPhone: "(789) 012-3456",
                restaurantEmail: "rest123@example.com",
                rating: 4.2,
                reviewCount: 25,
                restaurantCategory: "Fast Food",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            (restaurantService.getRestaurantById as jest.Mock).mockResolvedValue(
                mockRestaurant
            );

            await restaurantController.getRestaurantById(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.getRestaurantById).toHaveBeenCalledWith("123");
        });
    });

    describe("createRestaurant", () => {
        it("should create a restaurant and return status 201", async () => {
            const createData = {
                restaurantName: "New Restaurant",
                restaurantAddress: "789 Elm St",
                restaurantPhone: "(789) 012-3456",
                restaurantEmail: "newrest@example.com",
                restaurantCategory: "Casual Dining"
            };

            const mockCreatedRestaurant = {
                restaurantId: "new-id",
                ...createData,
                rating: 0,
                reviewCount: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockRequest.body = createData;

            (restaurantService.createRestaurants as jest.Mock).mockResolvedValue(
                mockCreatedRestaurant
            );
            (successResponse as jest.Mock).mockReturnValue({
                data: mockCreatedRestaurant
            });

            await restaurantController.createRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.createRestaurants).toHaveBeenCalledWith(
                createData
            );
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalled();
        });

        it("should handle creation errors", async () => {
            mockRequest.body = {
                restaurantName: "",
                restaurantAddress: "123 Main St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "invalid-email",
                restaurantCategory: "Invalid Category"
            };

            const error = new Error("Invalid input data");

            (restaurantService.createRestaurants as jest.Mock).mockRejectedValue(
                error
            );

            await restaurantController.createRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should use default category if not provided", async () => {
            const createData = {
                restaurantName: "Simple Restaurant",
                restaurantAddress: "123 Main St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "simple@example.com"
            };

            mockRequest.body = createData;

            (restaurantService.createRestaurants as jest.Mock).mockResolvedValue({
                restaurantId: "simple-id",
                ...createData,
                restaurantCategory: "Casual Dining",
                rating: 0,
                reviewCount: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await restaurantController.createRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.createRestaurants).toHaveBeenCalledWith(
                createData
            );
        });
    });

    describe("updateRestaurant", () => {
        it("should update a restaurant and return status 200", async () => {
            const updateData = {
                restaurantName: "Updated Restaurant",
                restaurantAddress: "123 New St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "updated@example.com",
                restaurantCategory: "Fine Dining",
                rating: 4.8,
                reviewCount: 100
            };

            const mockUpdatedRestaurant = {
                restaurantId: "1",
                ...updateData,
                createdAt: new Date("2024-01-01"),
                updatedAt: new Date()
            };

            mockRequest.params = { id: "1" };
            mockRequest.body = updateData;

            (restaurantService.updateRestaurant as jest.Mock).mockResolvedValue(
                mockUpdatedRestaurant
            );
            (successResponse as jest.Mock).mockReturnValue({
                data: mockUpdatedRestaurant
            });

            await restaurantController.updateRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.updateRestaurant).toHaveBeenCalledWith(
                "1",
                updateData
            );
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalled();
        });

        it("should handle update error for non-existent restaurant", async () => {
            mockRequest.params = { id: "999" };
            mockRequest.body = { restaurantName: "Updated" };

            const error = new Error("Id is invalid");

            (restaurantService.updateRestaurant as jest.Mock).mockRejectedValue(
                error
            );

            await restaurantController.updateRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should allow partial updates", async () => {
            const partialUpdate = {
                restaurantName: "Partially Updated"
            };

            mockRequest.params = { id: "1" };
            mockRequest.body = partialUpdate;

            const mockUpdatedRestaurant = {
                restaurantId: "1",
                restaurantName: "Partially Updated",
                restaurantAddress: "123 Main St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "rest@example.com",
                rating: 4.5,
                reviewCount: 50,
                restaurantCategory: "Casual Dining",
                createdAt: new Date(),
                updatedAt: new Date()
            };

            (restaurantService.updateRestaurant as jest.Mock).mockResolvedValue(
                mockUpdatedRestaurant
            );

            await restaurantController.updateRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.updateRestaurant).toHaveBeenCalledWith(
                "1",
                partialUpdate
            );
        });
    });

    describe("deleteRestaurant", () => {
        it("should delete a restaurant and return status 200 with message", async () => {
            mockRequest.params = { id: "1" };

            (restaurantService.deleteRestaurant as jest.Mock).mockResolvedValue(
                undefined
            );
            (successResponse as jest.Mock).mockReturnValue({
                message: "Restaurant deleted successfully"
            });

            await restaurantController.deleteRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.deleteRestaurant).toHaveBeenCalledWith("1");
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalled();
        });

        it("should handle delete error for non-existent restaurant", async () => {
            mockRequest.params = { id: "999" };
            const error = new Error("Id is invalid");

            (restaurantService.deleteRestaurant as jest.Mock).mockRejectedValue(
                error
            );

            await restaurantController.deleteRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(error);
        });

        it("should convert ID to string before deletion", async () => {
            mockRequest.params = { id: "123" };

            (restaurantService.deleteRestaurant as jest.Mock).mockResolvedValue(
                undefined
            );

            await restaurantController.deleteRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(restaurantService.deleteRestaurant).toHaveBeenCalledWith("123");
        });
    });

    describe("Error Handling", () => {
        it("should handle unknown error types gracefully", async () => {
            const unknownError = new Error("Unknown error");

            (restaurantService.getAllRestaurants as jest.Mock).mockRejectedValue(
                unknownError
            );

            await restaurantController.getAllRestaurants(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(mockNext).toHaveBeenCalledWith(unknownError);
        });
    });

    describe("Response Format", () => {
        it("should call successResponse with correct parameters for create", async () => {
            const createData = {
                restaurantName: "Test Restaurant",
                restaurantAddress: "123 Main St",
                restaurantPhone: "(123) 456-7890",
                restaurantEmail: "test@example.com",
                restaurantCategory: "Casual Dining"
            };

            const mockCreatedRestaurant = {
                restaurantId: "test-id",
                ...createData,
                rating: 0,
                reviewCount: 0,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            mockRequest.body = createData;

            (restaurantService.createRestaurants as jest.Mock).mockResolvedValue(
                mockCreatedRestaurant
            );

            await restaurantController.createRestaurant(
                mockRequest as Request,
                mockResponse as Response,
                mockNext as NextFunction
            );

            expect(successResponse).toHaveBeenCalledWith(
                mockCreatedRestaurant,
                expect.stringContaining("Restaurant created succesfully")
            );
        });
    });
});