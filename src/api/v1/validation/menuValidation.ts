import Joi from "joi";

// POST /posts - Create new post
// Post operation schemas organized by request part
export const postSchemas = {    
    create: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "restaurant ID is required",
                "string.empty": "restaurant ID cannot be empty",
                "string.base": "restaurant ID must be a string"
            }),
        }),
        body: Joi.object({
            itemName: Joi.string().min(1).required().messages({
                "any.required": '"itemName" is required',
                "string.empty": '"itemName" cannot be empty',
                "string.min": '"itemName" length must be at least 1 characters long',
            }),

            itemDescription: Joi.string().max(200).required().messages({
                "any.required": '"itemDescription" is required',
                "string.empty": '"itemDescription" cannot be empty',
                "string.max": '"itemDescription" length must be at most 200 characters long',
                "string.base": '"itemDescription" must be a string'
            }),

            itemPrice: Joi.number().min(0.01).required().messages({
                "number.min": '"itemPrice" must be greater than or equal to 0.01',
                "number.base": '"itemPrice" must be a number',
                "any.required": '"itemPrice" is required'
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
            itemId: Joi.string().required().messages({
                "any.required": "menu item ID is required",
                "string.empty": "menu item ID cannot be empty",
                "string.base": "menu item ID must be a string"
            }),
        }),
        body: Joi.object({
            itemName: Joi.string().min(1).required().messages({
                "any.required": '"itemName" is required',
                "string.empty": '"itemName" cannot be empty',
                "string.min": '"itemName" length must be at least 1 characters long',
            }),
            itemDescription: Joi.string().max(200).required().messages({
                "any.required": '"itemDescription" is required',
                "string.empty": '"itemDescription" cannot be empty',
                "string.max": '"itemDescription" length must be at most 200 characters long',
                "string.base": '"itemDescription" must be a string'
            }),
            itemPrice: Joi.number().min(0.01).required().messages({
                "number.min": '"itemPrice" must be greater than or equal to 0.01',
                "number.base": '"itemPrice" must be a number',
                "any.required": '"itemPrice" is required'
            }),
        }),
    },
// validate all the require fields when calling an menu
// Get single post - validates params and optional query
    getAll: {
        params: Joi.object({
            id: Joi.string().required()
        }),
    },

// validate all the require fields when deleting an menu item by its id
// Delete post - validates params only
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "restaurant ID is required",
                "string.empty": "restaurant ID cannot be empty",
                "string.base": "restaurant ID must be a string"
            }),
            itemId: Joi.string().required().messages({
                "any.required": "menu item ID is required",
                "string.empty": "menu item ID cannot be empty",
                "string.base": "menu item ID must be a string"
            }),
        }),
    },
    
}