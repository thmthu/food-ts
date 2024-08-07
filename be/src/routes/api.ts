import express from 'express';
import {
    getRestaurantById,
    getFeatured,
    getFeaturedRestaurants,
    getRestaurantDetails,
    getRestaurantByName
} from '../controllers/restaurantControllers';
import { login, signup, bill } from '../controllers/userControllers';

const router = express.Router();

router.get('/restaurants/featured', getFeatured);
router.get('/restaurants/restaurantDetails/:id', getRestaurantDetails);
router.get('/restaurants/featuredRestaurants/:id', getFeaturedRestaurants);
router.get('/restaurants/:id', getRestaurantById);
router.get('/restaurants/restaurantDetailsByName/:name', getRestaurantByName);

router.post('/users/login', login);
router.post('/users/signup', signup);
router.post('/users/bill', bill);

export default router;
