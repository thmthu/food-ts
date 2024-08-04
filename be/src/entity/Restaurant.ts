import { EntitySchema } from "typeorm";
import { Restaurant } from "../entity-models/Restaurant"; // Adjust the import path as necessary

export const RestaurantSchema = new EntitySchema<Restaurant>({
    name: "Restaurant",
    tableName: "Restaurants",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: true,
        },
        name: {
            type: String,
            length: 255,
            nullable: false,
        },
        image: {
            type: String,
            length: 255,
            nullable: false,
        },
        description: {
            type: "text",
            nullable: false,
        },

        address: {
            type: String,
            length: 255,
            nullable: true,
        },
        stars: {
            type: "float",
            nullable: true,
        },
        category: {
            type: String,
            length: 255,
            nullable: true,
        },
        featured_id: {
            type: Number,
            nullable: true,
        },
    },
    relations: {
        featured: {
            target: "Featured",
            type: "many-to-one",
            joinColumn: { name: "featured_id" },
            cascade: true,
            onDelete: "SET NULL",
            inverseSide: "restaurants", // Inverse side of the relationship

        },
    },
});
