import { Bill } from "./Bill";
import { Dish } from "./Dish";
export interface BillDetail {
    id: number;
    bill_id: number;
    dish_id: number;
    quantity: number;
    bill?: Bill;
    dish?: Dish;
}
