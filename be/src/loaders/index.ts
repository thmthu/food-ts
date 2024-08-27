import ORMLoader from './orm'
import dependencyInjector from './dependencyInjector'
import expressLoader from './express'
import { DishSchema, RestaurantSchema, FeaturedSchema, UserSchema } from '../entity';

export default async ({ expressApp }) => {
    const ORMConnection = await ORMLoader();
    // Container.set(DataSource, ORMConnection)

    const DishModel = {
        name: "DishRepository",
        model: ORMConnection.getRepository(DishSchema)
    }
    const RestaurantModel = {
        name: "RestaurantRepository",
        model: ORMConnection.getRepository(RestaurantSchema)
    }
    const FeatureModel = {
        name: "FeatureRepository",
        model: ORMConnection.getRepository(FeaturedSchema)
    }
    const UserModel = {
        name: "UserRepository",
        model: ORMConnection.getRepository(UserSchema)
    }
    await dependencyInjector({ ORMConnection, models: [DishModel, RestaurantModel, FeatureModel, UserModel] })
    expressLoader({ app: expressApp });

}