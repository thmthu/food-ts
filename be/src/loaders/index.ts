import ORMLoader from './orm'
import expressLoader from './express'
import { DishSchema, RestaurantSchema, FeaturedSchema } from '../entity';
import dependencyInjector from './dependencyInjector'
import Container from 'typedi';
import { DataSource } from 'typeorm';
export default async ({ expressApp }) => {
    const ORMConnection = await ORMLoader();
    Container.set(DataSource, ORMConnection)

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
    await dependencyInjector({ ORMConnection, models: [DishModel, RestaurantModel, FeatureModel] })
    expressLoader({ app: expressApp });

}