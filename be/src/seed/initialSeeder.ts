import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';

import { Request, Response } from 'express';

const seedDatabase = async () => {
    const dataSource = await AppDataSourceSingleton.getInstance();
    await dataSource.getRepository(FeaturedSchema).save([
        { id: 1, name: 'Special Offers', description: 'Delicious' },
        { id: 2, name: 'Vietnamese street food', description: 'The authenticity and freshness of ingredients' }



    ]);

    await dataSource.getRepository(UserSchema).save([
        { username: 'mitu', email: 'mitu@gmail.com', address: '123 Main St', password: 'mitu' },
        { username: 'abc', email: 'abc@gmail.com', address: '123 Main St', password: 'abc' },
        { username: 'hihi', email: 'hihi@gmail.com', address: '123 Main St', password: 'hihi' },
        { username: '123', email: '123@gmail.com', address: '123 Main St', password: '123' },
        { username: 'ok', email: 'ok@gmail.com', address: '123 Main St', password: 'ok' }




    ]);

    await dataSource.getRepository(RestaurantSchema).save([
        {
            id: 1,
            name: 'Papa Johns',
            image: 'https://www.simplemost.com/wp-content/uploads/2023/02/papa-johns-cheese-crust-2.png',
            description: 'Hot and spicy pizzas',
            address: '434 second',
            stars: 4,
            category: 'Fast Food',
            featured_id: 1
        },
        {
            id: 2,
            name: 'Huynh Hoa',
            image: 'https://vietnamdiscovery.com/wp-content/uploads/2020/03/Banh-Mi-Vietnamese-sandwich-taste.com-au-2048x1365.jpg',
            description: 'The most famous Vietnamese sandwich',
            address: '24 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 2
        },
        {
            id: 3,
            name: 'Banh cuon Ba Hoanh',
            image: 'https://cdn.shortpixel.ai/spai2/w_763+q_glossy+ret_img+to_auto/www.hungryhuy.com/wp-content/uploads/banh-cuon-recipe-w-veggies2.jpg',
            description: 'Hot and yummy',
            address: '28 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 2
        },
        {
            id: 4,
            name: 'Bun dau mam tom',
            image: 'https://vietnamdiscovery.com/wp-content/uploads/2020/03/Bun-dau-mam-tom-Vermicelli-Served-with-Tofu-and-Shrimp-Paste-thedotmagazine.com_.jpg',
            description: 'Vermicelli Served with Tofu and Shrimp Paste',
            address: '24 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 2
        },
        {
            id: 5,
            name: 'Nuggets',
            image: 'https://www.thedailymeal.com/img/gallery/fast-food-dipping-sauces-ranked/intro-1672678972.jpg',
            description: 'Creamy sweetness cuts the heat',
            address: '24 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 1
        },
        {
            id: 6,
            name: 'The jakarta',
            image: 'https://www.comeindubai.com/wp-content/uploads/2021/04/fast-food-dubai-2048x1365.jpeg',
            description: 'A balance fast food',
            address: '24 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 1
        }


    ]);

    await dataSource.getRepository(DishSchema).save([
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 1
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 1
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 1
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 1
        },
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 2
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 2
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 2
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 2
        },
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 3
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 3
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 3
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 3
        },
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 4
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 4
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 4
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 4
        },
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 5,
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 5,
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 5,
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 5,
        },
        {
            name: 'Dish A', description: 'Delicious dish', price: 12.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 6,
        },
        {
            name: 'Dish B', description: 'Delicious dish', price: 6.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 6,
        },
        {
            name: 'Dish C', description: 'Delicious dish', price: 2.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 6,
        },
        {
            name: 'Dish D', description: 'Delicious dish', price: 9.99, image: 'https://www.simplemost.com/wp-content/uploads/2016/07/pepperoni-olive-cheese-pizza-addictive-foods-e1468856431544.jpeg',
            restaurant_id: 6,
        },
    ]);


    await dataSource.destroy();
};

seedDatabase().catch(console.error);
