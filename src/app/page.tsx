'use client'
import { useState } from "react";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { saveUserStorage } from "../lib/localstorage";
import { useRouter } from 'next/navigation'

export default function Page() {
  const [apikey, setApikey] = useState('')
  const router = useRouter()

  const handleSubmit = (e: any) => {
    saveUserStorage({
      openaiApiKey: apikey
    })
    router.push("/chatbot/create")
  }
  return (
    <div className="p-20 flex flex-col items-center">
      <div className="flex flex-col items-center py-10 bg-black/50 w-2/3 shadow-md border border-white rounded-xl space-x-4">
        <p className="text-3xl py-6 font-bold text-lime-700">Registro Modelo IA</p>
        <div className=' text-sm'>
          <p className="text-white text-xl p-4">Para usar Restobot, deberás registrar una API KEY de OpenIA. Esta API KEY no se guarda en ninguna base de datos, solo de forma local en el navegador de tu computadora.</p>
          <div className="flex flex-col items-center gap-4 m-4">
            <TextInput
              className="bg-transparent text-white w-2/3"
              placeholder='OpenAI API KEY'
              value={apikey}
              onChange={(e) => setApikey(e.target.value)}
            />
            <PrimaryButton className='w-56' disabled={apikey === ''} onClick={handleSubmit}>REGISTRAR APIKEY</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
