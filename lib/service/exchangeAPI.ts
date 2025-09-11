import axios, { AxiosError } from 'axios';

const apiKeys = [
  process.env.NEXT_PUBLIC_API_LAYER_API_KEY,
  process.env.NEXT_PUBLIC_API_LAYER_API_KEY_2,
  process.env.NEXT_PUBLIC_API_LAYER_API_KEY_3,
].filter(Boolean);

let currentKeyIndex = 0;

function getCurrentApiKey() {
  return apiKeys[currentKeyIndex] ?? '';
}

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
});

async function axiosGetWithFailover(url: string, params: Record<string, unknown>) {
  let attempts = 0;

  while (attempts < apiKeys.length) {
    try {
      const res = await instance.get(url, {
        headers: { apikey: getCurrentApiKey() },
        params,
      });
      return res.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError;
        if (axiosErr.response?.status === 429) {
          console.warn(`Key ${currentKeyIndex + 1} quota exceeded, switching to next key...`);
          currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
          attempts++;
          continue;
        }
        throw axiosErr;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  throw new Error('All API keys have exceeded their limits.');
}

interface ConvertCredentials {
  from: string;
  to: string;
  amount: number;
}

export const exchangeCurrency = async (credentials: ConvertCredentials) => {
  const data = await axiosGetWithFailover(
    '/convert',
    credentials as unknown as Record<string, unknown>
  );
  return { ...data.query, rate: data.info.rate, result: data.result };
};

export const latestRates = async (baseCurrency: string) => {
  const data = await axiosGetWithFailover('/latest', { base: baseCurrency });
  return Object.entries(data.rates);
};
