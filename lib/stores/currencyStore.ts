// lib\stores\currencyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = string;

type CurrencyStore = {
  currency: Currency | undefined;
  setCurrency: (newCurrency: Currency) => void;
  isHydrated: boolean;
  setHydrated: (state: boolean) => void;
};

const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      currency: undefined,
      isHydrated: false,
      setCurrency: (newCurrency: Currency) => set({ currency: newCurrency }),
      setHydrated: (state: boolean) => set({ isHydrated: state }),
    }),
    {
      name: 'app-currency',
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);

export default useCurrencyStore;
