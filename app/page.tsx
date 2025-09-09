'use client';

import Section from '@/components/Section/Section';
import Container from '@/components/Container/Container';
import Heading from '@/components/Heading/Heading';

import css from './page.module.css';

//my
import GeolocationChecker from '@/components/GeolocationChecker/GeolocationChecker';

export default function Home() {
  const isError = false;

  return (
    <main className={css.main}>
      <Section>
        <Container>
          <GeolocationChecker />
          <Heading info title="What currencies do you want to exchange?🙂" />

          {isError && (
            <Heading
              error
              title="Something went wrong...😐 Check the data validity and try again!"
            />
          )}
        </Container>
      </Section>
    </main>
  );
}
