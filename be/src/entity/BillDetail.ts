import { EntitySchema } from "typeorm";
import { BillDetail } from "../entity-models/BillDetail"; // Adjust the import path as necessary

export const BillDetailSchema = new EntitySchema<BillDetail>({
    name: "BillDetail",
    tableName: "BillDetails",
    columns: {
        id: {
            type: Number,
            primary: true,
            generated: "increment",
        },
        bill_id: {
            type: Number,
            nullable: false,
        },
        dish_id: {
            type: Number,
            nullable: false,
        },
        quantity: {
            type: Number,
            nullable: false,
        },
    },
    indices: [
        {
            name: "IDX_BILL_ID",
            columns: ["bill_id"],
        },
        {
            name: "IDX_DISH_ID",
            columns: ["dish_id"],
        },
    ],
    relations: {
        bill: {
            target: "Bill",
            type: "many-to-one",
            joinColumn: { name: "bill_id", referencedColumnName: "id" },
            onDelete: "CASCADE",
        },
        dish: {
            target: "Dish",
            type: "many-to-one",
            joinColumn: { name: "dish_id", referencedColumnName: "id" },
            onDelete: "CASCADE",
        },
    },
});
