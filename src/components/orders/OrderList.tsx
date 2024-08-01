interface OrderItemProps {
    tableNumber: number;
    items: string[];
    time: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ tableNumber, items, time }) => {
    return (
        <div className="flex items-center p-4 shadow-sm rounded-lg mb-4 bg-gray-800 hover:cursor-pointer">
            <div className='flex flex-col items-center px-4 space-y-2'>
                <div className="w-16 h-16 flex items-center justify-center bg-orange-800 text-white text-2xl rounded-full">
                    <p className='text-md'>{tableNumber}</p>
                </div>
            </div>
            <p className="text-lime-600 w-56 font-semibold text-base">{time}</p>
            <div className='px-10 space-x-1 space-y-1 content-center'>
                {items.map((item, index) => (
                    <p key={index} className="inline-block w-auto bg-amber-800 text-sm text-center text-white px-4 py-2 rounded-full border-spacing-5">{item}</p>
                ))}
            </div>
        </div>
    );
};


export default function OrderList({ orders }: Readonly<{ orders: { tableNumber: number, items: string[], time: string }[] }>) {
    return (
        <>
            {orders.map((order, index) => (
                <OrderItem key={index} tableNumber={order.tableNumber} items={order.items} time={order.time} />
            ))}
        </>
    )
}