import { EntitySchema } from "typeorm";
import { Featured } from "../entity-models/Featured";
export const FeaturedSchema = new EntitySchema<Featured>({
    name: "Featured",
    tableName: "Featured",
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
        description: {
            type: "text",
            nullable: false,
        },
    },
    relations: {
        restaurants: {
            target: "Restaurant",
            type: "one-to-many",
            inverseSide: "featured", // Inverse side of the relationship
        },
    },
});