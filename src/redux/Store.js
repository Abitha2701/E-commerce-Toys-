import ProductSlice from './ProductSlice'; 
import CartSlice from './Cartslice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: CartSlice
  },
});
