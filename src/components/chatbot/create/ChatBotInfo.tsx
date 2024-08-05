import { CircleCheckBig } from "lucide-react";
import { Restaurant } from "@/core/model/Restaurant";

export type CreateChatBotResponse = Restaurant & {
    chatbotUrl: string
}

export default function ChatBotInfo({ chatbot }: Readonly<{ chatbot: CreateChatBotResponse }>) {
    return (
        <div className="flex flex-col items-center justify-center p-10 border-neutral-400 border rounded-md">
            <div className="flex items-center space-x-2">
                <CircleCheckBig className='stroke-green-500' />
                <span className="text-2xl font-medium text-gray-500">Tu chatbot {chatbot.name} esta listo para trabajar!</span>
            </div>
            <a href={`/chat/${chatbot.id}`} target="_blank" className="text-blue-500 text-base hover:underline">Accese a tu chatbot ACÁ</a>
            <a href={`/orders/${chatbot.id}`} target="_blank" className="text-blue-500 text-base hover:underline">Accese a tu los pedidos ACÁ</a>
        </div>
    )
}