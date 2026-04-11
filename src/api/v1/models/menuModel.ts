/**
 * @openapi
 * components:
 *   schemas:
 *     Menus:
 *       type: object
 *       required:
 *         - itemName
 *         - itemDescription
 *         - itemPrice
 *       properties:
 *         itemId:
 *           type: string
 *           description: Unique identifier of the menu item
 *           example: 7865d2c2e1d2c3a45d4a6288
 *         restaurantId:
 *           type: string
 *           description: Unique identifier of the restaurant
 *           example: 64b8f0c2e1d2c3a4b5c6d7e8   
 *         itemName:
 *           type: string
 *           minLength: 1
 *           example: Casual Dining
 *         itemDescription:
 *           type: string
 *           example: A delicious dish
 *         itemPrice:
 *           type: number
 *           minimum: 0.01
 *           example: 10.99
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the menu item was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the menu item was last updated
 *           example: "2024-01-20T14:45:00Z"
 */

/**
 * Represents response format of review interface
 * @param itemId - unique identifier of the menu item
 * @param restaurantId - unique identifier of the restaurant
 * @param itemName - name of the menu item
 * @param itemDescription - description of the menu item
 * @param itemPrice - price of the menu item
 * @param createdAt - date when the menu item was created
 * @param updatedAt - date when the menu item was last updated
 */
export interface menuItem {
    itemId: string;
    restaurantId: string;
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Represents response format of review interface
 * @param itemName - name of the menu item
 * @param itemDescription - description of the menu item
 * @param itemPrice - price of the menu item
 */
export interface createMenuItem {
    restaurantId: string;
    itemName: string;
    itemDescription: string;
    itemPrice: number;
}


