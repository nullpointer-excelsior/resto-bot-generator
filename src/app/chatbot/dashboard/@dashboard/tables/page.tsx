import React from 'react'

interface ChatbotItemProps {
  tableNumber: number;
  url: string;
}

const ChatbotItem: React.FC<ChatbotItemProps> = ({ tableNumber, url }) => {
  return (
    <div className="flex flex-col justify-between items-start p-4 mb-4">
      <p className='text-xl font-semibold'>Mesa {tableNumber}</p>
      <a href={url} target='_blank'>{url}</a>
    </div>
  );
};

const chatbotItems: ChatbotItemProps[] = [
  { tableNumber: 1, url: 'https://example.com/chatbot1' },
  // { tableNumber: 2, url: 'https://example.com/chatbot2' },
  // { tableNumber: 3, url: 'https://example.com/chatbot3' },
  // { tableNumber: 4, url: 'https://example.com/chatbot4' },
  // { tableNumber: 5, url: 'https://example.com/chatbot5' },
  // { tableNumber: 6, url: 'https://example.com/chatbot6' },
  // { tableNumber: 7, url: 'https://example.com/chatbot7' },
  // { tableNumber: 8, url: 'https://example.com/chatbot8' },
  // { tableNumber: 9, url: 'https://example.com/chatbot9' },
  // { tableNumber: 10, url: 'https://example.com/chatbot10' }
];

export default function Page() {
  return (
    <div className='flex-1 flex flex-col w-full border border-white rounded-sm h-48'>
      <div className="p-6 overflow-y-auto w-full">
        {chatbotItems.map(c => <ChatbotItem key={c.tableNumber} tableNumber={c.tableNumber} url={c.url} />)}
      </div>
    </div>
  )
}
