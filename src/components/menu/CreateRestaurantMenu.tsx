"use client";
import { uploadMenu } from '@/actions/upload-menu';
import { useRef, useState } from 'react';
import { Restaurant } from '../../core/model/Restaurant';
import { CHAT_HOST_URL } from '../../config/constants';

type OnSubmit = (form: FormData) => void

function CreateRestaurantForm({ onSubmit }: Readonly<{ onSubmit: OnSubmit }>) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState('');
  return (
    <form action={onSubmit} className="flex flex-col gap-4">
      <div>
        <span>Upload menu</span>
        <input type="file" name="file" ref={fileInput} />
      </div>
      <div>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button className="bg-red-700 text-neutral-300" type="submit">
        Submit
      </button>
    </form>
  );
}

function generateChatUrl(restaurant: Restaurant) {
  return CHAT_HOST_URL + `/${restaurant.id}`
}

function RestaurantInfo({restaurant}: Readonly<{ restaurant:  Restaurant }>) {
  return (
    <div>
      <p>{restaurant.id}</p>
      <p>{restaurant.name}</p>
      <a href={generateChatUrl(restaurant)} target='_blank'> Chatbot</a>
      <p>{restaurant.menu}</p>

    </div>
  )
}


export default function CreateMenuRestaurant() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  const onSubmit = (e: FormData) => uploadMenu(e)
      .then(r => setRestaurant(r.data))

  return (
    <>
      <CreateRestaurantForm onSubmit={onSubmit} />
      { restaurant && <RestaurantInfo restaurant={restaurant} />}
    </>
  );
}