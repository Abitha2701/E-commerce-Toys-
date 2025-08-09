  import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    products: [], 
  };

  const ProductSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
      setProducts: (state, action) => {
        state.products = action.payload;
      },
      addProduct: (state, action) => {
        state.products.push(action.payload);
      },
      removeProduct: (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      },
    },
  });

  export const { setProducts, addProduct, removeProduct } = ProductSlice.actions;
  export default ProductSlice.reducer;
