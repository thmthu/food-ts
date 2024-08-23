import { Request, Response } from 'express';
import { Service } from 'typedi';
import { FeatureService } from '../services';

@Service()
class FeaturedController {
    constructor(private service: FeatureService) { };
    async getAllFeature(req: Request, res: Response) {
        try {
            console.log("1111");
            const feature = await this.service.getAll();
            console.log("hiiiiiiii", feature)

            res.json(feature);

        }
        catch (error) {
            console.error(error);
            res.status(500).send('Server error');
        }
    }
}
export { FeaturedController }
