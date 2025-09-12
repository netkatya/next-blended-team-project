import styles from './Filter.module.css';

interface FilterProps {
  setFilter?: (filter: string) => void;
}

export default function Filter({ setFilter }: FilterProps) {
  return (
    <input type="text" placeholder="What currency are you looking for?" className={styles.input} />
  );
}
