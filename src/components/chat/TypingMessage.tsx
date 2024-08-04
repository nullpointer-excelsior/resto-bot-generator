import { useEffect, useState } from "react";

export function TypingMessage() {
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
      <div className={`flex flex-row`}>
        <div className='w-4/5 m-4'>
          <div className={`whitespace-pre-wrap p-4 px-8  text-neutral-300 shadow-md  bg-gray-800 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl `}>
            <p className='text-xl font-semibold text-cyan-500'>ChatBot</p>
            <p className='text-lime-600 font-semibold'>Escribiendo{dots}</p>
          </div>
          <div className="flex flex-row">
            <div className={`w-0 h-0 border-l-[25px] border-r-[0px] border-b-[20px] border-transparent border-b-gray-800 transform rotate-180`}></div>
          </div>
        </div>
      </div>
    );
  }