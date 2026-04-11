/**
 * @openapi
 * components:
 *   schemas:
 *     orders:
 *       type: object
 *       required:
 *         - restaurantName
 *         - customerName
 *         - items
 *       properties:
 *         restaurantName:
 *           type: string
 *           minLength: 1
 *           example: Casual Dining
 *         customerName:
 *           type: string
 *           example: 123 Main St
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - itemId
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 64b8f0c2e1d2c3a4b5c6d7e8
 *               itemName:
 *                 type: string
 *                 example: Cheeseburger
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 example: 10.99
 *         totalPrice:
 *           type: number
 *           minimum: 0
 *           example: 21.98
 *         status:
 *           type: enum
 *           enum: [Pending, In Progress, Completed, Cancelled]
 *           default: Pending
 */

/**
 * Represents enumeration of order status
 * Pending, In Progress, Completed, Cancelled
 * Default value of pending once order has been placed.
 */
export enum OrderStatus {
    Pending = "Pending",
    InProgress = "In Progress",
    Completed = "Completed",
    Cancelled = "Cancelled"
}

/**
 * Represents request format of order interface (Only for pickup)
 * @param restaurantId - ID of the restaurant receiving the order
 * @param restaurantName - name of the restaurant receiving the order
 * @param customerName - name of the customer placing the order
 * @param items - list of items in the order with their price
 */
export interface createOrder {
    restaurantId: string;
    customerName: string;
    items: { itemId: string }[];
}

/**
 * Represents request format of order interface (Only for pickup)
 * @param restaurantId - ID of the restaurant receiving the order
 * @param restaurantName - name of the restaurant receiving the order
 * @param customerId - ID of the customer placing the order
 * @param customerName - name of the customer placing the order
 * @param items - list of items in the order with their price
 * @param totalPrice - total price of the order
 * @param status - status of the order
 */
export interface Order {
    restaurantId: string;
    restaurantName: string;
    customerName: string;
    items: { itemId: string; itemName: string; itemPrice: number }[];
    totalPrice: number;
    status: OrderStatus;
    createdAt?: Date;
    updatedAt?: Date;
}