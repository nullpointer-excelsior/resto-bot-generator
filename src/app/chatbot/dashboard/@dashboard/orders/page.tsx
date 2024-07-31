import React from 'react'

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
          <p className="text-green-600 w-56 font-semibold text-base">{time}</p>
        <div className='px-10 space-x-1 space-y-1 content-center'>
          {items.map((item, index) => (
            <p key={index} className="inline-block w-auto bg-amber-800 text-sm text-center text-white px-4 py-2 rounded-full border-spacing-5">{item}</p>
          ))}
        </div>
    </div>
  );
};



export default function Page() {
  const orders = [
    { tableNumber: 1, items: ['1 cerveza', '1 ensalada césar'], time: 'hace 2 minutos' },
    { tableNumber: 2, items: ['2 copas de vino tinto', '1 pizza margarita'], time: 'hace 5 minutos' },
    { tableNumber: 3, items: ['3 cervezas artesanales', '1 hamburguesa con bacon'], time: 'hace 10 minutos' },
    { tableNumber: 4, items: ['1 jugo de naranja', '1 sandwich de pollo'], time: 'hace 12 minutos' },
    { tableNumber: 5, items: [
      '2 mojitos', '1 plato de nachos', '1 pizza', '1 jugo', '1 hamburguesa', 
      '1 ensalada', '1 pasta', '1 sopa', '1 sandwich', '1 batido', '1 copa de vino'
    ], time: 'hace 15 minutos' },
    { tableNumber: 6, items: ['1 margarita', '1 plato de tacos al pastor'], time: 'hace 18 minutos' },
    { tableNumber: 7, items: [
      '2 cervezas cristal', '1 hamburguesa doble queso', '1 pizza', '1 jugo', 
      '1 hamburguesa', '1 ensalada', '1 pasta', '1 sopa', '1 sandwich', '1 batido', 
      '1 copa de vino', '1 cerveza'
    ], time: 'hace 20 minutos' },
    { tableNumber: 8, items: ['1 refresco', '1 plato de sushi'], time: 'hace 22 minutos' },
    { tableNumber: 9, items: ['1 gin tonic', '1 ensalada mixta'], time: 'hace 25 minutos' },
    { tableNumber: 10, items: ['1 whisky', '1 plato de quesadillas'], time: 'hace 30 minutos' },
    { tableNumber: 11, items: ['2 piñas coladas', '1 pizza pepperoni'], time: 'hace 35 minutos' },
    { tableNumber: 12, items: ['1 agua con gas', '1 ensalada griega'], time: 'hace 40 minutos' },
    { tableNumber: 13, items: [
      '1 mojito', '1 plato de fajitas', '1 pizza', '1 jugo', '1 hamburguesa', 
      '1 ensalada', '1 pasta', '1 sopa', '1 sandwich', '1 batido', '1 copa de vino'
    ], time: 'hace 45 minutos' },
    { tableNumber: 14, items: ['2 cervezas', '1 pizza cuatro quesos'], time: 'hace 50 minutos' },
    { tableNumber: 15, items: ['1 margarita', '1 plato de burritos'], time: 'hace 55 minutos' },
    { tableNumber: 16, items: [
      '2 refrescos', '1 plato de alitas', '1 pizza', '1 jugo', '1 hamburguesa', 
      '1 ensalada', '1 pasta', '1 sopa', '1 sandwich', '1 batido', '1 copa de vino'
    ], time: 'hace 60 minutos' },
    { tableNumber: 17, items: ['1 piña colada', '1 plato de nachos con queso'], time: 'hace 65 minutos' },
    { tableNumber: 18, items: ['1 mojito', '1 plato de tacos de carne asada'], time: 'hace 70 minutos' },
    { tableNumber: 19, items: ['1 gin tonic', '1 plato de ceviche'], time: 'hace 75 minutos' },
    { tableNumber: 20, items: [
      '2 cervezas artesanales', '1 pizza hawaiana', '1 jugo', '1 hamburguesa', 
      '1 ensalada', '1 pasta', '1 sopa', '1 sandwich', '1 batido', '1 copa de vino', 
      '1 cerveza', '1 whisky'
    ], time: 'hace 80 minutos' },
  ];
  
  
  // grid grid-cols-3 gap-4
  return (
    <div className="p-6 overflow-y-auto w-full">
      {orders.map((order, index) => (
        <OrderItem key={index} tableNumber={order.tableNumber} items={order.items} time={order.time} />
      ))}
    </div>
  )
}
