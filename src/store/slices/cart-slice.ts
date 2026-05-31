import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  open: boolean;
  appliedCoupon: string | null;
}

const initialState: CartState = {
  items: [],
  open: false,
  appliedCoupon: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      const qty = action.payload.quantity ?? 1;
      if (existing) {
        existing.quantity += qty;
      } else {
        state.items.push({ ...action.payload, quantity: qty });
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      item.quantity = Math.max(1, action.payload.quantity);
    },
    clearCart(state) {
      state.items = [];
      state.appliedCoupon = null;
    },
    setCartOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    applyCoupon(state, action: PayloadAction<string>) {
      state.appliedCoupon = action.payload;
    },
    clearCoupon(state) {
      state.appliedCoupon = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCartOpen,
  applyCoupon,
  clearCoupon,
} = cartSlice.actions;
export default cartSlice.reducer;
