import { BellDot } from 'lucide-react';
import React from 'react';


const Header: React.FC = () => {
    return (
        <div className="bg-orange-800  ps-6 py-8 pe-6">
            <div className="group flex items-center space-x-4 py-4" >
                <BellDot className='w-12 h-12 stroke-white' />
                <p className="text-3xl font-bold text-white">Pedidos en espera</p>
            </div>
            <span className='text-base text-neutral-400 '>En este dashboard podras visualizar los pedidos que tus clientes hacen por medio de restosbot y el acceso a los chatbots</span>
        </div>
    );
};

type LayoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    return (
        <div className="flex h-screen flex-col w-full">
            <Header />
            <div className='flex-1 flex flex-col w-full text-xs rounded-sm h-96 p-8'>
                {children}
            </div>
        </div>
    );
};

export default Layout;