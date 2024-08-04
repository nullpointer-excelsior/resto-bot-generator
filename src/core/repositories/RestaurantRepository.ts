import { Restaurant } from "@/core/model/Restaurant";
import { Firestore } from 'firebase-admin/firestore';

export class RestaurantRepository {

    constructor(private readonly db: Firestore) { }

    public async save(restaurant: Restaurant): Promise<void> {
        await this.db.collection('restaurants')
            .doc(restaurant.id)
            .set(restaurant);
    }

    public async findById(id: string): Promise<Restaurant | undefined> {
        const cityRef = this.db.collection('restaurants').doc(id);
        const doc = await cityRef.get();
        if (!doc.exists) {
            return undefined
        } 
        return new Restaurant(doc.id, doc.data()?.name, doc.data()?.menu)
    }
}