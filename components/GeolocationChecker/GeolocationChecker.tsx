'use client';
// react
import { useEffect } from 'react';
// lib
import { getUserInfo } from '@/lib/service/opencagedataApi';
// store
import useCurrencyStore from '@/lib/stores/currencyStore';

export default function GeolocationChecker() {
  const { baseCurrency, hasHydrated, setBaseCurrency } = useCurrencyStore();

  useEffect(() => {
    if (!hasHydrated || baseCurrency) return;

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);
      const currencyCode = data.results[0].annotations.currency.iso_code;
      setBaseCurrency(currencyCode);
    };

    const error = () => {
      setBaseCurrency('USD');
    };

    navigator.geolocation.getCurrentPosition(success, error, options);
  }, [hasHydrated, baseCurrency]);

  return null;
}
