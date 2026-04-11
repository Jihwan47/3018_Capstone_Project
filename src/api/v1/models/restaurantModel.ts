/**
 * @openapi
 * components:
 *   schemas:
 *     Restaurants:
 *       type: object
 *       required:
 *         - restaurantName
 *         - restaurantAddress
 *         - restaurantPhone
 *         - restaurantEmail
 *         - restaurantCategory
 *       properties:
 *         restaurantName:
 *           type: string
 *           minLength: 1
 *           example: Casual Dining
 *         restaurantAddress:
 *           type: string
 *           example: 123 Main St
 *         restaurantPhone:
 *           type: string
 *           example: (123) 456-7890
 *         restaurantEmail:
 *           type: string
 *           format: email
 *           example: info@rrc.com
 *         rating:
 *           type: number
 *           minimum: 0
 *           default: 0
 *           example: 4.5
 *         reviewCount:
 *           type: integer
 *           minimum: 0
 *           default: 0
 *           example: 50
 *         restaurantCategory:
 *           type: string
 *           enum: [Fast Food, Casual Dining, Fine Dining]
 *           default: Casual Dining
 *           example: Casual Dining
 */

/**
 * Represents enumeration of restaurant status
 * Pending, In Open, Closed
 * Default value of Open
 */
export enum restaurantCategory {
    fastFood = "Fast Food",
    casualDining = "Casual Dining",
    fineDining = "Fine Dining"
}


/**
 * Represents post response format of restaurant interface
 * @param restaurantName - name of an restaurant
 * @param restaurantAddress - address of an restaurant
 * @param restaurantPhone - phone number of an restaurant
 * @param restaurantEmail - email of an restaurant
 */
export interface createRestaurant {
    restaurantName: string;
    restaurantAddress: string;
    restaurantPhone: string;
    restaurantEmail: string;
    restaurantCategory: restaurantCategory;
}


/**
 * Represents response format of restaurant interface
 * @param restaurantId - unique identifier of an restaurant
 * @param restaurantName - name of an restaurant
 * @param restaurantAddress - address of an restaurant
 * @param restaurantPhone - phone number of an restaurant
 * @param restaurantEmail - email of an restaurant
 * @param rating - rating of an restaurant
 * @param reviewCount - number of reviews for an restaurant
 * @param createdAt - date when the restaurant was created
 * @param updatedAt - date when the restaurant was lastly updated
 */
export interface Restaurant {
    restaurantId: string;
    restaurantName: string;
    restaurantAddress: string;
    restaurantPhone: string;
    restaurantEmail: string;
    rating: number;
    reviewCount: number;
    restaurantCategory: restaurantCategory;
    createdAt: Date;
    updatedAt: Date;
}
