import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  ids: string[];
}

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.ids = state.ids.filter((x) => x !== action.payload);
    },
    clearWishlist(state) {
      state.ids = [];
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
