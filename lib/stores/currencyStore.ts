// lib\stores\currencyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = string;

// type Rate = { key: string; value: string };
type Rate = [string, string];
type CurrencyState = {
  baseCurrency: Currency | undefined;
  setBaseCurrency: (newCurrency: Currency) => void;
  hasHydrated: boolean;
  setHydrated: (state: boolean) => void;
  rates: Rate[];
  setRates?: (rates: Rate[]) => void;
  exchangeInfo?: boolean;
  isLoading?: boolean;
  isError: boolean;
  setIsError: (state: boolean) => void;
};

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: undefined,
      hasHydrated: false,
      setBaseCurrency: (newCurrency) => set({ baseCurrency: newCurrency }),
      setHydrated: (state) => set({ hasHydrated: state }),
      rates: [],
      setRates: (rates) => set({ rates: rates }),
      exchangeInfo: false,
      isLoading: false,
      isError: false,
      setIsError: (state) => set({ isError: state }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({
        baseCurrency: state.baseCurrency,
        rates: state.rates,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default useCurrencyStore;
