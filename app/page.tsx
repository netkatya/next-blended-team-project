'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';
import ExchangeForm from '@/components/ExchangeForm/ExchangeForm';
import { useExchangeStore } from '@/lib/stores/exchangeStore';
import ExchangeInfo from '@/components/ExchangeInfo/ExchangeInfo';
import Loader from '@/components/Loader/Loader';

export default function Home() {
  const { exchangeInfo, isLoading, isError, convert } = useExchangeStore();

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <Heading info title="What currencies do you want to exchange?" />

          {isError && (
            <Heading error title="Something went wrong... Check the data validity and try again!" />
          )}
          <ExchangeForm onSubmit={convert} />
          {isLoading && <Loader />}
          {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        </Container>
      </Section>
    </main>
  );
}
