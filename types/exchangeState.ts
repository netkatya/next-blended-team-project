export type ExchangeInfo = {
  to: string;
  from: string;
  amount: number;
  rate: number;
  result: number;
};

export type Rate = {
  key: string;
  value: string;
};

export type ExchangeState = {
  baseCurrency: string;
  exchangeInfo: ExchangeInfo | null;
  rates: Rate[];
  isLoading: boolean;
  isError: boolean;
  filter: string;
  setBaseCurrency: (currency: string) => void;
  setFilter: (value: string) => void;
  convert: (data: { from: string; to: string; amount: number }) => Promise<void>;
  fetchRates: () => Promise<void>;
};
