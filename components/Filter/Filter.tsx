import styles from './Filter.module.css';

export default function Filter() {
  return (
    <input
      type="text"
      placeholder="What currency are you looking for?🧐"
      className={styles.input}
    />
  );
}
