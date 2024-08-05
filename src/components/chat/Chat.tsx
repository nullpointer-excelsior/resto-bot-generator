'use client';

import Message from '@/components/chat/Message';
import { type CoreMessage } from 'ai';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { chatbotConversation } from '@/actions/chatbot-conversation';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';
import ChatToolbar from './ChatToolbar';
import useValidateOpenAiApiKey from '@/app/hooks/useValidateOpenAiApiKey';
import { getUserStorage } from '@/lib/localstorage';
import { TypingMessage } from './TypingMessage';




function Typing() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        if (prevDots.length < 3) {
          return prevDots + '.';
        } else {
          return '';
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);
  return (
    <p className='text-2xl text-lime-600 font-semibold bg-black/60 p-2'>
      Restobot está pensando{dots}
    </p>
  );
};

export default function Chat({ restaurantId }: Readonly<{ restaurantId: string }>) {
  const [messages, setMessages] = useState<CoreMessage[]>([
    {
      role: 'assistant',
      content: 'Hola, soy RestoBot. ¿En qué puedo ayudarte?'
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false)
  useValidateOpenAiApiKey()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTyping(true)
    const apikey = getUserStorage().openaiApiKey
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: 'user' },
    ];

    setMessages(newMessages);
    setInput('');

    const result = await chatbotConversation(apikey, restaurantId, newMessages);
    setTyping(false)
    setMessages([
      ...newMessages,
      {
        role: 'assistant',
        content: result.message,
      },
    ]);

  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className='bg-fixed h-screen'>
      <div className="h-screen flex flex-col justify-between" >
        <div className='h-1/8'>
          <ChatToolbar />
        </div>

        <div className="h-4/8 min-h-4/8 overflow-auto scroll-smooth" >
          <div className='flex flex-col' >
            {messages.map((m, i) => <Message message={m} key={i} />)}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {typing && <TypingMessage />}

        <div className="h-1/8 bg-orange-800">
          <form className="flex flex-row justify-center p-4 space-x-2 " onSubmit={onSubmit}>
            <TextInput value={input} placeholder="Pide algo delicioso..." onChange={e => setInput(e.target.value)} />
            <PrimaryButton disabled={input === ''} onClick={(e: any) => onSubmit(e)} >ENVIAR</PrimaryButton>
          </form>
          <div className='text-white  text-center p-6'>
            <p>RestoBot {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}