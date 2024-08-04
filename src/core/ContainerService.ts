import { RestaurantRepository } from "@/core/repositories/RestaurantRepository";
import { OrderService } from "@/core/services/OrderService";
import { getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";


console.log("ContainerService started")
if (!getApps().length) {
    initializeApp();
}

const restaurantRepository = new RestaurantRepository(getFirestore())

const orderService = new OrderService(getFirestore())

export function getRestaurantRepository() {
    return restaurantRepository
}

export function getOrderService() {
    return orderService
}
