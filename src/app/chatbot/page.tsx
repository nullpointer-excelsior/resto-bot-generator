import CreateChatBot from '@/components/chatbot/CreateChatBot';


export default function Page() {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Crear RestoBot</h2>
      <CreateChatBot />
    </div>
  );
};
