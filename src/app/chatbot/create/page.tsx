import CreateChatBot from '@/components/chatbot/create/CreateChatBot';


function SidebarCard() {
  return (
    <div className="flex flex-col items-center space-y-4 px-8 py-32 ">
      <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full mr-4" />
      <p className="text-3xl text-neutral-400 text-center font-bold mb-4">Crea tu RestoBot</p>
      <p className='text-white text-xl text-center'>
      Puedes crear un chatbot basado en el menú de tu restaurante o bar, con el cual tus clientes podrán interactuar y pedir productos.
      </p>
    </div>
  )
}

export default function Page() {//className="bg-black/50 "
  return (
    <div className='p-20'>
      <div className="flex shadow-md ">
        <div className='bg-orange-800 basis-2/5 rounded-s-lg'>
          <SidebarCard />
        </div>
        <div className='bg-black/60 basis-3/5 rounded-e-lg p-10 text-sm'>
          <CreateChatBot />
        </div>
      </div>
    </div>
  );
};
