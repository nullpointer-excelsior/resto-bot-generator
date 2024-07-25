import { restaurantRepository } from '@/core/repositories/RestaurantRepository'

export default async function page({ params }: { params: { id: string } }) {
  const restaurant = await restaurantRepository.findById(params.id)
  return (
    <>
      <p>resto-bot</p>
      <pre>
        {JSON.stringify(restaurant, null, 2)}
      </pre>
    </>
  )
}
