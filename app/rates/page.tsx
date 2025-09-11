//app/rates/page.tsx

'use client';

import { useEffect } from 'react';
import { Wave } from 'react-animated-text';

import Container from '@/components/Container/Container';
import Section from '@/components/Section/Section';
import Heading from '@/components/Heading/Heading';
import RatesList from '@/components/RatesList/RatesList';
import Filter from '@/components/Filter/Filter';
import { useExchangeStore } from '@/lib/stores/exchangeStore';
import useCurrencyStore from '@/lib/stores/currencyStore';

import css from './RatesPage.module.css';

export default function RatesPage() {
  const { rates, isLoading, isError, fetchRates, setFilter } = useExchangeStore();
  const { baseCurrency } = useCurrencyStore();

  useEffect(() => {
    fetchRates();
  }, [fetchRates, baseCurrency]);

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading
            info
            bottom
            title={
              <Wave
                text={`$ $ $ Current exchange rate for 1 ${'UAH'} $ $ $`}
                effect="fadeOut"
                effectChange={4.0}
              />
            }
          />

          <Filter setFilter={setFilter} />

          {/* Loading status */}
          {isLoading && (
            <div className={css.loading}>
              <p>Loading rates...</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <Heading error title="Something went wrong...😐 We cannot show current rates!" />
          )}

          {/* Rates list */}
          {!isLoading && !isError && <RatesList rates={rates}/>}
        </Container>
      </Section>
    </main>
  );
}
