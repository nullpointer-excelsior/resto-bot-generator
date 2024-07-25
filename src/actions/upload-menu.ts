'use server';
import { OPENAI_MODEL } from '@/config/constants';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { randomUUID } from 'crypto';
import { restaurantService } from '../core/services/RestaurantService';



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

async function requestModel(image: string) {
    return await generateText({
        model: openai(OPENAI_MODEL),
        messages: [
          {
            content: [
              { type: 'text', text: 'Del siguiente contenido extrae todo el texto y descripciones en formato markdown' },
              {
                type: 'image',
                image: image,
              },
            ],
            role: 'user'
          }
        ]
      });
}

async function fakeRequestModel(image: string) {
    return {
        text: OPENAI_FAKE_RESPONSE_TEXT
    }
}

export async function uploadMenu(data: FormData) {
    const file: File | null = data.get('file') as unknown as File;
    if (!file) throw new Error('No file uploaded');
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString('base64');
    console.log(`Base64 representation: `, data);
  
    const result = await fakeRequestModel(base64)
    const restaurant = {
      id: randomUUID(),
      name: data.get('name') as string,
      menu: result.text,
    }
    await restaurantService.save(restaurant)
    return { message: 'ok', data: restaurant };
  }