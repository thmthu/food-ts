import { IFeature } from "../interface/IFeature";
import { Repository, DataSource } from "typeorm";
import { Featured } from "../interface";
import { FeaturedSchema } from "../entity";
import { Service } from 'typedi';

@Service()
class FeatureService implements IFeature {
    repository: Repository<Featured>;

    constructor(private dataSource: DataSource) {
        this.repository = this.dataSource.getRepository(FeaturedSchema);
    }

    async getAll() {
        return await this.repository.find();
    }
}

export { FeatureService };
