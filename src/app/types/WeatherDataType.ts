export type WeatherDataType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [{ main: string; description: string; icon: string }];
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: string;
  id: number;
  viewType: string;
  uniqueId: string;
  current: {
    temp: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
  };
  daily: [
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: { day: number; night: number; eve: number; morn: number };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      sunrise: number;
      sunset: number;
      temp: { day: number; min: number; max: number; night: number; eve: number; morn: number };
      uvi: number;
      weather: [{ id: number; main: string; description: string; icon: string }];
      wind_deg: number;
      wind_gust: number;
    },
  ];
};
