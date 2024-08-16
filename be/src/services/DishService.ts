import { IDish } from "../interface/IDish";
import { Repository, DataSource } from "typeorm";
import { Dish } from "../interface";
import { DishSchema } from "../entity";

export class DishService implements IDish {
    repository: Repository<Dish>;
    constructor(protected dataSource: DataSource) {
        this.repository = dataSource.getRepository(DishSchema);
    }
    async getDataByIdRestaurant(id: number) {
        return await this.repository.findBy({ restaurant_id: id });
    };
    async getDataByName(name: string): Promise<Dish[]> {
        const restaurants: Dish[] = await this.repository.createQueryBuilder("Restaurants")
            .where("Dishes.name LIKE :name", { name: `%${name}%` })
            .getMany();
        return restaurants
    }
}