import axios, { AxiosInstance, AxiosError } from 'axios';
import { PagedRewardsResponse, Reward } from '../types/reward';
import { Platform } from 'react-native';

const BASE_URL = 'https://staging.helloagain.at/api/v1/clients/5189/bounties/';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Retry mekanizması için yardımcı fonksiyon
async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<T> {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await requestFn();
    } catch (error: any) {
      lastError = error;
      const status = error?.response?.status;
      const code = error?.code;
      
      // Sadece retry edilebilir hatalar için tekrar dene
      // 502, 503, 504 gibi sunucu hataları ve network hataları
      const isRetryable = 
        status === 502 || 
        status === 503 || 
        status === 504 || 
        code === 'ECONNABORTED' || 
        code === 'ETIMEDOUT' ||
        code === 'ERR_NETWORK';
      
      if (attempt < maxRetries && isRetryable) {
        const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff
        console.log(`APP_DEBUG Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, {
          status,
          code,
        });
        await new Promise<void>(resolve => setTimeout(() => resolve(), delay));
        continue;
      }
      
      throw error;
    }
  }
  
  throw lastError;
}

type ApiReward = {
  id: string;
  name: string;
  needed_points?: number;
  points?: number;
  pictures?: string[] | null;
  image?: string | null;
};

export async function fetchRewards(
  params: { limit: number; page: number; filterWithoutImages?: boolean }
): Promise<PagedRewardsResponse> {
  const { limit, page, filterWithoutImages } = params;
  console.log('APP_DEBUG fetchRewards start', {
    limit,
    page,
    filterWithoutImages: !!filterWithoutImages,
    platform: Platform.OS,
  });
  const requestConfig = {
    params: { limit, page },
  };
  console.log('APP_DEBUG fetchRewards request config', requestConfig);

  try {
    const { data, status, headers } = await retryRequest(() =>
      apiClient.get<{
        count: number;
        next: string | null;
        previous: string | null;
        results: ApiReward[];
      }>(``, requestConfig)
    );
    // "boş string ana api endpointine istek atıyor"
    console.log('APP_DEBUG fetchRewards response received', {
      status,
      hasNext: Boolean(data?.next),
      hasResultsArray: Array.isArray(data?.results),
      count: data?.count,
      resultsLength: Array.isArray(data?.results) ? data.results.length : null,
      sample: Array.isArray(data?.results) ? data.results.slice(0, 2) : null,
      headers,
    });

    const itemsRaw: Reward[] = Array.isArray(data?.results)
      ? data.results.map<Reward>((item) => {
          const picturesFromApi = Array.isArray(item.pictures)
            ? item.pictures.filter((pic): pic is string => typeof pic === 'string' && pic.length > 0)
            : [];
          const mergedPictures = [...picturesFromApi];
          if (mergedPictures.length === 0 && typeof item.image === 'string' && item.image.length > 0) {
            mergedPictures.push(item.image);
          }

          console.log('APP_DEBUG fetchRewards mapped reward', {
            id: item.id,
            name: item.name,
            points: item.points,
            needed_points: item.needed_points,
            picturesFromApiLength: picturesFromApi.length,
            imageFallbackUsed: mergedPictures.length > picturesFromApi.length,
          });

          return {
            id: item.id,
            name: item.name,
            points: (typeof item.points === 'number' ? item.points : item.needed_points) ?? 0,
            pictures: mergedPictures,
          };
        })
      : [];
    // boş array dönüyor. hata durumunda crash olmaması için
    console.log('APP_DEBUG fetchRewards normalized items', {
      length: itemsRaw.length,
      firstItem: itemsRaw[0] ?? null,
    });

    const itemsFiltered = filterWithoutImages
      ? itemsRaw.filter((r) => Array.isArray(r.pictures) && r.pictures.length > 0)
      : itemsRaw;
    console.log('APP_DEBUG fetchRewards filtered items', {
      appliedFilter: !!filterWithoutImages,
      length: itemsFiltered.length,
    });

    const hasMore = Boolean(data?.next);
    console.log('APP_DEBUG fetchRewards final response', {
      hasMore,
      nextPage: hasMore ? page + 1 : null,
    });

    return {
      items: itemsFiltered,
      hasMore,
      nextPage: hasMore ? page + 1 : null,
    };
  } catch (error: any) {
    const axiosError = error as AxiosError;
    const status = axiosError?.response?.status;
    const isServerError = status && status >= 500 && status < 600;
    
    console.log('APP_DEBUG fetchRewards request failed', {
      message: error?.message,
      code: error?.code,
      status: status,
      url: error?.config?.baseURL ? `${error.config.baseURL}${error.config.url ?? ''}` : error?.config?.url,
      timeout: error?.config?.timeout,
      isAxiosError: !!error?.isAxiosError,
      isServerError,
      retriesExhausted: true,
    });
    
    if (error?.response) {
      console.log('APP_DEBUG fetchRewards error response data', error.response?.data);
    }
    
    // Daha kullanıcı dostu hata mesajı
    if (isServerError) {
      const friendlyError = new Error('Sunucu geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
      (friendlyError as any).originalError = error;
      (friendlyError as any).status = status;
      throw friendlyError;
    }
    
    throw error;
  }
}


