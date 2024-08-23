import express from 'express';
import { login, signup, bill } from '../controllers/userControllers';
import { DishController, RestaurantController, FeaturedController } from '../controllers';
import { Container } from 'typedi';
import ORMConnection from '../loaders/orm'
import { DataSource } from 'typeorm';
import { DishSchema, RestaurantSchema, FeaturedSchema } from '../entity';

const router = express.Router();

async function initializeApp() {
    try {
        const data = await ORMConnection();
        Container.set(DataSource, data);
        const DishModel = {
            name: "DishRepository",
            model: data.getRepository(DishSchema)
        }
        const RestaurantModel = {
            name: "RestaurantRepository",
            model: data.getRepository(RestaurantSchema)
        }
        const FeatureModel = {
            name: "FeatureRepository",
            model: data.getRepository(FeaturedSchema)
        }
        const models = [DishModel, RestaurantModel, FeatureModel]
        models.forEach(m => {
            Container.set(m.name, m.model);
        });
        const feature = Container.get(FeaturedController);
        const restaurant = Container.get(RestaurantController);
        const dish = Container.get(DishController);

        router.get('/restaurants/featured', feature.getAllFeature.bind(feature));
        router.get('/restaurants/restaurant-detail/:id', restaurant.getDataByIdRestaurant.bind(restaurant));
        router.get('/restaurants/featured-restaurants/:id', restaurant.getRestaurantByFeatured.bind(restaurant));
        router.get('/restaurants/restaurant-detail-by-name/:name', restaurant.getRestaurantByName.bind(restaurant));
        router.get('/restaurants/dish-restaurant/:id', dish.getDataByIdRestaurant.bind(dish));

        router.post('/users/login', login);
        router.post('/users/signup', signup);
        router.post('/users/bill', bill);
    } catch (error) {
        console.error('Error initializing DataSource:', error);
    }
}

initializeApp();

export default router;
