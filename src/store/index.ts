import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui-slice';
import cartReducer from './slices/cart-slice';
import wishlistReducer from './slices/wishlist-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
