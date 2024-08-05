"use client";
import { createChatBot } from '@/actions/create-chatbot';
import useValidateOpenAiApiKey from '@/app/hooks/useValidateOpenAiApiKey';
import { getUserStorage } from '@/lib/localstorage';
import { FileUp } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from '../../PrimaryButton';
import TextInput from '../../TextInput';
import ChatBotInfo, { CreateChatBotResponse } from './ChatBotInfo';
import Loading from './Loading';
import TryMenus from './TryMenus';

interface CreateChatBotFormProps {
  onSubmit: (data: FormData) => void;
}

export function CreateChatBotForm({ onSubmit }: Readonly<CreateChatBotFormProps>) {

  const optionMenus = [
    {
      imgSrc: "/menus/cervecitas.jpg",
      description: "Cervezas"
    },
    {
      imgSrc: "/menus/almuerzos.jpg",
      description: "Almuerzos"
    },
    {
      imgSrc: "/menus/mexicana.jpg",
      description: "Mexicana"
    }
  ]
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
      const storage = getUserStorage()
      const formData = new FormData();
      formData.append('apikey', storage.openaiApiKey);
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

  const onChangeTryMenu = async (img: string) => {
    try {
      const response = await fetch(img);
      const blob = await response.blob();
      const file = new File([blob], img.split('/').pop()!, { type: blob.type });
      if (fileInput.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.current.files = dataTransfer.files;
        setFilename(file.name);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }


  return (
    <form className="flex w-full mt-10 flex-col gap-4 text-neutral-300" onSubmit={(e) => e.preventDefault()}>
      <div className='flex items-center space-x-4'>
        <span className='basis-1/5 text-base font-semibold'>Nombre</span>
        <TextInput
          className='bg-transparent text-white'
          placeholder='Nombre del Chatbot'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className='flex items-center space-x-4'>
        <span className='basis-1/5 text-base font-semibold'>Menu</span>
        <label htmlFor="doc" className=' flex items-center space-x-4 hover:cursor-pointer'>
          <FileUp className='w-10 h-10 ' />
          <input
            id="doc"
            hidden
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            name="file"
            ref={fileInput}
            onChange={e => setFilename(fileInput.current?.files?.[0]?.name || 'Archivo no seleccionado')}
            className="basis-4/5 border border-blue-500 rounded p-2"
          />
          <p>{filename}</p>
        </label>
      </div>
      <div className='flex flex-col my-4 items-center'>
        <PrimaryButton className='w-56' disabled={disableSubmit()} onClick={handleSubmit}>CREAR</PrimaryButton>
      </div>
      <div className='py-10'>
        <TryMenus onChange={onChangeTryMenu} options={optionMenus} />
      </div>
    </form>
  );
}



export default function CreateMenuRestaurant() {

  const [chatbot, setChatbot] = useState<CreateChatBotResponse | null>(null)
  const [loadingChatbot, setLoadingChatbot] = useState(false)
  const [showForm, setShowForm] = useState(true)
  useValidateOpenAiApiKey()

  const onSubmit = (formData: FormData) => {

    setLoadingChatbot(true)
    setShowForm(false)
    createChatBot(formData)
      .then(response => {
        setChatbot(response)
        setShowForm(false)
      })
      .catch(e => {
        toast.error(`Ups!!: ${e.message}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setShowForm(true)
      })
      .finally(() => {
        setLoadingChatbot(false)
      })
  }

  return (
    <>
      <div className='flex justify-center items-center flex-col content-center h-full'>
        {showForm && <CreateChatBotForm onSubmit={onSubmit} />}
        {loadingChatbot && <Loading message='Creando chatbot...' />}
        {chatbot && <ChatBotInfo chatbot={chatbot} />}
      </div>
      <ToastContainer />
    </>
  )
}