import { DishService } from '../services';
import { Request, Response } from 'express';
import { Service } from 'typedi';
import { Dish } from '../interface';

@Service()
class dishController {
    constructor(private service: DishService) { };
    async getDataByIdRestaurant(req: Request, res: Response) {
        try {
            const restaurantId: number = parseInt(req.params.id);
            const dishes = await this.service.getDataByIdRestaurant(restaurantId)
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
}

export { dishController }
