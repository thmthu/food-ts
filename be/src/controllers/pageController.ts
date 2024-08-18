import { Request, Response } from 'express';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { DishSchema } from '../entity';

@Service()
class PageController {
    constructor(private dataSource: DataSource) { }

    getCreatePage(req: Request, res: Response): void {
        res.render('create.ejs');
    }

    getUpdatePage(req: Request, res: Response): void {
        res.render('update.ejs');
    }

    getHome(req: Request, res: Response): void {
        res.render('home.ejs');
    }

    async createRestaurant(req: Request, res: Response): Promise<void> {
        const { id, name, description, price, image, restaurant_id } = req.body;
        if (!restaurant_id || !id || !name || !image || !description || !price) {
            res.status(400).send('All fields are required');
            return;
        }

        const dishRepository = this.dataSource.getRepository(DishSchema);
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
}

export { PageController };
