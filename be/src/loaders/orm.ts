import { DataSource } from 'typeorm';
import { AppDataSource } from '../config/ORM';

export default async (): Promise<DataSource> => {
    const instance = AppDataSource;
    try {
        await instance.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
        throw err;
    }
    return instance;
}