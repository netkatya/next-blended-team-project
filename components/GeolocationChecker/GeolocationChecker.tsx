'use client';
// react
import { useEffect } from 'react';
// lib
import { getUserInfo } from '@/lib/service/opencagedataApi';
// store
import useCurrencyStore from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { currency, isHydrated, setCurrency } = useCurrencyStore();

  useEffect(() => {
    if (isHydrated && !currency) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      };

      const success = async ({ coords }: GeolocationPosition) => {
        const data = await getUserInfo(coords);
        const currencyCode = data.results[0].annotations.currency.iso_code;
        setCurrency(currencyCode);
      };

      const error = () => {
        console.warn('GeolocationPosition ERROR');
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }, [isHydrated, currency]);

  return (
    <div>{currency ? <p>Your currency is: {currency}</p> : <p>Detecting your currency...</p>}</div>
  );
}
