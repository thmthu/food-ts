import { AppDataSourceSingleton } from '../class-models/AppDataSourceSingleton';
import { UserSchema, BillSchema, BillDetailSchema, DishSchema, FeaturedSchema, RestaurantSchema } from '../entity';

import { Request, Response } from 'express';

const seedDatabase = async () => {
    const dataSource = await AppDataSourceSingleton.getInstance();
    await dataSource.getRepository(FeaturedSchema).save([
        { id: 2, name: 'Vietnamese street food', description: 'The authenticity and freshness of ingredients' }



    ]);

    await dataSource.getRepository(RestaurantSchema).save([
        {
            id: 1,
            name: 'Papa Johns',
            image: 'https://www.simplemost.com/wp-content/uploads/2023/02/papa-johns-cheese-crust-2.png',
            description: 'Hot and spicy pizzas',
            address: '434 second street',
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
            image: '',
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
            featured_id: 2
        },
        {
            id: 6,
            name: 'The jakarta',
            image: 'https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg',
            description: 'A balance fast food',
            address: '24 Le Thi Rieng',
            stars: 4.5,
            category: 'Vietnamese',
            featured_id: 1
        }


    ]);


    await dataSource.destroy();
};

seedDatabase().catch(console.error);
