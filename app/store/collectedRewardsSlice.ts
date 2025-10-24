import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../types/reward';

export interface CollectedRewardsState {
  items: Reward[];
}

const initialState: CollectedRewardsState = {
  items: [],
};

const collectedRewardsSlice = createSlice({
  name: 'collectedRewards',
  initialState,
  reducers: {
    collectReward: (state, action: PayloadAction<Reward>) => {
      const exists = state.items.some((r) => r.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
  },
});

export const { collectReward } = collectedRewardsSlice.actions;
export const collectedRewardsReducer = collectedRewardsSlice.reducer;

export const selectCollectedRewards = (state: { collectedRewards: CollectedRewardsState }) =>
  state.collectedRewards.items;


