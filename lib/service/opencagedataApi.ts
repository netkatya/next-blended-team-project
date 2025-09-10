import axios from 'axios';

interface Props {
  latitude: number;
  longitude: number;
}

export const getUserInfo = async ({ latitude, longitude }: Props) => {
  const apiKey = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY;
  const urlPosition = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}`;

  const { data } = await axios.get(urlPosition, {
    params: {
      key: apiKey,
      language: 'en',
    },
  });

  return data;
};
