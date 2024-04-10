"use client";

import styles from "./CardFooter.module.scss";
import { ViewType } from "../../../../enums/viewTypeEnum";
import classNames from "classnames";
import { WeatherCardFooterPropsType } from "./types";
import { AutocompleteCitySearch } from "@/app/components/header/search-form/autocomplete";
import {
  changeViewtype,
  getWeatherData,
} from "@/redux/features/weatherData-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

const buttonsArray = [
  { label: "Table", value: ViewType.Table },
  { label: "Graph", value: ViewType.Graph },
  { label: "Map", value: ViewType.Map },
];

export const CardFooter = ({ viewType, index }: WeatherCardFooterPropsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleViewTypeChange = (viewType: ViewType) => {
    dispatch(changeViewtype({ viewType, index }));
  };

  const handleSubmit = (fieldValue: string) => {
    if (fieldValue) {
      dispatch(getWeatherData({ cityName: fieldValue, index })); // индекс - для сравнения на графике
    }
  };

  return (
    <div
      className={classNames({
        [styles.card_footer]: true,
        [styles.card_footer_graph]: viewType === ViewType.Graph,
      })}
    >
      <div
        className={classNames({
          [styles.search_field]: true,
          [styles.search_field_active]: viewType === ViewType.Graph,
        })}
      >
        {viewType === ViewType.Graph && (
          <AutocompleteCitySearch
            handleSubmit={handleSubmit}
            label="Compare with..."
            submitButtonLabel="Compare"
          />
        )}
      </div>
      <div
        className={classNames({
          [styles.group_btn_wrapper]: true,
        })}
      >
        {buttonsArray.map(({ value, label }) => (
          <button
            className={classNames({
              [styles.button]: true,
              [styles.btn_active]: value === viewType,
            })}
            key={value}
            onClick={() => handleViewTypeChange(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
