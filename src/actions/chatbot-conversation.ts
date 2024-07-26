'use server';
import { OPENAI_MODEL } from '@/config/constants';
import { openai } from '@ai-sdk/openai';
import { CoreMessage, streamText } from 'ai';
import { createStreamableValue } from 'ai/rsc';
import { Restaurant } from '../core/model/Restaurant';
import { restaurantRepository } from '../core/repositories/RestaurantRepository';

// const createPrompt = (restaurant: Restaurant) => `
// Actua como un garzon amable y cortez
// [INSTRUCCIONES]: resuelve las dudas sobre las comidas y bebestibles del siguiente menu \`\`\`${restaurant.menu}\`\`\`
// [INSTRUCCIONES]: debes devolver una respuesta rapida y corta.
// [INTRUCCIONES]: tomaras el pedido del cliente y crearas la orden con la funcion "createOrder"
// [INSTRUCCIONES]: considera las siguientes variables:
// `;

const createPrompt = (restaurant: Restaurant) => `
Actua como un garzon amable y cortez
[INSTRUCCIONES]: resuelve las dudas sobre las comidas y bebestibles del siguiente menu \`\`\`${restaurant.menu}\`\`\`
[INSTRUCCIONES]: debes devolver una respuesta rapida y corta.
`;



export async function chatbotConversation(restaurantId: string, messages: CoreMessage[]) {
  const restaurant = await restaurantRepository.findById(restaurantId)
  if (!restaurant) {
    throw new Error(`Restaurant(id="${restaurantId}") Not Found`)
  }
  const result = await streamText({
    model: openai(OPENAI_MODEL),
    system: createPrompt(restaurant),
    messages,
});
const stream = createStreamableValue(result.textStream);
return { message: stream.value };
}