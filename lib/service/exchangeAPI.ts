import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY_4;

// let currentKeyIndex = 0;

// function getCurrentApiKey() {
//   return apiKeys[currentKeyIndex] ?? '';
// }

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apiKey: apiKey },
});

// async function axiosGetWithFailover(url: string, params: Record<string, unknown>) {
//   let attempts = 0;

//   while (attempts < apiKeys.length) {
//     try {
//       const res = await instance.get(url, {
//         headers: { apikey: getCurrentApiKey() },
//         params,
//       });
//       return res.data;
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         const axiosErr = err as AxiosError;
//         if (axiosErr.response?.status === 429) {
//           console.warn(`Key ${currentKeyIndex + 1} quota exceeded, switching to next key...`);
//           currentKeyIndex = (currentKeyIndex + 1) % apiKeys.length;
//           attempts++;
//           continue;
//         }
//         throw axiosErr;
//       }
//       throw new Error('An unexpected error occurred');
//     }
//   }

//   throw new Error('All API keys have exceeded their limits.');
// }

interface ConvertCredentials {
  from: string;
  to: string;
  amount: number;
}

export const exchangeCurrency = async (credentials: ConvertCredentials) => {
  console.log(credentials);
  const { data } = await instance('/convert', {
    params: credentials,
  });
  console.log(data);
  return { ...data.query, rate: data.info.rate, result: data.result };
};

export const latestRates = async (baseCurrency: string) => {
  const { data } = await instance('/latest', { params: { base: baseCurrency } });
  return Object.entries(data.rates);
};
