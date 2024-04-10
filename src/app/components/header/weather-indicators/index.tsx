import { pressureConversion } from "@/helpers/helpers";
import { IndicatorsType } from "./types";
import styles from "./WeatherIndicators.module.scss";
import { Pressure } from "@/assets/svgIcons/Pressure";
import { Wind } from "@/assets/svgIcons/Wind";
import { Humidity } from "@/assets/svgIcons/Humidity";

export const WeatherIndicators = ({
  humidity,
  pressure,
  windSpeed,
}: IndicatorsType) => (
  <div className={styles.weather_indicators_wrapper}>
    <div className={styles.weather_indicator} title="Pressure">
      <Pressure />
      {`${pressureConversion(pressure).toFixed()} mmHg`}
    </div>
    <div className={styles.weather_indicator} title="Wind speed">
      <Wind />
      {`${windSpeed.toFixed()} m/s`}
    </div>
    <div className={styles.weather_indicator} title="Humidity">
      <Humidity /> {humidity} &#37;
    </div>
  </div>
);
