import { DataSource, Entity, EntityTarget, Repository, FindOptionsWhere } from "typeorm";
import { DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';
import { Dish, Featured, Restaurant } from '../interface';
import { IRepository } from '../interface/IRepository'
import { Service } from 'typedi';
import { AppDataSourceSingleton } from "../class-models/AppDataSourceSingleton";

///raw test for 3 option

//Dùng template vì cả 3 đều có logic method giống nhau
class templateService<T> implements IRepository<T> {
    repository: Repository<T>;
    constructor(protected dataSource: DataSource, protected entityName: EntityTarget<T>) {
        console.log("constructor template")
        this.repository = dataSource.getRepository(entityName);
    }
    async getAll() {
        console.log("constructor getalll")
        return await this.repository.find();
    };
    async getDataById(idFind: number) {
        return await this.repository.findOneBy({ ['id' as keyof T]: idFind } as FindOptionsWhere<T>);

    };
    async getDataByName(name: string) {
        const entityMetadata = this.dataSource.getMetadata(this.entityName);
        const tableName = entityMetadata.tableName;
        const featured: T[] = await this.repository.createQueryBuilder(`${tableName}`)
            .where(`${tableName}.name LIKE :name`, { name: `%${name}%` })
            .getMany();
        return featured
    };

}



///Chia làm 3 service
class featuredService implements IRepository<Featured> {
    repository: Repository<Featured>;
    constructor(protected dataSource: DataSource) {
        this.repository = dataSource.getRepository(FeaturedSchema);
    }
    async getAll() {
        return await this.repository.find();
    };
    async getDataById(idFind: number) {
        return await this.repository.findOneBy({ id: idFind });

    };
    async getDataByName(name: string) {
        const featured: Featured[] = await this.repository.createQueryBuilder("Featured")
            .where("Featured.name LIKE :name", { name: `%${name}%` })
            .getMany();
        return featured
    };
}

class restaurantService implements IRepository<Restaurant> {
    repository: Repository<Restaurant>;
    constructor(protected dataSource: DataSource) {
        this.repository = dataSource.getRepository(RestaurantSchema);
    }
    async getAll() {
        return await this.repository.find();
    };
    async getDataById(idFind: number) {
        return await this.repository.findOneBy({ id: idFind });

    };
    async getDataByName(name: string) {
        const restaurants: Restaurant[] = await this.repository.createQueryBuilder("Restaurants")
            .where("Restaurants.name LIKE :name", { name: `%${name}%` })
            .getMany();
        return restaurants
    };


}
class dishService implements IRepository<Dish> {
    repository: Repository<Dish>;
    constructor(protected dataSource: DataSource) {
        this.repository = dataSource.getRepository(DishSchema);
    }
    async getAll() {
        return await this.repository.find();
    };
    async getDataById(idFind: number) {
        return await this.repository.findOneBy({ id: idFind });

    };
    async getDataByName(name: string) {
        const restaurants: Dish[] = await this.repository.createQueryBuilder("Dishes")
            .where("Dishes.name LIKE :name", { name: `%${name}%` })
            .getMany();
        return restaurants
    };

}
export { templateService, IRepository, featuredService, restaurantService, dishService };



///Cách dùng inheritance => class base có 1 repo chung, không cần phải define những hàm không dùng (ví dụ class dish chỉ cần 1 getAll)

// class IRepository<T> {
//     protected repository: Repository<T>;
//     constructor(protected dataSource: DataSource, entity: EntityTarget<T>) {
//         this.repository = dataSource.getRepository(entity);
//     }
//     getAll(): Promise<T[]> {
//         return this.repository.find();
//     }
//     getById(myId: number): Promise<T | null> {
//         return this.repository.findOneBy({ id: myId });
//     }


// }
// class featuredService extends IRepository<Feature> {
//     constructor(dataSource: DataSource) {
//         super(dataSource, FeaturedSchema);
//     }

// }

// class restaurantService extends IRepository<Restaurant> {
//     constructor(dataSource: DataSource) {
//         super(dataSource, RestaurantSchema);
//         this.repository = this.dataSource.getRepository(RestaurantSchema);
//     }

//     async getById(restaurantId: number) {
//         return await this.repository.findOneBy({ id: restaurantId });
//     }
//     async getdRestaurantsByFeatured(featuredId: number) {
//         return await this.repository.findBy({ featured_id: featuredId });
//     }
//     async getRestaurantsByName() {
//         const restaurants: Restaurant[] = await this.repository.createQueryBuilder("Restaurants")
//             .where("Restaurants.name LIKE :name", { name: `%${name}%` })
//             .getMany();
//         return restaurants
//     }


// }
// class dishService extends IRepository<Dish> {
//     constructor(dataSource: DataSource) {
//         super(dataSource, DishSchema);
//         this.repository = this.dataSource.getRepository(DishSchema);
//     }
//     async getDishesOfRestaurant(restaurantId: number) {
//         return await this.repository.findBy({ restaurant_id: restaurantId });
//     }
// }
// export { IRepository, featuredService, restaurantService, dishService };