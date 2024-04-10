import { WeatherDataType } from "../../../../types/WeatherDataType";

export type WeatherCardHeaderPropsType = {
  data: WeatherDataType[];
  index: number;
  viewType: string;
  timezone: string;
};
