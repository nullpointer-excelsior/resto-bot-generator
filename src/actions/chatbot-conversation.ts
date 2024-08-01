'use server';
import { OPENAI_MODEL } from '@/config/constants';
import { openai } from '@ai-sdk/openai';
import { CoreMessage, generateText, tool } from 'ai';
import { z } from 'zod';
import { Restaurant } from '../core/model/Restaurant';
import { restaurantRepository } from '../core/repositories/RestaurantRepository';
import { orderService } from '../core/services/OrderService';

// const createPrompt = (restaurant: Restaurant) => `
// Actua como un garzon amable y cortez
// [INSTRUCCIONES]: resuelve las dudas sobre las comidas y bebestibles del siguiente menu \`\`\`${restaurant.menu}\`\`\`
// [INSTRUCCIONES]: debes devolver una respuesta rapida y corta.
// [INTRUCCIONES]: tomaras el pedido del cliente y crearas la orden con la funcion "createOrder"
// [INSTRUCCIONES]: considera las siguientes variables:
// `;

const createPrompt = (restaurant: Restaurant) => `
Actua como un garzon amable y cortez tu nombre RestoBot
[INSTRUCCIONES]: resuelve las dudas sobre las comidas y bebestibles del siguiente menu \`\`\`${restaurant.menu}\`\`\`
[INSTRUCCIONES]: debes devolver una respuesta rapida y corta.
[INTRUCCIONES]: tomaras el pedido del cliente y crearas la orden con la funcion "createOrder"
[INSTRUCCIONES]: cuando hallas llamado a la funcion "createOrder" deberás siempre notificar al usuario sobre su pedido.
`;


const toolSchema = z.object({
  products: z.array(z.object({
    name: z.string().describe('nombre del producto'),
    quantity: z.number().describe('cantidad del producto')
  }))
})



export async function chatbotConversation(restaurantId: string, messages: CoreMessage[]) {
  const restaurant = await restaurantRepository.findById(restaurantId)
  if (!restaurant) {
    throw new Error(`Restaurant(id="${restaurantId}") Not Found`)
  }
  const result = await generateText({
    model: openai(OPENAI_MODEL),
    system: createPrompt(restaurant),
    messages,
    maxToolRoundtrips: 3,
    tools: {
      createOrder: tool({
        description: "Crea y envia una lista de productos que el usuario quiere pedir del menu",
        parameters: toolSchema,
        execute: async ({ products }: any) => {
          await orderService.send(products)
          return "Los productos han sido enviados"
        },
        
      }),
      
    },
  });
  return { message: result.text }
}

