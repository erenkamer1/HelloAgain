import axios, { AxiosInstance } from 'axios';
import { PagedRewardsResponse, Reward } from '../types/reward';

const BASE_URL = 'https://staging.helloagain.at/api/v1/clients/5189/bounties/';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export async function fetchRewards(
  params: { limit: number; page: number; filterWithoutImages?: boolean }
): Promise<PagedRewardsResponse> {
  const { limit, page, filterWithoutImages } = params;
  const { data } = await apiClient.get<Reward[]>(``, {
    params: { limit, page },
  });

  const itemsRaw: Reward[] = Array.isArray(data) ? data : [];

  const itemsFiltered = filterWithoutImages
    ? itemsRaw.filter((r) => Array.isArray(r.pictures) && r.pictures.length > 0)
    : itemsRaw;

  const hasMore = itemsFiltered.length >= limit;

  return {
    items: itemsFiltered,
    hasMore,
    nextPage: hasMore ? page + 1 : null,
  };
}


