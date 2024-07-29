'use client';

import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { chatbotConversation } from '../../actions/chatbot-conversation';
import ChatToolbar from './ChatToolbar';
import PrimaryButton from '../PrimaryButton';
import TextInput from '../TextInput';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


function Message({ message }: Readonly<{ message: CoreMessage }>) {
  const { role, content } = message;
  const bgColor = role === 'user' ? 'bg-blue-300 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl' : 'bg-orange-300 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl';
  const roleName = role === 'user' ? 'User' : 'RestoBot';

  return (
    <div className={`whitespace-pre-wrap p-4 px-8 m-4 text-zinc-700 shadow-md  ${bgColor}`}>
      <p className='font-semibold'>{roleName}</p>
      <p>{content as string}</p>
    </div>
  );
}

export default function Chat({ restaurantId }: Readonly<{ restaurantId: string }>) {
  const [messages, setMessages] = useState<CoreMessage[]>([
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    },
    {
      role: 'assistant',
      content: 'hola soy el asistente'
    },
    {
      role: 'user',
      content: 'hola soy el usuario'
    },
    {
      role: 'assistant',
      content: 'Los enanos no me simpatizan, son codiciosos y no respetan la vida ajena, Pero a los orcos los odio mas. ¿Que necesitan?'
    }, {
      role: 'user',
      content: "Potatatos smashed"
    }
  ]);
  const [input, setInput] = useState('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessages: CoreMessage[] = [
      ...messages,
      { content: input, role: 'user' },
    ];

    setMessages(newMessages);
    setInput('');

    const result = await chatbotConversation(restaurantId, newMessages);

    for await (const content of readStreamableValue(result.message)) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: content as string,
        },
      ]);
    }
  }

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-screen flex flex-col justify-between">

      <div className='h-1/8'>
        <ChatToolbar/>
      </div>

      <div className="h-4/8 min-h-4/8 overflow-auto scroll-smooth">
        <div className='flex flex-col bg-gray-300'>
          {messages.map((m, i) => <Message message={m} key={i} />)}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="h-1/8 bg-gray-700">
        <form className="flex flex-row justify-center p-4 space-x-2 " onSubmit={onSubmit}>
          <TextInput value={input} placeholder="Say something..." onChange={e => setInput(e.target.value)} />
          <PrimaryButton>ENVIAR</PrimaryButton>
        </form>
        <div className='text-white  text-center p-6'>
          <p>RestoBot 2024</p>
        </div>
      </div>

    </div>
  );
}