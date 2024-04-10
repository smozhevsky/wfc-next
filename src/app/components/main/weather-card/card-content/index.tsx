import styles from "../WeatherCard.module.scss";
import { ViewType } from "../../../../enums/viewTypeEnum";
import { WeatherCardMainPropsType } from "./types";
import { TableContent } from "./table";
import { ChartContent } from "./chart";
// import { ChartContent } from './ChartContent';
// import { MapContent } from './MapContent';

export const CardContent = ({ viewType, data }: WeatherCardMainPropsType) => {
  const { daily } = data[0];

  return (
    <div className={styles.card_main}>
      {viewType === ViewType.Table && <TableContent daily={daily} />}
      {/* {viewType === ViewType.Graph && <ChartContent data={data} />} */}
      {/* {viewType === ViewType.Map && <MapContent data={data} />} */}
    </div>
  );
};
