import { IFeature } from "../interface/IFeature";
import { Repository, DataSource } from "typeorm";
import { Featured } from "../interface";
import { FeaturedSchema } from "../entity";
import { Service } from 'typedi';

export class FeatureService implements IFeature {
    repository: Repository<Featured>;
    constructor(protected dataSource: DataSource) {
        this.repository = dataSource.getRepository(FeaturedSchema);
    }
    async getAll() {
        return await this.repository.find();
    };
}

