//app/rates/page.tsx

'use client';

import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import { latestRates } from '@/lib/service/exchangeAPI';
import Filter from '@/components/Filter/Filter';
import { useExchangeStore } from '@/lib/stores/exchangeStore';
import css from './RatesPage.module.css';
import RatesList from '@/components/RatesList/RatesList';
import useCurrencyStore from '@/lib/stores/currencyStore';
import { useEffect, useState } from 'react';

// type Rate = [string, number];

export default function RatesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { baseCurrency, hasHydrated, rates, setRates, isError, setIsError } = useCurrencyStore();
  const { filter, setFilter } = useExchangeStore();

  useEffect(() => {
    async function fetchRates() {
      if (!baseCurrency) return;
      try {
        setIsLoading(true);
        const rates = await latestRates(baseCurrency);
        if (setRates) {
          setRates(rates);
          setIsError(false);
        }
      } catch (error) {
        console.error('Error fetching rates:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, [baseCurrency]);

  if (!hasHydrated) return null;

  const filteredRates = rates
    .filter(([key]) => key !== baseCurrency && key.toLowerCase().includes(filter.toLowerCase()))
    .map(([key, value]) => ({ key, value: (1 / Number(value)).toFixed(2) }));

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            title={
              hasHydrated && (
                <Wave
                  text={`$ $ $ Current exchange rate for 1 ${baseCurrency || 'UAH'} $ $ $`}
                  effect="fadeOut"
                  effectChange={4.0}
                />
              )
            }
          />
          {isLoading ? (
            <Heading title="Loading rates..." />
          ) : (
            <>
              <Filter setFilter={setFilter} />

              {/* Loading status */}
              {isLoading && (
                <div className={css.loading}>
                  <p>Loading rates...</p>
                </div>
              )}

              {/* Error */}
              {isError && (
                <Heading title="Something went wrong...😐 We cannot show current rates!" />
              )}
            </>
          )}

          {/* Rates list */}
          {!isLoading && !isError && filteredRates.length > 0 && (
            <RatesList rates={filteredRates} />
          )}
        </Container>
      </Section>
    </main>
  );
}
