import { table } from 'console';
import { BellDot, Bot } from 'lucide-react';
import React, { useState } from 'react';

const Sidebar: React.FC<{ params: { id: string } }> = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-96 bg-orange-900 flex flex-col items-center">
            <div className='w-full flex flex-col items-center'>
            <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full my-8" />
            <h1 className="text-xl text-neutral-400 font-bold mb-2">RestoBot</h1> 
            </div>
            <nav className="flex-1 p-4 w-full">
                <ul className="space-y-6">
                    <li className="group flex items-center space-x-2 ">
                        <Bot className='stroke-white group-hover:stroke-neutral-400' />
                        <a href={`/chatbot/${params.id}/tables`} className="group-hover:text-neutral-400 text-white">Chatbots</a>
                    </li>
                    <li className="group flex items-center space-x-2">
                        <BellDot className='stroke-white group-hover:stroke-neutral-400' />
                        <a href={`/chatbot/${params.id}/orders`} className="group-hover:text-neutral-400 text-white">Pedidos en espera</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

const Header: React.FC = () => {
    return (
        <div className="bg-gray-700 text-neutral-400 ps-6 py-8 pe-6">
            <div className="text-lg py-2 flex justify-between items-center">
                <span className='text-3xl font-bold'>Pedidos en espera</span>
            </div>
            <span className='text-base text-white'>En este dashboard podras visualizar los pedidos que tus clientes hacen por medio de restosbot</span>
        </div>
    );
};

type PageProps = {
    children: React.ReactNode
    orders: React.ReactNode
    tables: React.ReactNode
    params: { id: string }
}

const Page: React.FC<PageProps> = ({ params, orders, tables, children }: PageProps) => {


    return (
        <div className="flex h-screen p-12 ">
            <Sidebar params={params} />
            <div className="flex-1 flex flex-col w-full">
                <Header />
                <div className='flex gap-4 flex-row p-4'>
                    {/* <div className='basis-1/3'>
                         {tables}
                    </div> */}
                    {/* <div className='basis-2/3'> */}
                        {orders}
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
};

export default Page;