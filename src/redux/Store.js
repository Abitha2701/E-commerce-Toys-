import ProductSlice from './ProductSlice';
import CartSlice from './Cartslice';
import { configureStore } from '@reduxjs/toolkit';
import WishlistSlice from './WishlistSlice';
import AuthSlice from './AuthSlice';


export const store = configureStore({
  reducer: {
    product: ProductSlice,
    cart: CartSlice,
    wishlist: WishlistSlice,
    auth: AuthSlice,
  },
});
