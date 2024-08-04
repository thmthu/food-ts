import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';
import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
const dataSource = AppDataSourceSingleton.getInstance();

const seedDatabase = async () => {
    const dataSource = await AppDataSourceSingleton.getInstance();
    await dataSource.getRepository(FeaturedSchema).save([
        { name: 'Special Offers', description: 'Discounts on featured items' }
    ]);

    await dataSource.getRepository(UserSchema).save([
        { username: 'john_doe', email: 'john.doe@example.com', address: '123 Main St', password: 'hashed_password' }
    ]);

    await dataSource.getRepository(RestaurantSchema).save([
        {
            name: 'Papa Johns',
            image: 'https://www.simplemost.com/wp-content/uploads/2023/02/papa-johns-cheese-crust-2.png',
            description: 'Hot and spicy pizzas',
            address: '434 second street',
            stars: 4,
            category: 'Fast Food',
            featured_id: 1
        }
    ]);

    await dataSource.getRepository(DishSchema).save([
        { id: 1, name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg', restaurant_id: 1 }
    ]);

    await dataSource.getRepository(BillSchema).save([
        { email: 'john.doe@example.com', total: 25.99 }
    ]);

    await dataSource.getRepository(BillDetailSchema).save([
        { id: 1, bill_id: 1, dish_id: 2, quantity: 1 }
    ]);

    await dataSource.destroy();
};

seedDatabase().catch(console.error);
