import Select, { SingleValue } from 'react-select';

import symbols from './symbols.json';

import './ReactSelect.css';
import styles from './SelectRates.module.css';

export default function SelectRates({ baseCurrency }) {
  const handleChange = (selectedOption: SingleValue<OptionType>) => {};

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select className={styles.select} classNamePrefix="react-select" isSearchable />
    </div>
  );
}
