import { BotMessageSquare } from 'lucide-react';
import React from 'react'

interface ChatbotItemProps {
  tableNumber: number;
  url: string;
}

const ChatbotItem: React.FC<ChatbotItemProps> = ({ tableNumber, url }) => {
  return (
    <div className="flex flex-col justify-between items-start bg-gray-800 p-8 rounded-md shadow-md space-y-4">
      <div className='flex items-center space-x-2'>
        <BotMessageSquare className='w-10 h-10 stroke-neutral-400' />
        <p className='text-2xl text-neutral-400 font-semibold'>Mesa {tableNumber}</p>
      </div>
      <a href={url} target='_blank' className='text-blue-600'>{url}</a>
    </div>
  );
};

const chatbotItems: ChatbotItemProps[] = [
  { tableNumber: 1, url: 'https://example.com/chatbot1' },
  { tableNumber: 2, url: 'https://example.com/chatbot2' },
  { tableNumber: 3, url: 'https://example.com/chatbot3' },
  { tableNumber: 4, url: 'https://example.com/chatbot4' },
  { tableNumber: 5, url: 'https://example.com/chatbot5' },
  { tableNumber: 6, url: 'https://example.com/chatbot6' },
  { tableNumber: 7, url: 'https://example.com/chatbot7' },
  { tableNumber: 8, url: 'https://example.com/chatbot8' },
  { tableNumber: 9, url: 'https://example.com/chatbot9' },
  { tableNumber: 10, url: 'https://example.com/chatbot10' }
];

export default function Page() {
  return (
    <div className="p-6 overflow-y-auto w-full grid grid-cols-3 gap-4">
      {chatbotItems.map(c => <ChatbotItem key={c.tableNumber} tableNumber={c.tableNumber} url={c.url} />)}
    </div>
  )
}
