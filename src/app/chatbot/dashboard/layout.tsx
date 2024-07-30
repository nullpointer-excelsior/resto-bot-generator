import { BellDot, Bot } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-96 bg-orange-900 flex flex-col items-center">
      <div className='w-full flex flex-col items-center'>
        <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full my-8" />
        <h1 className="text-xl text-neutral-400 font-bold mb-2">RestoBot</h1>
      </div>
      <nav className="flex-1 m-8 p-4 w-full">
        <ul className="space-y-8">
          <li>
            <Link className="group flex items-center space-x-2 " href="/chatbot/dashboard/tables">
              <Bot className='stroke-white group-hover:stroke-neutral-400' />
              <p className="group-hover:text-neutral-400 text-white">Chatbots</p>
            </Link>
          </li>
          <li>
            <Link className="group flex items-center space-x-2" href="/chatbot/dashboard/orders">
              <BellDot className='stroke-white group-hover:stroke-neutral-400' />
              <p className="group-hover:text-neutral-400 text-white">Pedidos en espera</p>
            </Link>
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

type LayoutProps = {
  children: React.ReactNode
  dashboard: React.ReactNode
  params: { id: string }
}

const Layout: React.FC<LayoutProps> = ({ dashboard }: LayoutProps) => {

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <div className='p-4'>
          {dashboard}
        </div>
      </div>
    </div>
  );
};

export default Layout;