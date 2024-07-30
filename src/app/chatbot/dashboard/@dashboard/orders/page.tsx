import React from 'react'

interface OrderItemProps {
  tableNumber: number;
  items: string[];
  time: string;
}

const OrderItem: React.FC<OrderItemProps> = ({ tableNumber, items, time }) => {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mb-4">
      <div className="flex items-center">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full mr-4">
          {tableNumber}
        </div>
        <div>
          {items.map((item, index) => (
            <p key={index} className="text-gray-700">{item}</p>
          ))}
        </div>
      </div>
      <p className="text-white">{time}</p>
    </div>
  );
};


const OrderList: React.FC = () => {
  const orders = [
    { tableNumber: 7, items: ['2 cervezas cristal', '1 hamburguesa doble queso'], time: 'hace 3 minutos' },
    { tableNumber: 4, items: ['1 hamburguesa pollo', '1 jugo'], time: 'hace 5 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
    { tableNumber: 9, items: ['2 mojitos'], time: 'hace 7 minutos' },
  ];

  return (
    <div className="p-6 overflow-y-auto w-full">
      {orders.map((order, index) => (
        <OrderItem key={index} tableNumber={order.tableNumber} items={order.items} time={order.time} />
      ))}
    </div>
  );
};

export default function Page() {
  return (
    <div className='flex-1 flex flex-col w-full border text-xs border-white rounded-sm h-96'>
        <OrderList />
    </div>
  )
}
