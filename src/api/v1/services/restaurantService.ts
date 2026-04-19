import { Restaurant, createRestaurant, restaurantCategory } from "../models/restaurantModel";
import * as restaurantRepository from "../repositories/restaurantRepository"

/** 
 * Asynchronous, this assingment is dealing with real database.
 * it menas, the function takes some time and will return after completion
 * which is Promise
*/ 

/**
 * Create restaurant
 * @param restaurant - request interface defined in restaurantModel.
 * returns restaurant information in api response format Restaurant.
 * Default status of restaurant is casualDining if not provided.
 */
export const createRestaurants = async (restaurant: createRestaurant): Promise<Restaurant> => {

    // create new event
    // using partial<T> so that other than required fields, all properties become optional
    const newRestaurant: Partial<Restaurant> = {
        restaurantName: restaurant.restaurantName,
        restaurantAddress: restaurant.restaurantAddress,
        restaurantPhone: restaurant.restaurantPhone,
        restaurantEmail: restaurant.restaurantEmail,
        restaurantCategory: restaurant.restaurantCategory || restaurantCategory.casualDining,
        rating: 0,
        reviewCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // get id from the data base
    const newRestaurantId = await restaurantRepository.createDocument("restaurants", newRestaurant);

    // fetches the newly created event from the database
    const dbDocument = await restaurantRepository.getDocumentById("restaurants", newRestaurantId);
    // save the data as Event format
    const savedData = dbDocument?.data() as Restaurant;

    // return api response format
    return {
        restaurantId: savedData.restaurantId,
        restaurantName: savedData.restaurantName,
        restaurantAddress: savedData.restaurantAddress,
        restaurantPhone: savedData.restaurantPhone,
        restaurantEmail: savedData.restaurantEmail,
        rating: savedData.rating,
        reviewCount: savedData.reviewCount,
        restaurantCategory: savedData.restaurantCategory,
        createdAt: savedData.createdAt,
        updatedAt: savedData.updatedAt
    }
};

/**
 * Retrieve all restaurants
 * returns all restaurants in the array
 * with total number of restaurants in the array
 */
export const getAllRestaurants = async (): Promise<Restaurant[]> => {

    // wait until document fetches the data from firebase
    const document = await restaurantRepository.getDocuments("restaurants");

    // use map to allocate document data and transform into restaurants data form
    // and return an array of Restaurants as it Promise<Restaurant[]>
    return document.docs.map(doc => {
        const data = doc.data() as Omit <Restaurant, "restaurantId">;
        return{
            restaurantId:doc.id,
            ...data
        } as Restaurant;
    });
};

/**
 * retrieve an restaurant by id
 * @param id: number - unique identifier of an restaurant
 * returns a particular restaurant if the id is valid
 * throws an error if id is invalid
 */
export const getRestaurantById = async (id: string): Promise<Restaurant | undefined> => {
    
    // wait until documnet fetches the data from firebase
    const document = await restaurantRepository.getDocumentById("restaurants", id);

    // if document is invalid
    if(!document){
        throw new Error("Id is invalid");
    }
    
    // since document.data() does not have id field, remove id from the data
    // and will have it back when it returns Promise<Restaurant> type 
    const data = document.data() as Omit<Restaurant, "restaurantId">;

    return {
        restaurantId: document.id,
        ...data
    }
};

/**
 * update a specific restaurant with the id
 * @param id: number - unique identifier of an restaurant 
 * @param updateData:  Omit<Restaurant, "restaurantId" | "createdAt"> - receive any type of data that updates the restaurant
 * @param updateData:  remove id and date of the creation because they must remain the same
 * return Restaurant varaible with updated information
 */
export const updateRestaurant = async (id: string, updateData: Omit<Restaurant, "restaurantId" | "createdAt"> ): Promise<Restaurant> => {
    
    // fetch Restaurant by its id
    const existingDocument = await getRestaurantById(id);

    // if the restaurant is invalid
    if(!existingDocument){
        throw new Error("Id is invalid");
    }

    // update the data of the id, and updatedAt will be now
    await restaurantRepository.updateDocument("restaurants", id, {...updateData, updatedAt: new Date()});

    // object spread operator to merge updated code into existing one
    return {
        ...existingDocument,
        ...updateData,
        updatedAt: new Date()
    }
};

/**
 * delete specific restaurant with the id
 * @param id: number - unique identifier of an restaurant
 * No return
 * Remove particular data with the id
 * throw an error when the id is invalid
 */
export const deleteRestaurant = async (id: string): Promise<void> => {

    // fetch Restaurant by its id
    const document = await getRestaurantById(id);

    // if the restaurant is invalid
    if(!document){
        throw new Error("Id is invalid");
    }

    // delete the particular restaurant by its id in the database
    await restaurantRepository.deleteDocument("restaurants", id);

}