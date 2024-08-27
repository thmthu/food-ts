import express from 'express';
import { bill, UserController } from '../controllers/UserControllers';
import { DishController, RestaurantController, FeaturedController } from '../controllers';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
export default () => {
    const router = express.Router();
    const feature = Container.get(FeaturedController);
    const restaurant = Container.get(RestaurantController);
    const dish = Container.get(DishController);
    const user = Container.get(UserController)

    router.get('/restaurants/featured', feature.getAllFeature.bind(feature));
    router.get('/restaurants/restaurant-detail/:id', restaurant.getDataByIdRestaurant.bind(restaurant));
    router.get('/restaurants/featured-restaurants/:id', restaurant.getRestaurantByFeatured.bind(restaurant));
    router.get('/restaurants/restaurant-detail-by-name/:name', restaurant.getRestaurantByName.bind(restaurant));
    router.get('/restaurants/dish-restaurant/:id', dish.getDataByIdRestaurant.bind(dish));

    router.post('/users/signin', celebrate({
        body: Joi.object({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    }), user.SignIn.bind(user));
    router.post('/users/signup', celebrate({
        body: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            address: Joi.string().required(),
        }),
    }), user.SignUp.bind(user));
    router.post('/users/bill', bill);
    return router
}
