'use client';

import { useEffect } from 'react';

import { getUserInfo } from '@/lib/service/opencagedataApi';

export default function GeolocationChecker() {
  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = async ({ coords }: GeolocationPosition) => {
      const data = await getUserInfo(coords);
      return data.results[0].annotations.currency.iso_code;
    };

    const error = () => {};

    navigator.geolocation.getCurrentPosition(success, error, options);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const data = await getUserInfo({ latitude, longitude });
        console.log(data.results[0].annotations.currency.iso_code);
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return null;
}
