import { Repository } from "typeorm";
export interface IRepository<T> {
    repository: Repository<T>;
    getAll(): Promise<T[]>;
    getDataById(id: number): Promise<T>;
    getDataByName(name: string): Promise<T[]>;

}
