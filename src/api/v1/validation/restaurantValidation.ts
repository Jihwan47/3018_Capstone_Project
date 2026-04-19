import Joi from "joi";

// POST /posts - Create new post
// Post operation schemas organized by request part
export const postSchemas = {    
    create: {
        body: Joi.object({
            restaurantName: Joi.string().min(1).required().messages({
                "any.required": '"restaurantName" is required',
                "string.empty": '"restaurantName" cannot be empty',
                "string.min": '"restaurantName" length must be at least 1 characters long',
                "string.base": '"restaurantName" must be a string'
            }),

            restaurantAddress: Joi.string().required().messages({
                "any.required": '"restaurantAddress" is required',
                "string.empty": '"restaurantAddress" cannot be empty',
                "string.base": '"restaurantAddress" must be a string'
            }),

            restaurantPhone: Joi.string().required().messages({
                "any.required": '"restaurantPhone" is required',
                "string.empty": '"restaurantPhone" cannot be empty',
                "string.base": '"restaurantPhone" must be a string'
            }),

            restaurantEmail: Joi.string().required().email().messages({
                "any.required": '"restaurantEmail" is required',
                "string.empty": '"restaurantEmail" cannot be empty',
                "string.base": '"restaurantEmail" must be a string',
                "string.email": '"restaurantEmail" must be a valid email address'
            }),

            restaurantCategory: Joi.string().valid("Fast Food", "Casual Dining", "Fine Dining").default("Casual Dining").required().messages({
                "string.valid": '"restaurantCategory" must be one of [Fast Food, Casual Dining, Fine Dining]',
                "any.required": '"restaurantCategory" is required',
                "string.base": '"restaurantCategory" must be a string'
            }),

            rating: Joi.number().min(0).max(5).default(0).messages({
                "number.min": '"rating" must be greater than or equal to 0',
                "number.max": '"rating" must be less than or equal to 5',
                "number.base": '"rating" must be a number'
            }),

            reviewCount: Joi.number().integer().min(0).default(0).messages({
                "number.min": '"reviewCount" must be greater than or equal to 0',
                "number.integer": '"reviewCount" must be an integer',
                "number.base": '"reviewCount" must be a number'
            }),
        }),        
    },

// validate all the require fields when updating
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "restaurant ID is required",
                "string.empty": "restaurant ID cannot be empty",
                "string.base": "restaurant ID must be a string"
            }),
        }), 
        body: Joi.object({
            restaurantName: Joi.string().min(1).required().messages({
                "any.required": '"restaurantName" is required',
                "string.empty": '"restaurantName" cannot be empty',
                "string.min": '"restaurantName" length must be at least 1 characters long',
                "string.base": '"restaurantName" must be a string'
            }),

            restaurantAddress: Joi.string().required().messages({
                "any.required": '"restaurantAddress" is required',
                "string.empty": '"restaurantAddress" cannot be empty',
                "string.base": '"restaurantAddress" must be a string'
            }),

            restaurantPhone: Joi.string().required().messages({
                "any.required": '"restaurantPhone" is required',
                "string.empty": '"restaurantPhone" cannot be empty',
                "string.base": '"restaurantPhone" must be a string'
            }),

            restaurantEmail: Joi.string().required().email().messages({
                "any.required": '"restaurantEmail" is required',
                "string.empty": '"restaurantEmail" cannot be empty',
                "string.base": '"restaurantEmail" must be a string',
                "string.email": '"restaurantEmail" must be a valid email address'
            }),

            restaurantCategory: Joi.string().valid("Fast Food", "Casual Dining", "Fine Dining").default("Casual Dining").required().messages({
                "string.valid": '"restaurantCategory" must be one of [Fast Food, Casual Dining, Fine Dining]',
                "any.required": '"restaurantCategory" is required',
                "string.base": '"restaurantCategory" must be a string'
            }),

            rating: Joi.number().min(0).max(5).messages({
                "number.min": '"rating" must be greater than or equal to 0',
                "number.max": '"rating" must be less than or equal to 5',
                "number.base": '"rating" must be a number'
            }),

            reviewCount: Joi.number().integer().min(0).messages({
                "number.min": '"reviewCount" must be greater than or equal to 0',
                "number.integer": '"reviewCount" must be an integer',
                "number.base": '"reviewCount" must be a number'
            }),
        }),
    },
// validate all the require fields when calling an restaurant by its id
// Get single post - validates params and optional query
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "restaurant ID is required",
                "string.empty": "restaurant ID cannot be empty",
                "string.base": "restaurant ID must be a string"
            }),
        }),
    },

// validate all the require fields when deleting an restaurant by its id
// Delete post - validates params only
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "restaurant ID is required",
                "string.empty": "restaurant ID cannot be empty",
                "string.base": "restaurant ID must be a string"
            }),
        }),
    },
    
}