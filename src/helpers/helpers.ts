import { TemperatureUnit } from "@/app/enums/temperatureEnum";

export const pressureConversion = (pressureInHPA: number) => {
  const pressureInMMHG: number = pressureInHPA / 1.33322;
  return pressureInMMHG;
};

export const iconUrl = (url: string) => {
  return `https://openweathermap.org/img/wn/${url}@2x.png`;
};

export const getTime = (dateOptions: Intl.DateTimeFormatOptions) =>
  new Date().toLocaleString("en-US", dateOptions);

export const getWeekDay = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return days[date.getDay()];
};

export const getDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  const month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;

  return `${day}.${month}`;
};

export const kelvinToFarenheit = (temp: number) => {
  return (temp = ((temp - 273.15) * 9) / 5 + 32);
};

export const kelvinToCelcius = (temp: number) => {
  return (temp -= 273.15);
};

export const changeTemperatureUnit = (temp: number, tempUnit: string) => {
  let temperature = temp;

  if (tempUnit === TemperatureUnit.Farenheit) {
    temperature = kelvinToFarenheit(temp);
    return `${temperature.toFixed()}`;
  }

  temperature = kelvinToCelcius(temp);

  return `${temperature.toFixed()}`;
};

export const regString = new RegExp(/^[a-zA-Z_А-Яа-я ()-]*$/);
