"use client";

import { getCurrentPosition, getWeather } from "@/app/services/weather.service";
import { Clock } from "../../header/clock";
import styles from "../../header/current-temp/CurrentTemp.module.scss";
import { Temperature } from "../../header/temperature";
import { WeatherIndicators } from "../../header/weather-indicators";
import { useEffect, useState } from "react";

const API_WEATHER_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

// const fetchData = async ({
//   latitude,
//   longitude,
// }: {
//   latitude: number | string;
//   longitude: number | string;
// }) => {
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_WEATHER_KEY}`;

//   try {
//     const response = await fetch(url, {
//       cache: "no-store",
//     });

//     const jsonData = await response.json();

//     return jsonData;
//   } catch (error) {
//     console.log("error: ", error);
//   }
// };

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

export default function ServerHeader() {
  const [weatherData, setWeatherData] = useState(initialState);

  useEffect(() => {
    (async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition();
        const response = await getWeather({
          latitude,
          longitude,
        });
        // setWeatherData(response?.data);
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
              <div className={styles.city_name}></div>
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
