import { PositionType } from "../components/header/current-temp/types";
import { cityNameService, weatherService } from "./API";

const API_WEATHER_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const getWeather = ({
  cityName,
  latitude,
  longitude,
  zipCode,
  zipCountry,
}: {
  cityName?: string;
  latitude?: number | string;
  longitude?: number | string;
  zipCode?: string | number;
  zipCountry?: string;
}) => {
  if (cityName) {
    return fetch(`/api/weather?address=${cityName}`);
  }

  if (latitude && longitude) {
    return fetch(`/api/weather?lat=${latitude}&lon=${longitude}`);
  }

  if (zipCode && zipCountry) {
    return fetch(`/api/weather?zip=${zipCode}&country=${zipCountry}`);
  }
};

export const getDailyForecast = (
  latitude: number | string,
  longitude: number | string
) => fetch(`/api/weather?onecall=${true}&lat=${latitude}&lon=${longitude}`);

export const getWeatherById = ({ id }: { id: number }) =>
  weatherService.get(`weather?id=${id}&appid=${API_WEATHER_KEY}`);

export const getCurrentPosition = (): Promise<PositionType> => {
  return new Promise((resolve) => {
    const onSuccess = ({
      coords: { latitude, longitude },
    }: GeolocationPosition) => {
      return resolve({ latitude, longitude });
    };

    const geoError = () => resolve({ latitude: 0, longitude: 0 });

    navigator.geolocation.getCurrentPosition(onSuccess, geoError, {
      maximumAge: 5 * 60 * 1000,
      timeout: 5000,
      enableHighAccuracy: false,
    });
  });
};

export const getCityName = () => fetch(`/api/cities`);
