import { ExchangeState } from '@/types/exchangeState';
import { exchangeCurrency, latestRates } from '../service/exchangeAPI';
import { create } from 'zustand';

export const useExchangeStore = create<ExchangeState>((set, get) => ({
  baseCurrency: '',
  exchangeInfo: null,
  rates: [],
  isLoading: false,
  isError: false,
  filter: '',

  setBaseCurrency: (currency) => set({ baseCurrency: currency }),
  setFilter: (value: string) => set({ filter: value }),

  convert: async (credentials) => {
    try {
      set({ isLoading: true, isError: false });
      const data = await exchangeCurrency(credentials);
      set({ exchangeInfo: data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isError: true, isLoading: false, exchangeInfo: null });
    }
  },
  fetchRates: async () => {
    const baseCurrency = get().baseCurrency || 'USD';
    try {
      set({ isLoading: true, isError: false });
      const rates = (await latestRates(baseCurrency)) as [string, number][];
      const filter = get().filter;

      const filtered = rates
        .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
        .map(([key, value]) => ({
          key,
          value: (1 / value).toFixed(2),
        }));

      set({ rates: filtered, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isError: true, isLoading: false });
    }
  },
}));
