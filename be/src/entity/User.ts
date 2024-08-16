import { EntitySchema } from "typeorm";
import { User } from "../interface/User"; // Adjust the import path as necessary

export const UserSchema = new EntitySchema<User>({
    name: "User",
    tableName: "Users",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        username: {
            type: String,
            length: 255,
            nullable: false,
        },
        email: {
            type: String,
            length: 255,
            nullable: false,
        },
        password: {
            type: String,
            length: 255,
            nullable: false,
        },
        address: {
            type: String,
            length: 255,
            nullable: true,
        },
    },
    indices: [
        {
            name: "IDX_USERNAME",
            columns: ["username"],
            unique: true,
        },
        {
            name: "IDX_EMAIL",
            columns: ["email"],
            unique: true,
        },
    ],
});
