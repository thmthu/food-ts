import { EntitySchema } from "typeorm";
import { Dish } from "../entity-models/Dish"; // Adjust the import path as necessary

export const DishSchema = new EntitySchema<Dish>({
    name: "Dish",
    tableName: "Dishes",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        name: {
            type: String,
            length: 255,
            nullable: false,
        },
        description: {
            type: "text",
            nullable: false,
        },
        price: {
            type: "float",
            nullable: true,
        },
        image: {
            type: String,
            length: 255,
            nullable: false,
        },
        restaurant_id: {
            type: Number,
            nullable: true,
        },
    },
    indices: [
        {
            name: "IDX_RESTAURANT_ID",
            columns: ["restaurant_id"],
        },
    ],
    relations: {
        restaurant: {
            target: "Restaurant",
            type: "many-to-one",
            joinColumn: { name: "restaurant_id" },
            onDelete: "SET NULL",
        },
    },
});
