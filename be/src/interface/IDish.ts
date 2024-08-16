import { Dish } from "./Dish";
export interface IDish {
    getDataByIdRestaurant(id: number): Promise<Dish[]>;
    getDataByName(name: string): Promise<Dish[]>;

}