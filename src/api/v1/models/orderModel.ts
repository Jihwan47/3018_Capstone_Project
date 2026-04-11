
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