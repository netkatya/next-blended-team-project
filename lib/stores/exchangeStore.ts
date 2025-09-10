import { exchangeCurrency, latestRates } from "../service/exchangeAPI";
import { create } from "zustand";

type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

type ExchangeState = {
  baseCurrency: string;
  exchangeInfo: ExchangeInfo | null;
  isLoading: boolean;
  isError: boolean;
  setBaseCurrency: (currency: string) => void;
  convert: (data: { from: string; to: string; amount: number }) => Promise<void>;
};

export const useExchangeStore = create<ExchangeState>((set, get) => ({
    baseCurrency: "",
    exchangeInfo: null,
    rates: [],
    isLoading: false,
    isError: false,

    setBaseCurrency: (currency) => set({ baseCurrency: currency }),
    
    convert: async (credentials) => {
        try {
            set({ isLoading: true, isError: false });
            const data = await exchangeCurrency(credentials);
            set({ exchangeInfo: data, isLoading: false });
        } catch (err) {
            console.error(err);
            set({ isError: true, isLoading: false, exchangeInfo: null })
        }
    }
    fetchRates: async () => {
        const baseCurrency = get().baseCurrency || "USD";
        try {
            set({ isLoading: true, isError: false });
            const rates = await latestRates(baseCurrency);

            const filtered = rates.filter(([key]) => key !== baseCurrency)
                .map(([key, value]) => ({
                    key,
                    value: (1 / value).toFixed(2),
                }))
            
            set({ rates: filtered, isLoading: false });
        } catch (err) {
            console.error(err);
            set({ isError: true, isLoading: false });
        }
    }
}))
