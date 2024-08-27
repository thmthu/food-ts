import { EntitySchema } from "typeorm";
import { IUser } from "../interface/User"; // Adjust the import path as necessary

export const UserSchema = new EntitySchema<IUser>({
    name: "User",
    tableName: "Users",
    columns: {
        _id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        name: {
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
        salt: {
            type: String,
            length: 255,
            nullable: true,

        }
    },
    indices: [
        {
            name: "IDX_USERNAME",
            columns: ["name"],
            unique: true,
        },
        {
            name: "IDX_EMAIL",
            columns: ["email"],
            unique: true,
        },
    ],
});
