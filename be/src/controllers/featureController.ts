import { Request, Response } from 'express';
import { Service } from 'typedi';
import { FeatureService } from '../services';

@Service()
class FeaturedController {
    constructor(private service: FeatureService) { };
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
export { FeaturedController }
