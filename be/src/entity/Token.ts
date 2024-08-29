import { EntitySchema } from "typeorm";
import { Token } from "../interface";

export const TokenSchema = new EntitySchema<Token>({
    name: 'Token',
    tableName: 'Tokens',
    columns: {
        _id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        refreshToken: {
            type: String,
            length: 255,
            nullable: false,
        },
        expireAt: {
            type: Date,
            default: () => "CURRENT_TIMESTAMP",
        },
        createAt: {
            type: Date,
            default: () => "CURRENT_TIMESTAMP",
        },
        invokeAt: {
            type: Date,
            nullable: true,
        },
        idUser: {
            type: Number,
            nullable: false,
        },
    },
    relations: {
        user: {
            target: "User", // Reference the correct entity name
            type: "one-to-one",
            joinColumn: { name: "idUser" },
        },
    },
    indices: [
        {
            name: "IDX_TOKEN_ID",
            columns: ["_id"],
        },
    ],
});
