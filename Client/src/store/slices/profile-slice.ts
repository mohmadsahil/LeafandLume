import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  name: string;
  avatar: string | null;
  hydrated: boolean;
}

export const DEFAULT_NAME = 'Aanya R.';

const initialState: ProfileState = {
  name: DEFAULT_NAME,
  avatar: null,
  hydrated: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    hydrateProfile(state, action: PayloadAction<Partial<Omit<ProfileState, 'hydrated'>>>) {
      Object.assign(state, action.payload);
      state.hydrated = true;
    },
    setAvatar(state, action: PayloadAction<string | null>) {
      state.avatar = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload.trim() || DEFAULT_NAME;
    },
  },
});

export const { hydrateProfile, setAvatar, setName } = profileSlice.actions;
export default profileSlice.reducer;
