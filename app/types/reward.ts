export interface Reward {
  id: string;
  name: string;
  points: number;
  pictures?: string[];
}

export interface PagedRewardsResponse {
  items: Reward[];
  hasMore: boolean;
  nextPage: number | null;
}


