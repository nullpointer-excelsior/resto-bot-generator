"use client";
import { createChatBot, CreateChatBotResponse } from '@/actions/create-chatbot';
import { useRef, useState } from 'react';

type OnSubmit = (form: FormData) => void

function CreateChatBotForm({ onSubmit }: Readonly<{ onSubmit: OnSubmit }>) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      
      <div className='flex space-x-4'>
        <span className='font-semibold'>Name</span>
        <input className='border' type="text" placeholder='Nombre del chatbot' name="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className='flex space-x-4'>
        <span className='basis-1/3 font-semibold'>Upload Menu</span>
        <input type="file" name="file" ref={fileInput} />
      </div>
   
      <button disabled={name === ''} className="w-96 bg-red-700 text-neutral-300 rounded-md disabled:bg-red-900" type="submit">
        Submit
      </button>

    </form>
  );
}


function ChatBotInfo({ chatbot }: Readonly<{ chatbot: CreateChatBotResponse }>) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-gray-200">
      <p className="text-xl font-bold mb-2">{chatbot.name}</p>
      <a 
        href={chatbot.chatbotUrl} 
        target="_blank" 
        className="text-blue-500 hover:underline"
      >
        Go to Chatbot
      </a>
    </div>
  )
}


export default function CreateMenuRestaurant() {

  const [chatbot, setChatbot] = useState<CreateChatBotResponse | null>(null)

  const onSubmit = (formData: FormData) => createChatBot(formData)
    .then(response => setChatbot(response))

  return (
    <div className='space-y-4'>
      <CreateChatBotForm onSubmit={onSubmit} />
      {chatbot && <ChatBotInfo chatbot={chatbot} />}
    </div>
  );
}