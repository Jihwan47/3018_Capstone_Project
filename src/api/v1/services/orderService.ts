import { OrderStatus, createOrder, Order } from "../models/orderModel";
import * as restaurantRepository from "../repositories/restaurantRepository"

/**
 * Create event
 * @param event - request interface defined in postModel.
 * returns ticket information in api response format Event.
 * Id format will be used
 * status of a new event will be active if not proivded by default
 * category of a new event will be general if not proivded by default
 */
export const createOrders = async (order: createOrder): Promise<Order> => {

    // extract restaurant information with restaurant id
    const restaurant = await restaurantRepository.getDocumentById("restaurants",order.restaurantId);

    // validate restaurant id
    if(!restaurant){
        throw new Error("Restaurant Id is invalid");
    }

    // restaurantName is required to create an order which is not provided by the user,
    // so extract the name with the id from the firebase
    const restaurantData = restaurant.data() as { restaurantName: string };

    // menuitem array
    const menuItems: { itemId: string; itemName: string; itemPrice: number }[] = [];
    let totalPrice = 0;

    // iterate through the items and extract information
    for( const items of order.items){
        const menuItem = await restaurantRepository.getDocumentById("menuItems", items.itemId);

        if(!menuItem){
            throw new Error("Menu item Id is invalid");
        }

        const menuInfo = menuItem.data() as { itemName: string; itemPrice: number };
        menuItems.push({
            itemId: items.itemId,
            itemName: menuInfo.itemName,
            itemPrice: menuInfo.itemPrice
        })
        totalPrice += menuInfo.itemPrice;
    }

    // create new order
    // using partial<T> so that other than required fields, all properties become optional
    const newOrder: Partial<Order> = {
        restaurantId: order.restaurantId,
        restaurantName: restaurantData.restaurantName,
        customerName: order.customerName,
        items: menuItems,
        totalPrice: totalPrice,
        status: OrderStatus.Pending,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    // push new order to the firebase
    const newOrderId = await restaurantRepository.createDocument("orders", newOrder);

    // fetch data in the firebase 
    const document = await restaurantRepository.getDocumentById("orders", newOrderId);
    // save the fetch data in Order model format
    const savedData = document?.data() as Order;

    return savedData;
};

/**
 * retrieve an order by id
 * @param id: number - unique identifier of an order 
 * returns a particular order if the id is valid 
 * throws an error if id is invalid
 */
export const getOrderById = async (id: string): Promise<Order | undefined> => {
    
    // wait until documnet fetches the data from firebase
    const document = await restaurantRepository.getDocumentById("orders", id);

    // if document is invalid
    if(!document){
        throw new Error("Id is invalid");
    }
    
    // since document.data() does not have id field, remove id from the data
    // and will have it back when it returns Promise<Order> type 
    const data = document.data() as Order; 

    return data;
};

/**
 * update a specific order with the id
 * @param id: number - unique identifier of an order 
 * @param updateData:  Omit<Order, "restaurantId" | "createdAt"> - receive any type of data that updates the order
 * @param updateData:  remove restaurantId and date of the creation because they must remain the same
 * return Order varaible with updated information
 */
export const updateOrder = async (id: string, updateData: Omit<Order, "restaurantId" | "createdAt"> ): Promise<Order> => {
    
    // fetch Order by its id
    const existingDocument = await getOrderById(id);

    // if the order is invalid
    if(!existingDocument){
        throw new Error("Id is invalid");
    }

    // update the data of the id, and updatedAt will be now
    await restaurantRepository.updateDocument("orders", id, {...updateData, updatedAt: new Date()});

    // object spread operator to merge updated code into existing one
    return {
        ...existingDocument,
        ...updateData,
    }
};
