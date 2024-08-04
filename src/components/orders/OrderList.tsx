import { db } from "@/lib/firebase/web-firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { PendingOrderDocument } from "./model/order-pending-document";


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
        toast.success(`Orden mesa ${tableNumber} tomada! ${items.join("\n")}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        const docRef = doc(db, "orders", orderId);
        updateDoc(docRef, { isPending: false }).then(() => {
            console.log("document-id", orderId)
        })
    }

    return (
        <div className="relative w-3/5 flex items-center p-4 shadow-sm rounded-lg mb-4 bg-gray-800 " >
            <div className='flex flex-col items-center px-4 space-y-2'>
                <div className="w-20 h-20 flex items-center justify-center bg-orange-800 text-white text-2xl rounded-full">
                    <p className='text-base'>Mesa {tableNumber}</p>
                </div>
            </div>
            <div className='px-10 space-x-1 space-y-1 content-center'>
                <p className="text-lime-600 w-56 font-semibold text-xl py-2">{calculateTimeElapsed(timestamp)}</p>
                {items.map((item, index) => (
                    <p key={index} className="inline-block w-auto bg-amber-800 text-sm text-center text-white px-4 py-2 rounded-full border-spacing-5">{item}</p>
                ))}
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => onCLickOrder(id)} className=" text-2xl w-56 text-white px-4 py-2 border-2 border-white rounded-full">Tomar pedido</button>
            </div>
        </div>
    );
};


export default function OrderList({ orders }: Readonly<{ orders: PendingOrderDocument[] }>) {
    const sortedOrders = [...orders].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return (
        <>
            {sortedOrders.length === 0 && <p className="text-white text-3xl">No hay pedidos</p>}
            {sortedOrders.map((order, index) => (
                <OrderItem key={index} order={order} />
            ))}
        </>
    );
}
