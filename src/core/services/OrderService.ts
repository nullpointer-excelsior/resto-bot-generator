import { Product } from "../model/Order";

export class OrderService {

    async send(products: Product[]) {
        products.forEach(p => console.log(`Sending order: ${p.quantity} ${p.name}`))
    }

}

export const orderService = new OrderService()