// Order 

// POST - /api/v1/orders – Customer place an order (Customer can order their food) 
// GET - /api/v1/orders/:id – Customer can review their order / Owner can review customer’s order (customer / Owner) 
// PUT - /api/v1/orders/:id/status – Update order status (Delivery or Pickup)(Owner can update the status of orders) 

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

    // create new order
    // using partial<T> so that other than required fields, all properties become optional
    const newOrder: Partial<Order> = {
        restaurantName: order.restaurantName,
        customerName: order.customerName,
        items: order.items.map(item => ({ itemId: item.itemId, itemName: "Sample Item", quantity: item.quantity })),
        totalPrice: order.totalPrice,
        status: OrderStatus.Pending
    }

    // get id from the data base
    const newOrderId = await restaurantRepository.createDocument("orders", newOrder);


    // fetches the newly created Order from the database
    const dbDocument = await restaurantRepository.getDocumentById("orders", newOrderId);
    // save the data as Order format
    const savedData = dbDocument?.data() as Order;

    // return api response format
    return {
        restaurantId: savedData.restaurantId,
        restaurantName: savedData.restaurantName,
        customerName: savedData.customerName,
        items: savedData.items,
        totalPrice: savedData.totalPrice,
        status: savedData.status
    }
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
    const data = document.data() as Omit<Order, "restaurantId">;

    return {
        restaurantId: document.id,
        ...data
    }
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
