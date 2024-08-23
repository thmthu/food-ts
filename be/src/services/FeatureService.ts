import { IFeature } from "../interface/IFeature";
import { Repository, DataSource } from "typeorm";
import { Featured } from "../interface";
import { FeaturedSchema } from "../entity";
import { Service, Inject } from 'typedi';

@Service()
class FeatureService implements IFeature {
    constructor(
        @Inject(() => DataSource) private dataSource: DataSource,
        @Inject('FeatureRepository') private repository: Repository<Featured>
    ) { }

    async getAll() {
        return await this.repository.find();
    }
}

export { FeatureService };
