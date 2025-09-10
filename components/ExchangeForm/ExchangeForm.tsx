'use client';

import { RiExchangeDollarFill } from 'react-icons/ri';

import styles from './ExchangeForm.module.css';
import { useState } from 'react';

type ExchangeFormProps = {
  onSubmit: (data: { from: string; to: string; amount: number }) => void;
};

export default function ExchangeForm({ onSubmit }: ExchangeFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regex = /^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$/;
    if (!regex.test(input)) return alert('Invalid format!');

    const [amountStr, from, , to] = input.split(' ');
    const amount = parseFloat(amountStr);

    onSubmit({ amount, from, to });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <button className={styles.button} type="submit">
        <RiExchangeDollarFill className={styles.icon} />
      </button>

      <input
        type="text"
        pattern="^\d+(\.\d{1,2})?\s[a-zA-Z]{3}\sin\s[a-zA-Z]{3}$"
        placeholder="15 USD in UAH"
        title="Request format 15 USD in UAH"
        className={styles.input}
        name="currency"
        required
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </form>
  );
}
