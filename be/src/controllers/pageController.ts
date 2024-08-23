import { Request, Response } from 'express';
import { Service } from 'typedi';
import { DataSource } from 'typeorm';
import { DishSchema } from '../entity';
import { DishService } from '../services';
import { Dish } from '../interface';

@Service()
class PageController {
    constructor(private dataSource: DataSource, private dishService: DishService) { }

    getCreatePage(req: Request, res: Response): void {
        res.render('create.ejs');
    }

    async getUpdatePage(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        const dish = await this.dishService.getDataById(id);
        console.log(dish)
        res.render('update.ejs', { dish: dish });
    }

    async getHome(req: Request, res: Response) {
        const dishes = await this.dishService.getAllDish();
        res.render('home.ejs', { listDish: dishes });
    }

    async createOneDish(req: Request, res: Response): Promise<void> {
        const { id, name, description, price, image, restaurant_id } = req.body;
        if (!restaurant_id || !id || !name || !image || !description || !price) {
            res.status(400).send('All fields are required');
            return;
        }
        await this.dishService.createOneDish({ id, name, description, price, image, restaurant_id })
        res.redirect('/manage/dish/home');

    }
    async deleteDishById(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);
        this.dishService.deleteById(id);
        res.redirect('/manage/dish/home');
    }
    async updateDishByID(req: Request, res: Response) {
        const { id, name, description, price, image, restaurant_id } = req.body;
        const updateData = { name, description, price, image, restaurant_id };

        await this.dishService.updateById(id, updateData)
        res.redirect('/manage/dish/home');
    }

}

export { PageController };
