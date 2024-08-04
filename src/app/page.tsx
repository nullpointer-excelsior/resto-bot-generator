'use client'
import { useState } from "react";
import TextInput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";


export default function Page() {
  const [name, setName] = useState('')
  const handleSubmit = (e: any) => {

  }
  return (
    <div className="p-20 flex flex-col items-center">
      <div className="flex flex-col items-center py-10 bg-black/50 w-2/3 shadow-md border border-white rounded-xl space-x-4">
        <p className="text-3xl py-6 font-bold text-lime-700">Registro Modelo IA</p>
        <div className=' text-sm'>
          <p className="text-white text-xl p-4">Para usar Restobot deberás registrar una APIKEY de Openia . esta apikey NO se guarda en ninguna base de datossolo deforma local en el navegador de tu computador</p>
          <div className="flex flex-col items-center gap-4 m-4">
            <TextInput
              className="bg-transparent text-white w-2/3"
              placeholder='OpenAI API KEY'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <PrimaryButton className='w-56' disabled={name === ''} onClick={handleSubmit}>REGISTRAR APIKEY</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
