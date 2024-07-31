import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';

config();

export class AppDataSourceSingleton {
    private static instance: DataSource;

    private constructor() { }

    public static async getInstance(): Promise<DataSource> {
        if (!AppDataSourceSingleton.instance) {
            const dbType = process.env.DB_TYPE as 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql' | 'oracle';

            AppDataSourceSingleton.instance = new DataSource({
                type: dbType,
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT, 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                synchronize: true,
                logging: false,
                entities: [UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema],
                migrations: [],
                subscribers: [],
            });
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
