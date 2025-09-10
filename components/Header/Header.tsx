'use client';
// react & next
import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';
import { usePathname } from 'next/navigation';
// store
import useCurrencyStore from '@/lib/stores/currencyStore';
// Components
import SelectRates from '@/components/SelectRates/SelectRates';
// styles
import styles from './Header.module.css';


export default function Header() {
  const pathname = usePathname();
  const { baseCurrency, hasHydrated, setBaseCurrency } = useCurrencyStore();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <MdCurrencyExchange className={styles.logo} />
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link href="/" className={pathname === '/' ? styles.active : styles.link}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/rates" className={pathname === '/rates' ? styles.active : styles.link}>
                Rates
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {baseCurrency && <SelectRates baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />}

      {baseCurrency ? (
        <p className={styles.text}> Your base currency: {baseCurrency}</p>
      ) : (
        <p className={styles.text}>Detecting your currency...</p>
      )}
    </header>
  );
}
