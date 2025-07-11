import axios from 'axios';

const apiKey = process.env.NEXT_PUBLIC_API_LAYER_API_KEY;

const instance = axios.create({
  baseURL: 'https://api.apilayer.com/exchangerates_data/',
  headers: { apikey: apiKey ?? '' },
});

export const exchangeCurrency = async (credentials) => {
  const {
    data: { query, info, result },
  } = await instance.get('/convert', {
    params: credentials,
  });

  return { ...query, rate: info.rate, result };
};

export const latestRates = async (baseCurrency) => {
  const { data } = await instance.get(`/latest?symbols&base=${baseCurrency}`);

  return Object.entries(data.rates);
};
