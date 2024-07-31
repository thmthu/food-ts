import express from 'express';
const router = express.Router();
import { getRestaurantById, getCreateRestaurant, createRestaurant, getFeatured, getFeaturedRestaurants, getRestaurantDetails } from '../controllers/restaurantControllers';
import { login, signup, bill } from '../controllers/userControllers';

router.get('/featured', getFeatured);
router.get('/restaurantDetails/:id', getRestaurantDetails);
router.post('/create', createRestaurant);
router.get('/create-page', getCreateRestaurant);
router.get('/featuredRestaurants/:id', getFeaturedRestaurants);
router.get('/restaurant/:id', getRestaurantById);

router.post('/login', login);
router.post('/signup', signup);
router.post('/bill', bill);

export default router;