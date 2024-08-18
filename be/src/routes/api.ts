import express from 'express';
import { login, signup, bill } from '../controllers/userControllers';
import { dishController, restaurantController, featuredController } from '../controllers';
import { Container } from 'typedi';

const router = express.Router();

const feature = Container.get(featuredController);
const restaurant = Container.get(restaurantController);
const dish = Container.get(dishController);

router.get('/restaurants/featured', feature.getAllFeature.bind(feature));
router.get('/restaurants/restaurant-detail/:id', restaurant.getDataByIdRestaurant.bind(restaurant));
router.get('/restaurants/featured-restaurants/:id', restaurant.getRestaurantByFeatured.bind(restaurant));
router.get('/restaurants/restaurant-detail-by-name/:name', restaurant.getRestaurantByName.bind(restaurant));
router.get('/restaurants/dish-restaurant/:id', dish.getDataByIdRestaurant.bind(dish));

router.post('/users/login', login);
router.post('/users/signup', signup);
router.post('/users/bill', bill);

export default router;
