import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/ui-slice';
import cartReducer from './slices/cart-slice';
import wishlistReducer from './slices/wishlist-slice';
import addressReducer from './slices/address-slice';
import rewardsReducer from './slices/rewards-slice';
import profileReducer from './slices/profile-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
      cart: cartReducer,
      wishlist: wishlistReducer,
      address: addressReducer,
      rewards: rewardsReducer,
      profile: profileReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
