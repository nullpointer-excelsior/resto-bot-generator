import { PendingOrderDocument } from "./model/order-pending-document";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/web-firebase"


interface OrderItemProps {
    order: PendingOrderDocument
}

function calculateTimeElapsed(timestamp: Date): string {
    const now = new Date();
    const elapsedMilliseconds = now.getTime() - timestamp.getTime();
    const elapsedMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
    return `Hace ${elapsedMinutes} minutos`;
}


const OrderItem: React.FC<OrderItemProps> = ({ order }: OrderItemProps) => {
    const { tableNumber, timestamp, items, id } = order

    const onCLickOrder = (orderId: string) => {
        const docRef = doc(db, "orders", orderId);
        updateDoc(docRef, { isPending: false }).then(() => {
            console.log("document-id", orderId)
        })
    }

    return (
        <div className="flex items-center p-4 shadow-sm rounded-lg mb-4 bg-gray-800 hover:cursor-pointer" onClick={e => onCLickOrder(id)}>
            <div className='flex flex-col items-center px-4 space-y-2'>
                <div className="w-16 h-16 flex items-center justify-center bg-orange-800 text-white text-2xl rounded-full">
                    <p className='text-md'>{tableNumber}</p>
                </div>
            </div>
            <p className="text-lime-600 w-56 font-semibold text-base">{calculateTimeElapsed(timestamp)}</p>
            <div className='px-10 space-x-1 space-y-1 content-center'>
                {items.map((item, index) => (
                    <p key={index} className="inline-block w-auto bg-amber-800 text-sm text-center text-white px-4 py-2 rounded-full border-spacing-5">{item}</p>
                ))}
            </div>
        </div>
    );
};


export default function OrderList({ orders }: Readonly<{ orders: PendingOrderDocument[] }>) {
    const sortedOrders = [...orders].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return (
        <>
            {sortedOrders.map((order, index) => (
                <OrderItem key={index} order={order} />
            ))}
        </>
    );
}
