'use client';

import Link from 'next/link';
import { MdCurrencyExchange } from 'react-icons/md';
import { usePathname } from 'next/navigation';

import styles from './Header.module.css';

export default function Header() {
  const pathname = usePathname();

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

      {/* ✔ Add base currency here !!! */}
    </header>
  );
}
