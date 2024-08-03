import Chat from '@/components/chat/Chat'
import { notFound } from 'next/navigation';
import { getRestaurantRepository } from '@/core/ContainerService';

const restaurantRepository = getRestaurantRepository()

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  const restaurant = await restaurantRepository.findById(params.id)
  if (!restaurant) {
    notFound()
  }
  // return (
  //   <div className="p-4 max-w-screen-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
  //     <p className="text-2xl font-bold text-gray-900">Resto-bot</p>
  //     <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
  //       {JSON.stringify(restaurant, null, 2)}
  //     </pre>
  //     <div className="h-4/5 mt-4">
  //       <Chat restaurantId={params.id} />
  //     </div>
  //   </div>
  // )

  return (
    <Chat restaurantId={params.id} />
  )
}
