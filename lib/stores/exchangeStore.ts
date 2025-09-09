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
