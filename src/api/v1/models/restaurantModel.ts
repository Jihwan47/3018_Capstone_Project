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
