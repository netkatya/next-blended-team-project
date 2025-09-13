import { useDebouncedCallback } from 'use-debounce';
import styles from './Filter.module.css';

interface FilterProps {
  setFilter: (filter: string) => void;
}

export default function Filter({ setFilter }: FilterProps) {
  const setDebouncedFilter = useDebouncedCallback((filter: string) => {
    setFilter(filter);
  }, 300);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDebouncedFilter((e.target as HTMLInputElement).value);
  };
  return (
    <input
      onChange={handleOnChange}
      type="text"
      placeholder="What currency are you looking for?"
      className={styles.input}
    />
  );
}
