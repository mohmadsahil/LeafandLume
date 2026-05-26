import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Address } from '@/types';

interface AddressState {
  items: Address[];
  selectedId: string | null;
}

const seed: Address[] = [
  {
    id: 'addr-home',
    label: 'Home',
    fullName: 'Aanya R.',
    phone: '+1 (555) 010-2233',
    line1: '14 Botanical Lane',
    line2: 'Studio 3',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11206',
    country: 'United States',
    isDefault: true,
  },
  {
    id: 'addr-work',
    label: 'Office',
    fullName: 'Aanya R.',
    phone: '+1 (555) 010-2233',
    line1: '420 Park Ave',
    line2: '12th Floor',
    city: 'Manhattan',
    state: 'NY',
    zip: '10022',
    country: 'United States',
  },
];

const initialState: AddressState = {
  items: seed,
  selectedId: seed.find((a) => a.isDefault)?.id ?? seed[0]?.id ?? null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress(state, action: PayloadAction<Omit<Address, 'id'>>) {
      const id = `addr-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const next: Address = { ...action.payload, id };
      if (next.isDefault) {
        state.items.forEach((a) => (a.isDefault = false));
      }
      if (state.items.length === 0) next.isDefault = true;
      state.items.push(next);
      state.selectedId = id;
    },
    updateAddress(state, action: PayloadAction<Address>) {
      const idx = state.items.findIndex((a) => a.id === action.payload.id);
      if (idx === -1) return;
      if (action.payload.isDefault) {
        state.items.forEach((a) => (a.isDefault = false));
      }
      state.items[idx] = action.payload;
    },
    deleteAddress(state, action: PayloadAction<string>) {
      const id = action.payload;
      const wasDefault = state.items.find((a) => a.id === id)?.isDefault;
      state.items = state.items.filter((a) => a.id !== id);
      if (wasDefault && state.items[0]) {
        state.items[0].isDefault = true;
      }
      if (state.selectedId === id) {
        state.selectedId = state.items.find((a) => a.isDefault)?.id ?? state.items[0]?.id ?? null;
      }
    },
    setDefaultAddress(state, action: PayloadAction<string>) {
      state.items.forEach((a) => (a.isDefault = a.id === action.payload));
    },
    selectAddress(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
});

export const { addAddress, updateAddress, deleteAddress, setDefaultAddress, selectAddress } =
  addressSlice.actions;
export default addressSlice.reducer;
