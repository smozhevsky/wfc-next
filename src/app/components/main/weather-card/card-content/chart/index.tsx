"use client";

import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ChartPropsType } from "./types";
import styles from "./ChartContent.module.scss";
import { TemperatureUnit } from "../../../../../enums/temperatureEnum";
import { chartsColors } from "@/assets/styles/chartColors";
import { changeTemperatureUnit, getDate, getWeekDay } from "@/helpers/helpers";

export const ChartContent = ({ data }: ChartPropsType) => {
  const tempUnit = useSelector(
    (state: RootState) => state.temperatureReducer.unit
  );

  const { daily } = data[0];

  const chartData = {
    labels: daily.map(({ dt }: { dt: number }) => [
      getWeekDay(dt),
      getDate(dt),
    ]),
    datasets: data.map(({ name, daily }) => {
      return {
        label: name,
        data: daily.map(({ temp: { day } }) =>
          changeTemperatureUnit(day, tempUnit)
        ),
        fill: false,
        backgroundColor: chartsColors.map(({ code }) => code),

        borderColor: chartsColors.map(({ border }) => border),
      };
    }),
  };

  const temperatureTooltip = (tooltipItems: any[]) => {
    let temp = 0;
    tooltipItems.forEach(function (tooltipItem) {
      temp = tooltipItem.parsed.y;
    });
    return `${temp} ${
      tempUnit === TemperatureUnit.Celcius ? "\u00B0C" : "\u00B0F"
    }`;
  };

  const options = {
    responsive: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: () => null,
          title: () => null,
          footer: temperatureTooltip,
        },
        padding: 10,
        footerAlign: "center",
      },
    },
    animation: {
      duration: 0,
    },
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className={styles.chart_inner}>
      {/* <Line data={chartData} options={options} height={220} width={615} /> */}
      chart
    </div>
  );
};
