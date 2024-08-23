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
    async createOneDish({ id, name, description, price, image, restaurant_id }) {
        const dish = this.repository.create({
            id,
            name,
            description,
            price,
            image,
            restaurant_id
        });
        await this.repository.save(dish);
    }
    async getAllDish(): Promise<Dish[]> {
        return await this.repository.find();
    }
    deleteById(id: number) {
        this.repository.delete(id)
    }
    async getDataById(id: number): Promise<Dish | undefined> {
        return await this.repository.findOne({ where: { id } });
    }
    async updateById(id: number, data: Partial<Dish>) {
        await this.repository.update(id, data);


    }
}
export { DishService }