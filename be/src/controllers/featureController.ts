import { featuredService } from "../services/restaurant";
import { Request, Response } from 'express';
import { Service } from 'typedi';

@Service()
export class featuredController {
    constructor(private service: featuredService) { };
    async getAllFeature(req: Request, res: Response) {
        try {
            const feature = await this.service.getAll();
            res.json(feature);

        }
        catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}
