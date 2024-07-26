import React from 'react'

export default function ChatbotToolbar() {
  return (
    <div className="flex items-center justify-between bg-gray-700 p-4"> 
    <div className="flex items-center">
      <img src="/img/chatbot-avatar.webp" alt="Avatar" className="w-24 h-24 rounded-full mr-4"/>
      <div>
        <h1 className="text-white font-bold text-lg">Resto Chat</h1>
        <p className="text-gray-400 text-sm">Asistente IA de Restaurant</p>
      </div>
    </div>
  </div>
  )
}
