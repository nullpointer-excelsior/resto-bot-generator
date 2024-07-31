"use client";
import { createChatBot, CreateChatBotResponse } from '@/actions/create-chatbot';
import { CircleCheckBig, FileUp } from 'lucide-react';
import { useRef, useState } from 'react';
import PrimaryButton from '../../PrimaryButton';
import TextInput from '../../TextInput';

interface CreateChatBotFormProps {
  onSubmit: (data: FormData) => void;
}

export function CreateChatBotForm({ onSubmit }: CreateChatBotFormProps) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  const [filename, setFilename] = useState('Archivo no seleccionado')

  const disableSubmit = () => {
    const file = fileInput.current?.files?.[0]
    return name === '' || file === undefined
  }

  const handleSubmit = async () => {
    const file = fileInput.current?.files?.[0];
    if (name && file) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('file', file);
      onSubmit(formData);
      cleanForm()
    }
  };

  const cleanForm = () => {
    setName('Archivo no seleccionado');
    setFilename
    if (fileInput.current) {
      fileInput.current.value = ''; // Limpiar el archivo seleccionado
    }
  }

  return (
    <form className="flex w-full flex-col gap-4 text-neutral-300" onSubmit={(e) => e.preventDefault()}>
      <div className='flex items-center space-x-4'>
        <span className='basis-1/5 text-base font-semibold'>Nombre</span>
        <TextInput
          placeholder='Nombre del Chatbot'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <span className='basis-1/5 text-base font-semibold'>Menu</span>
        <label htmlFor="doc">
          <FileUp className='w-10 h-10 hover:cursor-pointer' />
          <input
            id="doc"
            hidden
            type="file"
            name="file"
            ref={fileInput}
            onChange={e => setFilename(fileInput.current?.files?.[0].name || 'Archivo no seleccionado')}
            className="basis-4/5 border border-blue-500 rounded p-2"
          />
        </label>
        <p>{filename}</p>
      </div>
      <div className='flex flex-col my-4 items-center'>
        <PrimaryButton className='w-56' disabled={disableSubmit()} onClick={handleSubmit}>CREAR</PrimaryButton>
      </div>
    </form>
  );
}


function ChatBotInfo({ chatbot }: Readonly<{ chatbot: CreateChatBotResponse }>) {
  return (
    <div className="flex flex-col items-center justify-center p-10 border-neutral-400 border rounded-md">
      <div className="flex items-center space-x-2">
        <CircleCheckBig className='stroke-green-500'  />
        <span className="text-2xl font-medium text-gray-500">Tu chatbot {chatbot.name} esta listo para trabajar!</span>
      </div>
      <a href={`/chat/${chatbot.id}`} target="_blank" className="text-blue-500 text-base hover:underline">Accese a tu chatbot ACÁ</a>
      <a href={`/orders/${chatbot.id}`} target="_blank" className="text-blue-500 text-base hover:underline">Accese a tu los pedidos ACÁ</a>
    </div>
  )
}

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-2">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white text-blue-500" role="output">
        </div>
        <span className="text-lg font-medium text-gray-500">{message}</span>
      </div>
    </div>
  );
};


export default function CreateMenuRestaurant() {

  const [chatbot, setChatbot] = useState<CreateChatBotResponse | null>(null)
  const [loadingChatbot, setLoadingChatbot] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const onSubmit = (formData: FormData) => {
    setLoadingChatbot(true)
    setShowForm(false)
    createChatBot(formData)
      .then(response => setChatbot(response))
      .then(() => setLoadingChatbot(false))
  }

  return (
    <div className='flex justify-center items-center h-96'>
      {showForm && <CreateChatBotForm onSubmit={onSubmit} />}
      {loadingChatbot && <Loading message='Creando chatbot...' />}
      {chatbot && <ChatBotInfo chatbot={chatbot} />}
    </div>
  )
}