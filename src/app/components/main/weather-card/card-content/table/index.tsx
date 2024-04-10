import { Temperature } from "@/app/components/header/temperature";
import { WeatherCardTablePropsType } from "./types";
import styles from "./WeatherCardTable.module.scss";
import { getDate, getWeekDay, iconUrl } from "@/helpers/helpers";
import Image from "next/image";

export const TableContent = ({ daily }: WeatherCardTablePropsType) => {
  return (
    <div className={styles.daily}>
      {daily.map(
        ({
          sunrise,
          sunset,
          temp: { day },
          dt,
          weather: [{ icon, main, description }],
        }) => {
          return (
            <div
              key={`key${sunrise}${sunset}`}
              className={styles.daily_forecast_wrapper}
            >
              <div className={styles.date}>
                <p>{getWeekDay(dt)}</p>
                <p>{getDate(dt)}</p>
              </div>
              <Image
                src={iconUrl(icon)}
                alt={main}
                title={description}
                className={styles.weather_icon}
                width={100}
                height={100}
              />
              <div className={styles.temperature}>
                <Temperature temp={day} />
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
