import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of product objects {id, ...}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      if (!state.items.find(p => p.id === item.id)) {
        state.items.push(item);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(p => p.id !== id);
    },
    toggleWishlist: (state, action) => {
      const item = action.payload;
      const exists = state.items.find(p => p.id === item.id);
      if (exists) {
        state.items = state.items.filter(p => p.id !== item.id);
      } else {
        state.items.push(item);
      }
    },
    clearWishlist: (state) => {
      state.items = [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
