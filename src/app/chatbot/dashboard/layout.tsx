import React from 'react';
import Navbar from '../../../components/chatbot/dashboard/Navbar';

const Sidebar: React.FC = () => {
  return (
    <div className="w-96 bg-orange-900 flex flex-col items-center">
      <div className='w-full flex flex-col items-center'>
        <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full my-8" />
        <h1 className="text-xl text-neutral-400 font-bold mb-2">RestoBot</h1>
      </div>
      <Navbar />
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <div className="bg-gray-700 text-neutral-400 ps-6 py-8 pe-6">
      <div className="text-lg py-2 flex justify-between items-center">
        <span className='text-3xl font-bold'>Restobot dashboard</span>
      </div>
      <span className='text-base text-white'>En este dashboard podras visualizar los pedidos que tus clientes hacen por medio de restosbot y el acceso a los chatbots</span>
    </div>
  );
};

type LayoutProps = {
  children: React.ReactNode
  dashboard: React.ReactNode
  params: { id: string }
}

const Layout: React.FC<LayoutProps> = async ({ dashboard, params }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Header />
        <div className='flex-1 flex flex-col w-full text-xs rounded-sm h-96 p-8'>
          {dashboard}
        </div>
      </div>
    </div>
  );
};

export default Layout;