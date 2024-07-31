import { AppDataSourceSingleton } from '../classModels/AppDataSourceSingleton';
import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';

import { Request, Response } from 'express';

const getCreateRestaurant = (req: Request, res: Response): void => {
    res.render('create.ejs');
}
const getFeatured = async (req: Request, res: Response): Promise<void> => {
    try {
        const dataSource = await AppDataSourceSingleton.getInstance();
        const feature = await dataSource.getRepository(FeaturedSchema).find();
        res.json(feature);

    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }

}

const getRestaurantById = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId: number = parseInt(req.params.id);
        const dataSource = await AppDataSourceSingleton.getInstance(); // Lấy instance của DataSource
        const restaurantRepository = dataSource.getRepository(RestaurantSchema); // Lấy repository
        const restaurant = await restaurantRepository.findOneBy({ id: restaurantId }); // Thực hiện truy vấn
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).send("Restaurant not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

const getFeaturedRestaurants = async (req: Request, res: Response): Promise<void> => {
    try {
        const featuredId: number = parseInt(req.params.id);
        const dataSource = await AppDataSourceSingleton.getInstance();
        const featuredRepository = dataSource.getRepository(RestaurantSchema);
        const featuredList = await featuredRepository.findBy({ featured_id: featuredId });

        if (featuredList) {
            res.json(featuredList);
        } else {
            res.status(404).send("Featured not found");
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    };
};
const getRestaurantDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const restaurantId: number = parseInt(req.params.id);
        const dataSource = await AppDataSourceSingleton.getInstance();
        const dishRepository = dataSource.getRepository(DishSchema);
        const dishes = await dishRepository.findBy({ restaurant_id: restaurantId });

        if (dishes) {
            res.json(dishes);
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, image, description, lng, lat, address, stars, reviews, category, featured_id } = req.body;
        const dataSource = await AppDataSourceSingleton.getInstance();
        const restaurantRepository = dataSource.getRepository(RestaurantSchema);
        const restaurant = await restaurantRepository.create({
            name,
            image,
            description,
            lng,
            lat,
            address,
            stars,
            reviews,
            category,
            featured_id
        });
        await restaurantRepository.save(restaurant);
        res.json(restaurant);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};



export { getRestaurantById, getFeaturedRestaurants, getCreateRestaurant, createRestaurant, getRestaurantDetails, getFeatured };