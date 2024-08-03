import { Firestore } from "firebase-admin/firestore";
import { Product } from "../model/Order";
import { createPendingOrder } from "../model/PendingOrder";


export class OrderService {

    constructor(private readonly db: Firestore) { }

    async send(params: { products: Product[], chatbot: string }) {
        const { products, chatbot } = params
        const batch = this.db.batch();
        const collectionRef = this.db.collection('orders'); 
        const docRef = collectionRef.doc(); 
        const order = createPendingOrder({
            products,
            chatbot
        })
        console.log("Send 2 firebase", order)
        batch.set(docRef, order);
        await batch.commit()
    }

}
