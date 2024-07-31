import CreateChatBot from '@/components/chatbot/create/CreateChatBot';


function SidebarCard() {
  return (
    <div className="flex flex-col items-center space-y-4 px-8 py-32 ">
      <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full mr-4" />
      <p className="text-xl text-neutral-400 text-center font-bold mb-4">Crea un chatbot  facil</p>
      <p className='text-white text-sm'>Puedes crear un chatbot basado en el menu de tu restaurant o bar con el cual tus clientes podran interactuar y pedir productos</p>
    </div>
  )
}

export default function Page() {
  return (
      <div className="flex m-20 shadow-md">
        <div className='bg-orange-900 basis-2/5 rounded-s-lg'>
          <SidebarCard />
        </div>
        <div className='bg-gray-800 basis-3/5 rounded-e-lg p-10 text-sm'>
          <CreateChatBot />
        </div>
      </div>
  );
};
