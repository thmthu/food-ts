import { EntitySchema } from "typeorm";
import { Bill } from "../entityModels/Bill"; // Adjust the import path as necessary

export const BillSchema = new EntitySchema<Bill>({
    name: "Bill",
    tableName: "Bills",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        email: {
            type: String,
            length: 255,
            nullable: false,
        },
        total: {
            type: "float",
            nullable: true,
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_EMAIL",
            columns: ["email"],
        },
    ],
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: { name: "email", referencedColumnName: "email" },
            onDelete: "CASCADE",
        },
    },
});
