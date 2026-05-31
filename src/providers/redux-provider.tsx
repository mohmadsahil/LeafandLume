'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/store';
import { hydrateRewards } from '@/store/slices/rewards-slice';
import { hydrateProfile } from '@/store/slices/profile-slice';

const REWARDS_KEY = 'll:rewards';
const PROFILE_KEY = 'll:profile';

function safeRead<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function ReduxProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const store = storeRef.current;
    if (!store) return;

    store.dispatch(hydrateRewards(safeRead(REWARDS_KEY) ?? {}));
    store.dispatch(hydrateProfile(safeRead(PROFILE_KEY) ?? {}));

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      if (state.rewards.hydrated) {
        try {
          const { points, history, quizAttempts, bestScore, bestStreak } = state.rewards;
          localStorage.setItem(
            REWARDS_KEY,
            JSON.stringify({ points, history, quizAttempts, bestScore, bestStreak }),
          );
        } catch {
          /* ignore quota errors */
        }
      }
      if (state.profile.hydrated) {
        try {
          const { name, avatar } = state.profile;
          localStorage.setItem(PROFILE_KEY, JSON.stringify({ name, avatar }));
        } catch {
          /* ignore quota errors */
        }
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
