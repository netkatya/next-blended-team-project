'use client';
import { JSX, useEffect, useState } from 'react';
import styles from './CurrencyRain.module.css';

const symbols = ['$', '€', '₴', '£'];

export default function CurrencyRain() {
  const [items, setItems] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 10 }).map((_, i) => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const left = `${Math.random() * 100}vw`;
      const duration = `${10 + Math.random() * 6}s`;
      const delay = `${Math.random() * 5}s`;

      return (
        <span
          key={i}
          className={styles.currency}
          style={{ left, animationDuration: duration, animationDelay: delay }}
        >
          {symbol}
        </span>
      );
    });
    setItems(generated);
  }, []); // useEffect = только на клиенте

  return <div className={styles.rainContainer}>{items}</div>;
}
