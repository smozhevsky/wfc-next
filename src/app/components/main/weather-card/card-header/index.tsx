"use client";

import { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { WeatherCardHeaderPropsType } from "./types";
import styles from "./CardHeader.module.scss";
import { Temperature } from "@/app/components/header/temperature";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import { getTime } from "@/helpers/helpers";
import { removeWeatherDataItem } from "@/redux/features/weatherData-slice";

export const CardHeader = ({
  data,
  index,
  viewType,
  timezone,
}: WeatherCardHeaderPropsType) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const dispatch = useDispatch();

  const dateOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
  };

  const [forecastTime, setForecastTime] = useState(getTime(dateOptions));

  const {
    name,
    sys: { country },
    current: { temp, humidity, pressure, wind_speed },
  } = data[0];

  const handleCloseCard = () => {
    dispatch(removeWeatherDataItem(index));
  };

  const favouriteList: { name: string; viewType: string }[] = JSON.parse(
    localStorage.getItem("favourites") ?? "[]"
  );

  const favouriteCity = favouriteList.find(
    ({ name: favouriteCityName }: { name: string }) =>
      name === favouriteCityName
  );

  const handleStarClick = () => {
    if (!favouriteCity) {
      const cardData = {
        name,
        viewType,
      };

      favouriteList.push(cardData);
    } else {
      favouriteList.splice(favouriteList.indexOf(favouriteCity), 1);
    }

    setIsFavourite(!isFavourite);

    localStorage.setItem("favourites", JSON.stringify(favouriteList));
  };

  return (
    <div className={styles.card_header}>
      <div className={styles.city_weather_info}>
        <div
          className={classNames({
            [styles.city_name_overflow]: name.length >= 15,
          })}
          title={name.length >= 13 ? `${name}, ${country}` : ""}
        >
          {name}
          {name.length <= 13 && `, ${country}`}:
        </div>
        <span className={styles.temperature}>
          <Temperature temp={temp} />
        </span>
      </div>
      <div className={styles.weather_indicators}>
        <div className={styles.indicators_inner}>
          <p>
            P:
            <span className={styles.indicator} title="Pressure">
              {pressure}
            </span>
            mmHg
          </p>
          <p>
            V:
            <span className={styles.indicator} title="Wind speed">
              {wind_speed}
            </span>
            m/s
          </p>
          <p>
            H:
            <span className={styles.indicator} title="Humidity">
              {humidity}
            </span>
            %
          </p>
        </div>
      </div>
      {forecastTime}
      <div className={styles.btn_group}>
        <StarIcon
          onClick={handleStarClick}
          className={classNames({
            [styles.favourites]: true,
            [styles.favouriteBtnActive]: !!favouriteCity,
          })}
        />
        <CloseIcon onClick={handleCloseCard} className={styles.remove_button} />
      </div>
    </div>
  );
};
