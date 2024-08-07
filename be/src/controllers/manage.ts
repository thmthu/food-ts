import { Request, Response } from 'express';
import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { DishSchema } from '../entity';
const getCreatePage = (req: Request, res: Response): void => {

    res.render('create.ejs');
}
const getUpdatePage = (req: Request, res: Response): void => {
    res.render('update.ejs');
}
const getHome = (req: Request, res: Response): void => {
    res.render('home.ejs');
}
const createRestaurant = async (req: Request, res: Response): Promise<void> => {
    const { id, name, description, price, image, restaurant_id } = req.body;
    if (!restaurant_id || !id || !name || !image || !description || !price) {
        res.status(400).send('All fields are required');

    }
    const dataSource = await AppDataSourceSingleton.getInstance();
    const dishRepository = dataSource.getRepository(DishSchema);
    const dish = dishRepository.create({
        id,
        name,
        description,
        price,
        image,
        restaurant_id
    });
    await dishRepository.save(dish);
    res.status(201).json({ message: 'Dish created' });

}
export { getHome, getCreatePage, getUpdatePage, createRestaurant };
