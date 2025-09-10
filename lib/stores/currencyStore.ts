// lib\stores\currencyStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Currency = string;

type CurrencyState = {
  baseCurrency: Currency | undefined;
  setBaseCurrency: (newCurrency: Currency) => void;
  hasHydrated: boolean;
  setHydrated: (state: boolean) => void;
};

const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      baseCurrency: undefined,
      hasHydrated: false,
      setBaseCurrency: (newCurrency: Currency) => set({ baseCurrency: newCurrency }),
      setHydrated: (state: boolean) => set({ hasHydrated: state }),
    }),
    {
      name: 'currency-storage',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

export default useCurrencyStore;
