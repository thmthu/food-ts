import { Request, Response } from 'express';
import { Restaurant } from '../interface';
import { RestaurantService } from '../services';

///raw test for option template
export class restaurantController {
    constructor(private service: RestaurantService) { };
    async getDataByIdRestaurant(req: Request, res: Response) {
        try {
            const restaurantId: number = parseInt(req.params.id);
            const restaurant = await this.service.getDataById(restaurantId)
            if (restaurant) {
                res.json(restaurant);
            } else {
                res.status(404).send('Restaurant not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    };

    async getRestaurantByFeatured(req: Request, res: Response): Promise<void> {
        try {
            const idFeature: number = parseInt(req.params.id);
            const restaurant: Restaurant[] = await this.service.getDataByFeatured(idFeature)
            res.json(restaurant);

        }
        catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }


    async getCreateRestaurantPage(req: Request, res: Response): Promise<void> {

    }
    async createRestaurant(req: Request, res: Response): Promise<void> {

    }
    async getRestaurantByName(req: Request, res: Response): Promise<void> {
        try {
            const name: string = req.params.name;
            const restaurants = await this.service.getDataByName(name);
            if (restaurants) {
                res.json(restaurants);
            } else {
                res.status(404).send('Restaurant not found');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}
