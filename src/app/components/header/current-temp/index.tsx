"use client";

import { useEffect, useState } from "react";
import styles from "./CurrentTemp.module.scss";
import {
  getCurrentPosition,
  getWeather,
} from "../../../services/weather.service";
import { WeatherIndicators } from "../weather-indicators";
import { Clock } from "../clock";
import { Temperature } from "../temperature";

const initialState = {
  name: "",
  main: {
    temp: 0,
    humidity: 0,
    pressure: 0,
  },
  wind: {
    speed: 0,
  },
};

export default function CurrentTemp() {
  const [weatherData, setWeatherData] = useState(initialState);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition();
        const response: any = await getWeather({
          latitude,
          longitude,
        });
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const {
    name,
    main: { pressure, humidity, temp },
    wind: { speed },
  } = weatherData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper_inner}>
        {!!(name && temp) && (
          <>
            <div className={styles.city_temp_wrapper}>
              <div className={styles.city_name}>{name}</div>
              <div className={styles.temperature}>
                <Temperature temp={temp} />
              </div>
            </div>
            <div className={styles.datetime}>
              <Clock />
            </div>
          </>
        )}
      </div>
      {!!(pressure && humidity && speed) && (
        <div className={styles.weather_indicators}>
          <WeatherIndicators
            humidity={humidity}
            pressure={pressure}
            windSpeed={speed}
          />
        </div>
      )}
    </div>
  );
}
