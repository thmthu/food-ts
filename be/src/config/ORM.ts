import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const getEnvVariable = (key: string, defaultValue?: string): string => {
    const value = process.env[key];
    if (!value) {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        throw new Error(`Environment variable ${key} is not defined`);
    }
    return value;
};

const dbType = getEnvVariable('DB_TYPE', 'mysql') as 'mysql' | 'postgres' | 'mariadb' | 'sqlite' | 'mssql' | 'oracle';
const host = getEnvVariable('DB_HOST');
const port = parseInt(getEnvVariable('DB_PORT'), 10);
const username = getEnvVariable('DB_USERNAME');
const password = getEnvVariable('DB_PASSWORD');
const database = getEnvVariable('DB_DATABASE');

export const AppDataSource = new DataSource({
    type: dbType,
    host: host,
    port: port,
    username: username,
    password: password,
    database: database,
    synchronize: true,
    logging: false,
    entities: [UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema],
    migrationsTableName: "custom_migration_table",
    migrations: ["src/migration/**/*.ts"],
    subscribers: [],
});

