import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import restaurantSlice from "./slices/restaurantSlice"
import emailSlice from "./slices/emailSlice"


export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        cart: cartSlice,
        email: emailSlice

    }
})