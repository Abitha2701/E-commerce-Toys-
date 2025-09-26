import { createSlice } from "@reduxjs/toolkit";

const storedItems = localStorage.getItem('cartItems');

const initialState = {
  cartitems: storedItems ? JSON.parse(storedItems) : [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
  addTocart: (state, action) => {
  const existing = state.cartitems.find(item => item.id === action.payload.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cartitems.push({
      ...action.payload,
      quantity: Number(action.payload.quantity || 1),
      price: Number(action.payload.price) || 0,
    });
  }
      localStorage.setItem('cartItems', JSON.stringify(state.cartitems));
    },

    deleteFromCart: (state, action) => {
      state.cartitems = state.cartitems.filter(item => item.id !== action.payload.id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.cartitems.find(item => item.id === id);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
        localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
      }
    },

    clearCart: (state) => {
      state.cartitems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartitems));
    }
  }
});
export default CartSlice.reducer;
export const { addTocart, deleteFromCart, updateQuantity, clearCart } = CartSlice.actions;
