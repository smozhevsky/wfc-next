import { WeatherDataType } from "../../../types/WeatherDataType";

export type DailyWeatherForecastType = {
  sunrise: number;
  sunset: number;
  temp: { day: number };
  dt: number;
  weather: [
    {
      icon: string;
      main: string;
      description: string;
    }
  ];
};

export type WeatherCardPropsType = {
  data: WeatherDataType[];
  index: number;
  viewType: string;
  timezone: string;
};
