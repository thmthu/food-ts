import { DataSource } from 'typeorm';
import { AppDataSource } from '../config/ORM';
import { Service } from 'typedi';

@Service()
class AppDataSourceSingleton {
    private static instance: DataSource;

    private constructor() { }

    public static async getInstance(): Promise<DataSource> {


        if (!AppDataSourceSingleton.instance) {

            AppDataSourceSingleton.instance = AppDataSource;
            await AppDataSourceSingleton.instance.initialize()
                .then(() => {

                    console.log("Data Source has been initialized!");
                })
                .catch((err) => {
                    console.error("Error during Data Source initialization:", err);
                });
        }
        return AppDataSourceSingleton.instance;
    }
}
export { AppDataSourceSingleton }
