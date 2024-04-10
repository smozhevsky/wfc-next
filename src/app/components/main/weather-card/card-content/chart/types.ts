import { DailyWeatherForecastType } from '../../types';

export type ChartPropsType = {
  data: {
    name: string;
    sys: { country: string };
    current: {
      temp: number;
      humidity: number;
      pressure: number;
      wind_speed: number;
    };
    daily: DailyWeatherForecastType[];
  }[];
};
