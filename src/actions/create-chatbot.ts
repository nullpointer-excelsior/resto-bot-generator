'use server'

import { randomUUID } from "crypto";
import { restaurantRepository } from "@/core/repositories/RestaurantRepository";
import { Restaurant } from "../core/model/Restaurant";
import { CHAT_HOST_URL } from "../config/constants";

const OPENAI_FAKE_RESPONSE_TEXT = `
# LA CANTINA

## THE MENU

### BREAKFAST PLATES

- **Chilaquiles** - $9.99
  Red, Green or Chipotle Sauce with Corn Chips, Onions, Sour Cream & shredded Cheese.

- **Huevos Rancheros** - $15.99
  Two Eggs over medium on a Corn Tortilla smothered in Salsa Ranchera.

- **Bistec Ranchero** - $17.99
  Angus Steak & two Eggs over medium smothered in Salsa Ranchera.

- **Hand-Held** - $11.99
  Your choice of Chorizo, Machaca, Bacon, Ham or Potato with eggs in a hand-held burrito.

- **Monster Breakfast** - $19.99
  Crispy Bacon, grilled Ham & scrambled Eggs with seasoned Potatoes & shredded Cheese.

- **Monster Chorizo** - $12.99
  Beef Chorizo & scrambled Eggs with refried Beans, seasoned Potatoes & shredded Cheese.

- **Monster Papas** - $17.99
  Scrambled Eggs with refried Beans, seasoned Potatoes & shredded Cheese.

- **Steak & Eggs** - $5.99
  Angus Steak & scrambled Eggs with fresh Guacamole, seasoned Potatoes & shredded Cheese.
`


async function fakeRequestModel(image: string) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
        text: OPENAI_FAKE_RESPONSE_TEXT
    }
}

async function image2Base64(data: FormData) {
    const file: File | null = data.get('file') as unknown as File;
    if (!file) throw new Error('No file uploaded');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    return buffer.toString('base64');
}

function generateChatbotUrl(restaurant: Restaurant) {
    return CHAT_HOST_URL + `/${restaurant.id}`
}

export type CreateChatBotResponse = Restaurant & {
    chatbotUrl: string
}

export async function createChatBot(formData: FormData): Promise<CreateChatBotResponse> {
    
    const b64Image = await image2Base64(formData)

    const result = await fakeRequestModel(b64Image)
    
    const restaurant = {
      id: randomUUID(),
      name: formData.get('name') as string,
      menu: result.text,
    }
    await restaurantRepository.save(restaurant)

    return { 
        chatbotUrl: generateChatbotUrl(restaurant),
        ...restaurant
     };

}