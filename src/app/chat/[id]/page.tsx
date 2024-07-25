import React from 'react'
import { restaurantService } from '@/core/services/RestaurantService'

export default async function page({ params }: { params: { id: string } }) {
  const restaurant = await restaurantService.findById(params.id)
  return (
    <>
      <p>resto-bot</p>
      <p>
        {JSON.stringify(restaurant, null, 2)}
      </p>
    </>
  )
}
