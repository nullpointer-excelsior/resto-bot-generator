import Chat from '@/components/chat/Chat'
import { notFound } from 'next/navigation';
import { getRestaurantRepository } from '@/core/ContainerService';

const restaurantRepository = getRestaurantRepository()

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const restaurant = await restaurantRepository.findById(params.id)
  if (!restaurant) {
    notFound()
  }
  return (
    <Chat restaurantId={params.id} />
  )
}
