// react
import Select, { SingleValue } from 'react-select';
import { useState } from 'react';
// libraries
import symbols from './symbols.json';
// styles
import './ReactSelect.css';
import styles from './SelectRates.module.css';

type OptionType = {
  value: string;
  label: string;
};

interface SelectRatesProps {
  baseCurrency: string;
  // ✔ Add setBaseCurrency prop here !!!
  setBaseCurrency?: (currency: string) => void;
}

export default function SelectRates({ baseCurrency, setBaseCurrency }: SelectRatesProps) {
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>(null);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <div className={styles.box}>
      <p className={styles.text}>Your base currency:&nbsp;</p>
      <Select
        className={styles.select}
        classNamePrefix="react-select"
        value={{
          label: baseCurrency,
          value: baseCurrency,
        }}
        defaultValue={selectedOption}
        onChange={handleChange}
        options={symbols}
        isSearchable
      />
    </div>
  );
}
