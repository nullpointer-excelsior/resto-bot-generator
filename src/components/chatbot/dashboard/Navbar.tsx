'use client'

import { BellDot, Bot } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useEffect, useState } from 'react'

const NAVBAR_SELECTED_CLASS = 'bg-red-950 text-neutral-400'
const NAVBAR_UNSELECTED_CLASS = 'text-white'

export default function Navbar() {
    
    const segment = useSelectedLayoutSegment('dashboard')
    const [colorLinkOrders, setColorLinkOrders] = useState(segment === 'orders' ? NAVBAR_SELECTED_CLASS : NAVBAR_UNSELECTED_CLASS)
    const [colorLinkChatbots, setColorLinkChatbots] = useState(segment === 'chatbots' ? NAVBAR_SELECTED_CLASS : NAVBAR_UNSELECTED_CLASS)
    
    useEffect(() => {
        setColorLinkChatbots(segment === 'chatbots' ? NAVBAR_SELECTED_CLASS : NAVBAR_UNSELECTED_CLASS)
        setColorLinkOrders(segment === 'orders' ? NAVBAR_SELECTED_CLASS : NAVBAR_UNSELECTED_CLASS)
    }, [segment])

    return (
            <nav className="flex-1 m-8 w-full">
                <ul className="">
                    <li className={`${colorLinkChatbots} py-4 px-6`}>
                        <Link className="group flex items-center space-x-2 " href="/chatbot/dashboard/chatbots">
                            <Bot className='stroke-white group-hover:stroke-neutral-400' />
                            <p className="group-hover:text-neutral-400 ">Chatbots</p>
                        </Link>
                    </li>
                    <li className={`${colorLinkOrders} py-4 px-6`}>
                        <Link className="group flex items-center space-x-2" href="/chatbot/dashboard/orders">
                            <BellDot className='stroke-white group-hover:stroke-neutral-400' />
                            <p className="group-hover:text-neutral-400">Pedidos en espera</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        )
}