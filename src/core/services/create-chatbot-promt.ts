import { Restaurant } from "@/core/model/Restaurant";

export default function createChatBotPrompt(restaurant: Restaurant) {
    const prompt = `
    Eres un util assitente llamado ${restaurant.name} de mesa que responderas los pedidos de los clientes en base al siguiente menu:
    ${restaurant.menu}
    `
}