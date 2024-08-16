import { Restaurant } from "./Restaurant";
export interface Dish {
    id: number;
    name: string;
    description: string;
    price?: number;
    image: string;
    restaurant_id?: number;
    restaurant?: Restaurant;
}
