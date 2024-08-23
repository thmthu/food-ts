import { IDish } from "../interface/IDish";
import { Repository, DataSource } from "typeorm";
import { Dish } from "../interface";
import { DishSchema } from "../entity";
import { Service, Inject } from "typedi";

@Service()
class DishService implements IDish {
    constructor(
        @Inject(() => DataSource) private dataSource: DataSource,
        @Inject('DishRepository') private repository: Repository<Dish>
    ) { }


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
export { DishService }