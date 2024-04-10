"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { TemperatureUnit } from "@/app/enums/temperatureEnum";
import { changeTemperatureUnit } from "@/helpers/helpers";

export const Temperature = ({ temp }: { temp: number }) => {
  const tempUnit = useSelector(
    (state: RootState) => state.temperatureReducer.unit
  );
  return (
    <>
      {`${changeTemperatureUnit(temp, tempUnit)}${
        tempUnit === TemperatureUnit.Celcius ? "\u00B0C" : "\u00B0F"
      }`}
    </>
  );
};
