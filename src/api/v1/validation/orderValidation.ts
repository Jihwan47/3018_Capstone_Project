import Joi from "joi";

// POST /posts - Create new post
// Post operation schemas organized by request part
export const postSchemas = {    
    create: {
        body: Joi.object({
            restaurantId: Joi.string().required().messages({
                "any.required": '"restaurantId" is required',
                "string.empty": '"restaurantId" cannot be empty',
                "string.base": '"restaurantId" must be a string'
            }),

            customerName: Joi.string().min(2).max(100).required().messages({
                "any.required": '"customerName" is required',
                "string.empty": '"customerName" cannot be empty',
                "string.min": '"customerName" length must be at least 2 characters long',
                "string.max": '"customerName" length must be at most 100 characters long',
                "string.base": '"customerName" must be a string'
            }),

            items: Joi.array().min(1).required().items(
                Joi.object({
                    itemId: Joi.string().required().messages({
                        "number.min": '"capacity" must be greater than or equal to 5',
                        "number.integer": '"capacity" must be an integer"',
                        "number.base": '"capacity" must be a number'
                    })
                })
            ).messages({
                "any.required": '"items" is required',
                "array.min": '"items" must contain at least 1 item',
                "array.base": '"items" must be an array'
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

            customerName: Joi.string().required().messages({
                "any.required": '"customerName" is required',
                "string.empty": '"customerName" cannot be empty',
                "string.base": '"customerName" must be a string'
            }),

            status: Joi.string().valid('Pending', 'In progress', 'Confirmed', 'Cancelled').required().messages({
                "any.required": '"status" is required',
                "string.valid": '"status" must be one of [Pending, In progress, Confirmed, Cancelled]',
                "string.base": '"status" must be a string'
            }),
        }),
    },
// validate all the require fields when calling an order by its id
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
}