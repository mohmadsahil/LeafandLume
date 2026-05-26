import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface PointsEntry {
  id: string;
  source: string;
  points: number;
  date: string;
}

interface RewardsState {
  points: number;
  history: PointsEntry[];
  quizAttempts: number;
  bestScore: number;
  bestStreak: number;
  hydrated: boolean;
}

const initialState: RewardsState = {
  points: 0,
  history: [],
  quizAttempts: 0,
  bestScore: 0,
  bestStreak: 0,
  hydrated: false,
};

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    hydrateRewards(state, action: PayloadAction<Partial<Omit<RewardsState, 'hydrated'>>>) {
      Object.assign(state, action.payload);
      state.hydrated = true;
    },
    awardPoints(state, action: PayloadAction<{ points: number; source: string }>) {
      if (action.payload.points <= 0) return;
      state.points += action.payload.points;
      state.history.unshift({
        id: `pt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        source: action.payload.source,
        points: action.payload.points,
        date: new Date().toISOString(),
      });
      if (state.history.length > 50) state.history.length = 50;
    },
    redeemPoints(state, action: PayloadAction<{ points: number; source: string }>) {
      const amount = Math.min(action.payload.points, state.points);
      if (amount <= 0) return;
      state.points -= amount;
      state.history.unshift({
        id: `pt-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        source: action.payload.source,
        points: -amount,
        date: new Date().toISOString(),
      });
    },
    recordQuizResult(
      state,
      action: PayloadAction<{ score: number; streak: number }>,
    ) {
      state.quizAttempts += 1;
      if (action.payload.score > state.bestScore) state.bestScore = action.payload.score;
      if (action.payload.streak > state.bestStreak) state.bestStreak = action.payload.streak;
    },
  },
});

export const { hydrateRewards, awardPoints, redeemPoints, recordQuizResult } =
  rewardsSlice.actions;
export default rewardsSlice.reducer;
