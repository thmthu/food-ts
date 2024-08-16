import express from 'express';
import { login, signup, bill } from '../controllers/userControllers';
import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { DataSource } from 'typeorm';
import { Container } from 'typedi';
import { DishService, RestaurantService, FeatureService } from '../services';
import { dishController, restaurantController, featuredController } from '../controllers';
const router = express.Router();


async function initializeApp() {
    try {
        const data = await AppDataSourceSingleton.getInstance();
        Container.set('DataSource', data);
        const dataSource: DataSource = Container.get('DataSource')

        const featureServiceInstance = new FeatureService(dataSource);
        const restaurantServiceInstance = new RestaurantService(dataSource)
        const disgServiceInstance = new DishService(dataSource)

        Container.set('FeatureService', featureServiceInstance);
        Container.set('RestaurantService', restaurantServiceInstance)
        Container.set('DishService', disgServiceInstance)

        const featureControllerInstance = new featuredController(Container.get('FeatureService'));
        const restaurantControllerInstance = new restaurantController(Container.get('RestaurantService'));
        const dishControllerInstance = new dishController(Container.get('DishService'));

        Container.set('featuredController', featureControllerInstance);
        Container.set('restaurantController', restaurantControllerInstance);
        Container.set('dishController', dishControllerInstance);


        const feature = Container.get<featuredController>('featuredController');
        const restaurant = Container.get<restaurantController>('restaurantController');
        const dish = Container.get<dishController>('dishController');


        // Register routes
        router.get('/restaurants/featured', feature.getAllFeature.bind(feature));
        router.get('/restaurants/restaurant-detail/:id', restaurant.getDataByIdRestaurant.bind(restaurant));
        router.get('/restaurants/featured-restaurants/:id', restaurant.getRestaurantByFeatured.bind(restaurant));
        router.get('/restaurants/restaurant-detail-by-name/:name', restaurant.getRestaurantByName.bind(restaurant));
        router.get('/restaurants/dish-restaurant/:id', dish.getDataByIdRestaurant.bind(dish));

    } catch (error) {
        console.error('Error initializing DataSource:', error);
    }
}

initializeApp();


router.post('/users/login', login);
router.post('/users/signup', signup);
router.post('/users/bill', bill);

export default router;
