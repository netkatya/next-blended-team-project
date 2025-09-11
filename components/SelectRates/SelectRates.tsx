'use client';

// react
import Select, { SingleValue } from 'react-select';
import { useEffect, useState } from 'react';
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
  setBaseCurrency: (currency: string) => void;
}

export default function SelectRates({ baseCurrency, setBaseCurrency }: SelectRatesProps) {
  const [selectedOption, setSelectedOption] = useState<SingleValue<OptionType>>({value: baseCurrency, label: baseCurrency});

  useEffect(() => {
    setSelectedOption({
      value: baseCurrency,
      label: baseCurrency
    });
  }, [baseCurrency]);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedOption(selectedOption);
    if (selectedOption) {
      setBaseCurrency(selectedOption.value);
      console.log(`Currency changed to:`, selectedOption.value);
    }
    
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
        placeholder="Select currency..."
      />
    </div>
  );
}
