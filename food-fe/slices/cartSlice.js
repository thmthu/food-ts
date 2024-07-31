import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const initialState = {
    item: [],
}
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.item.push(action.payload);
        },
        removeFromCart: (state, action) => {
            const myIndex = state.item.findIndex(temp => temp.id === action.payload);
            if (myIndex >= 0) {
                state.item.splice(myIndex, 1)
            }
            else {
                console.log("can't remove item as its not in the bassket");
            }
        }

    }
})
export const { addToCart, removeFromCart } = cartSlice.actions;
export const selectItems = state => state.cart.item;
export const selectItemByID = createSelector(
    state => state.cart.item,
    (_, id) => id,
    (items, id) => items.filter(item => item.id === id)
);
//export const selectItemByID = (state, id) => state.cart.item.filter(item => item.id == id);
export default cartSlice.reducer
