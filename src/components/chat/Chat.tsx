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

function MessageIndicatorUser() {
  return (
    <div className="flex flex-row-reverse">
      <div className={`w-0 h-0 border-l-[0px] border-r-[25px] border-b-[20px] border-transparent border-b-lime-800 transform rotate-180`}></div>
    </div>
  )
}

function MessageIndicatorChatbot() {
  return (
    <div className="flex flex-row">
      <div className={`w-0 h-0 border-l-[25px] border-r-[0px] border-b-[20px] border-transparent border-b-gray-800 transform rotate-180`}></div>
    </div>
  )
}

function Message({ message }: Readonly<{ message: CoreMessage }>) {
  const { role, content } = message;
  const roleName = role === 'user' ? 'User' : 'RestoBot';
  const messageCssClasses = role === 'user' ? 'bg-lime-800 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-end' : 'bg-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl ';
  const messageDirectionFlexClass = role === 'user' ? 'flex-row-reverse' : 'flex-row';

  return (
    <div className={`flex ${messageDirectionFlexClass}`}>
      <div className='w-4/5 m-4'>
        <div className={`whitespace-pre-wrap p-4 px-8  text-neutral-300 shadow-md  ${messageCssClasses}`}>
          <p className='text-xl font-semibold text-cyan-500'>{roleName}</p>
          <p>{content as string}</p>
        </div>
        { role === 'user' ? <MessageIndicatorUser/>: <MessageIndicatorChatbot />}
      </div>
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
        <ChatToolbar />
      </div>

      <div className="h-4/8 min-h-4/8 overflow-auto scroll-smooth">
        <div className='flex flex-col bg-fixed' style={{ backgroundImage: "url(/img/bg.webp)" }}>
          <div className='bg-black/60'>
            {messages.map((m, i) => <Message message={m} key={i} />)}
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="h-1/8 bg-orange-800">
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