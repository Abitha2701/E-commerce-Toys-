import ProductSlice from './ProductSlice'; 
import CartSlice from './Cartslice';
import { configureStore } from '@reduxjs/toolkit';
import WishlistSlice from './WishlistSlice';


export const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
});
