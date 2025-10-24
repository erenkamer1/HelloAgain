import { collectReward, collectedRewardsReducer } from '../app/store/collectedRewardsSlice';

const reward = { id: '1', name: 'Coffee', points: 100 };

describe('collectedRewardsSlice', () => {
  it('adds a new reward once', () => {
    const state = collectedRewardsReducer(undefined, { type: '@@INIT' } as any);
    const s1 = collectedRewardsReducer(state, collectReward(reward as any));
    expect(s1.items).toHaveLength(1);
    const s2 = collectedRewardsReducer(s1, collectReward(reward as any));
    expect(s2.items).toHaveLength(1);
  });
});


