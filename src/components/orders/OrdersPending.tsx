'use client'
import OrderList from '@/components/orders/OrderList';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { PendingOrder } from '../../core/model/PendingOrder';
import { db } from '../../lib/firebase/web-firebase';



export default function OrdersPending({ chatbot }: Readonly<{ chatbot: string }>) {
    const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])

    useEffect(() => {
        const q = query(collection(db, "orders"), where("chatbot", "==", chatbot));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const orders: PendingOrder[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const order = {
                    items: data.items,
                    timestamp: data.timestamp.toDate(),
                    tableNumber: data.tableNumber,
                    chatbot: data.chatbot,
                    isPending: data.isPending
                }
                orders.push(order)
            });
            setPendingOrders([
                ...pendingOrders,
                ...orders
            ])

        });
        return () => unsubscribe();
    }, [])

    useEffect(() => console.log('pending-orders', pendingOrders), [pendingOrders])

    return (
        <div className="overflow-y-auto w-full" >
            <OrderList orders={pendingOrders} />
        </div>
    )
}
