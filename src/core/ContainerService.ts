import { RestaurantRepository } from "@/core/repositories/RestaurantRepository";
import { OrderService } from "@/core/services/OrderService";
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { credential } from 'firebase-admin'
import { getFirestore } from "firebase-admin/firestore";


console.log("ContainerService started")

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);

if (!getApps().length) {
    initializeApp({
        credential: cert(serviceAccount),
        databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
    });
}

const restaurantRepository = new RestaurantRepository(getFirestore())

const orderService = new OrderService(getFirestore())

export function getRestaurantRepository() {
    return restaurantRepository
}

export function getOrderService() {
    return orderService
}
