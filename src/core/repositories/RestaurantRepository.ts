import { promises as fs } from 'fs';
import { Restaurant } from "@/core/model/Restaurant";

export class RestaurantRepository {
    private readonly filePath = './restaurants.json';

    constructor() {
        console.log("RestaurantService started.");
    }

    private async readFromFile(): Promise<Record<string, Restaurant>> {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                // File doesn't exist, return an empty object
                return {};
            } else {
                console.error("Error reading data from file:", error);
                throw error;
            }
        }
    }

    private async writeToFile(data: Record<string, Restaurant>): Promise<void> {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf8');
            console.log("Data saved to file.");
        } catch (error) {
            console.error("Error saving data to file:", error);
            throw error;
        }
    }

    public async save(restaurant: Restaurant): Promise<void> {
        const data = await this.readFromFile();
        data[restaurant.id] = restaurant;
        await this.writeToFile(data);
    }

    public async findById(id: string): Promise<Restaurant | undefined> {
        const data = await this.readFromFile();
        return data[id];
    }
}

// Ejemplo de uso:
export const restaurantRepository = new RestaurantRepository();
