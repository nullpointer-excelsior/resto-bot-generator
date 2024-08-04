'use server'

import { randomUUID } from "crypto";
import { Restaurant } from "../core/model/Restaurant";
import { getRestaurantRepository } from "@/core/ContainerService";
import { generateText } from "ai";
// import { openai } from "@ai-sdk/openai";
import { OPENAI_MODEL } from "../config/constants";
import { createOpenAI } from '@ai-sdk/openai';



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

const restaurantRepository = getRestaurantRepository()

async function fakeRequestModel(image: string) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    text: OPENAI_FAKE_RESPONSE_TEXT
  }
}

async function requestModel({ base64, apikey }: { base64: string, apikey: string }) {
  const openaiModel = createOpenAI({
    apiKey: apikey,
    compatibility: 'strict', // strict mode, enable when using the OpenAI API
  });
  const result = await generateText({
    model: openaiModel(OPENAI_MODEL),
    messages: [
      {
        content: [
          { type: 'text', text: 'Dame todo el contenido del menu de forma descriptiva' },
          {
            type: 'image',
            image: base64,
          },
        ],
        role: 'user'
      }
    ]
  });
  return result
}

async function image2Base64(data: FormData) {
  const file: File | null = data.get('file') as unknown as File;
  if (!file) throw new Error('No file uploaded');
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  return buffer.toString('base64');
}

function generateChatbotUrl(restaurant: Restaurant) {
  return process.env.CHAT_HOST_URL + `/${restaurant.id}`
}

export type CreateChatBotResponse = Restaurant & {
  chatbotUrl: string
}

export async function createChatBot(formData: FormData): Promise<CreateChatBotResponse> {

  const b64Image = await image2Base64(formData)
  const apikey = formData.get('apikey')
  if (!apikey) {
    throw new Error('Openai Apikey not defined!')
  }

  const result = await requestModel({ base64: b64Image, apikey: apikey as string })

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