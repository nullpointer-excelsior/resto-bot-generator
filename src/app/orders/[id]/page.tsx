import React from 'react'
import { getRestaurantRepository } from '@/core/ContainerService';
import OrdersPending from '@/components/orders/OrdersPending';

const restaurantRepository = getRestaurantRepository()


export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const chatbot = await restaurantRepository.findById(params.id)
  if (!chatbot) {
    return <p>Chatbot no encontrado</p>
  }
  return (
    <OrdersPending chatbot={chatbot.id} />
  )
}
