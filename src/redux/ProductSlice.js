import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import allProducts from '../data/allProducts';

// Async thunk to fetch products from API
export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    try {
      const response = await fetch('http://localhost:6005/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      // Combine static products with DB products
      const combinedProducts = [...allProducts, ...data.products];
      return combinedProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      // Fallback to static products if API fails
      return allProducts;
    }
  }
);

// Async thunk to upload product
export const uploadProduct = createAsyncThunk(
  'product/uploadProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:6005/upload-product', {
        method: 'POST',
        body: productData,
      });

      const data = await response.json();

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      return data.product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
  uploadStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  uploadError: null,
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
    resetUploadStatus: (state) => {
      state.uploadStatus = 'idle';
      state.uploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        // Fallback to static products
        state.products = allProducts;
      })
      .addCase(uploadProduct.pending, (state) => {
        state.uploadStatus = 'loading';
        state.uploadError = null;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.products.push(action.payload);
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.uploadError = action.payload;
      });
  },
});

export const { setProducts, addProduct, removeProduct, resetUploadStatus } = ProductSlice.actions;
export default ProductSlice.reducer;
