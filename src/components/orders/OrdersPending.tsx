'use client'
import OrderList from '@/components/orders/OrderList';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../lib/firebase/web-firebase';
import { PendingOrderDocument } from './model/order-pending-document';
import useValidateOpenAiApiKey from '../../app/hooks/useValidateOpenAiApiKey';

export default function OrdersPending({ chatbot }: Readonly<{ chatbot: string }>) {

    const [pendingOrders, setPendingOrders] = useState<PendingOrderDocument[]>([])
    useValidateOpenAiApiKey()
    
    useEffect(() => {
        const q = query(collection(db, "orders"), where("chatbot", "==", chatbot), where("isPending", "==", true));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const orders: PendingOrderDocument[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                const order = {
                    id: doc.id,
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

    useEffect(() => {
        console.log('pending-orders', pendingOrders)
        playSound()
        scrollToTop()
    }, [pendingOrders])

    const playSound = () => {
        const audio = new Audio('/alert-order.mp3');
        audio.play();
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <div className="overflow-y-auto w-full flex flex-col items-center" >
                <div ref={messagesEndRef}></div>
                <OrderList orders={pendingOrders} />
            </div>
            <ToastContainer />
        </>
    )
}
