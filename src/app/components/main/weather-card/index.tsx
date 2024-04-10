import styles from "./WeatherCard.module.scss";
import { CardContent } from "./card-content";
import { CardFooter } from "./card-footer";
import { CardHeader } from "./card-header";
import { WeatherCardPropsType } from "./types";

export const WeatherCard = ({
  data,
  index,
  viewType,
  timezone,
}: WeatherCardPropsType) => {
  return (
    <article className={styles.card} key={index}>
      <CardHeader
        data={data}
        index={index}
        viewType={viewType}
        timezone={timezone}
      />
      <CardContent data={data} viewType={viewType} />
      <CardFooter viewType={viewType} index={index} />
    </article>
  );
};
