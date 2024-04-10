import { WeatherDataType } from "@/redux/features/weatherData-slice";

export type WeatherCardStateType = {
  data: WeatherDataType[];
  viewType: string;
  uniqueId: string;
};
