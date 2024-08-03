import { Product } from "./Order";

export interface PendingOrder {
    items: string[];
    timestamp: Date;
    tableNumber: number;
    chatbot: string;
    isPending: boolean;
}

export function createPendingOrder(props: { products: Product[], chatbot: string }): PendingOrder {
    return {
        items: props.products.map((p) => `${p.quantity} ${p.name}`),
        timestamp: new Date(),
        tableNumber: 1,
        chatbot: props.chatbot,
        isPending: true
    };
}
