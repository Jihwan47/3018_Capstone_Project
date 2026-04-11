import { createMenuItem, menuItem } from "../models/menuModel";
import * as restaurantRepository from "../repositories/restaurantRepository"

/**
 * Create menu item
 * @param menu - request interface defined in menuModel.
 * returns menu item information in api response format menuItem.
 */
export const createMenuItems = async (menu: createMenuItem): Promise<menuItem> => {

    // create new menu item
    // using partial<T> so that other than required fields, all properties become optional
    const newMenuItem: Partial<menuItem> = {
        restaurantId: menu.restaurantId,
        itemName: menu.itemName,
        itemDescription: menu.itemDescription,
        itemPrice: menu.itemPrice,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // get id from the data base //must be restaurant's id because menu item is a subcollection of restaurant
    const newRestaurantId = await restaurantRepository.createDocument("menuItems", newMenuItem);

    // fetches the newly created menu item from the database
    const dbDocument = await restaurantRepository.getDocumentById("menuItems", newRestaurantId);
    // save the data as menuItem format
    const savedData = dbDocument?.data() as menuItem;

    // return api response format
    return {
        itemId: savedData.itemId,
        restaurantId: savedData.restaurantId,
        itemName: savedData.itemName,
        itemDescription: savedData.itemDescription,
        itemPrice: savedData.itemPrice,
        createdAt: savedData.createdAt,
        updatedAt: savedData.updatedAt
    }
};

/**
 * Retrieve all menu items
 * returns all menu items in the array
 * with total number of menu items in the array
 */
export const getAllMenuItems = async (restaurantId: string): Promise<menuItem[]> => {

    // wait until document fetches the data from firebase
    const document = await restaurantRepository.getDocuments("menuItems");

    // use map to allocate document data and transform into Event data form
    // and return an array of Events as it Promise<Event[]>
    return document.docs
        .filter(doc => {
            const data = doc.data() as menuItem;
            // filter out the menu items that are not valid
            return data.restaurantId === restaurantId;
        })
        .map(doc => {
            const data = doc.data() as Omit <menuItem, "itemId">;
            return{
                itemId:doc.id,
                ...data
            } as menuItem;
        });
};

/**
 * retrieve an menu item by id
 * @param id: number - unique identifier of an menu item
 * returns a particular menu item if the id is valid
 * throws an error if id is invalid
 */
export const getMenuItemById = async (id: string): Promise<menuItem | undefined> => {
    
    // wait until documnet fetches the data from firebase
    const document = await restaurantRepository.getDocumentById("menuItems", id);

    // if document is invalid
    if(!document){
        throw new Error("Id is invalid");
    }
    
    // since document.data() does not have id field, remove id from the data
    // and will have it back when it returns Promise<Event> type 
    const data = document.data() as Omit<menuItem, "itemId">;

    return {
        itemId: document.id,
        ...data
    }
};

/**
 * update a specific menu item with the id
 * @param id: number - unique identifier of an menu item
 * @param updateData:  Omit<menuItem, "itemId" | "createdAt"> - receive any type of data that updates the menu item
 * @param updateData:  remove itemId and date of the creation because they must remain the same
 * return menuItem varaible with updated information
 */
export const updateMenuItem = async (id: string, updateData: Omit<menuItem, "itemId" | "createdAt"> ): Promise<menuItem> => {
    
    // fetch Menu Item by its id
    const existingDocument = await getMenuItemById(id);

    // if the menu item is invalid
    if(!existingDocument){
        throw new Error("Id is invalid");
    }

    // update the data of the id, and updatedAt will be now
    await restaurantRepository.updateDocument("menuItems", id, {...updateData, updatedAt: new Date()});

    // object spread operator to merge updated code into existing one
    return {
        ...existingDocument,
        ...updateData,
        updatedAt: new Date()
    }
};

/**
 * delete specific menu item with the id
 * @param id: number - unique identifier of an menu item
 * No return
 * Remove particular data with the id
 * throw an error when the id is invalid
 */
export const deleteMenuItem = async (id: string): Promise<void> => {

    // fetch Menu Item by its id
    const document = await getMenuItemById(id);

    // if the menu item is invalid
    if(!document){
        throw new Error("Id is invalid");
    }

    // delete the particular menu item by its id in the database
    await restaurantRepository.deleteDocument("menuItems", id);

}