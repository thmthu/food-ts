import { Restaurant } from "./Restaurant";
import { Repository } from "typeorm";
export interface IRestaurant {
    repository: Repository<Restaurant>;
    getAll(): Promise<Restaurant[]>;
    getDataById(id: number): Promise<Restaurant>;
    getDataByName(name: string): Promise<Restaurant[]>;
    getDataByFeatured(id: number): Promise<Restaurant[]>;

}