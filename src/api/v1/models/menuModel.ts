
/**
 * Represents response format of review interface
 * @param itemName - name of the menu item
 * @param itemDescription - description of the menu item
 * @param itemPrice - price of the menu item
 */
export interface createMenuItem {
    itemName: string;
    itemDescription: string;
    itemPrice: number;
}


/**
 * Represents response format of review interface
 * @param itemId - unique identifier of the menu item
 * @param itemName - name of the menu item
 * @param itemDescription - description of the menu item
 * @param itemPrice - price of the menu item
 * @param createdAt - date when the menu item was created
 * @param updatedAt - date when the menu item was last updated
 */
export interface menuItem {
    itemId: string;
    itemName: string;
    itemDescription: string;
    itemPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

