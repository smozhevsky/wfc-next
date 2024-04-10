import styles from "./ToggleBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { toggleTemp } from "@/redux/features/temperature-slice";
import { AppDispatch, RootState } from "@/redux/store";
import { TemperatureUnit } from "../../../enums/temperatureEnum";

export const ToggleBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tempUnit = useSelector(
    (state: RootState) => state.temperatureReducer.unit
  );

  const handleTogglerClick = () => {
    dispatch(
      toggleTemp(
        tempUnit === TemperatureUnit.Celcius
          ? TemperatureUnit.Farenheit
          : TemperatureUnit.Celcius
      )
    );
  };

  return (
    <div className={styles.toggle_button_wrapper}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-15 0 64 64" width="50">
        <path
          fill="#374151"
          d="M27 30a3.75 3.75 0 01-2.75 1.18A3.8 3.8 0 0121.48 30a3.91 3.91 0 012.78-6.69A3.89 3.89 0 0127 30zm-4-1.54a1.65 1.65 0 001.22.51 1.69 1.69 0 001.22-.51 1.61 1.61 0 00.51-1.2 1.71 1.71 0 00-.5-1.23 1.65 1.65 0 00-1.23-.52A1.63 1.63 0 0023 26a1.68 1.68 0 00-.51 1.23 1.61 1.61 0 00.51 1.19zM32 24.79a7.12 7.12 0 015.08-1.67c3.4 0 5.58 1.34 6.52 4a.72.72 0 01-.5 1.05l-1.32.46a.88.88 0 01-.65 0 1 1 0 01-.38-.54c-.53-1.48-1.75-2.21-3.67-2.21a4.19 4.19 0 00-2.85.87 3.23 3.23 0 00-1 2.54v5.3a3.24 3.24 0 001 2.54 4.09 4.09 0 002.85.89c1.9 0 3.12-.74 3.67-2.23a1 1 0 01.41-.56.75.75 0 01.64.06l1.3.45a.75.75 0 01.53 1.06q-1.43 4-6.55 4A7.17 7.17 0 0132 39.21a6 6 0 01-1.79-4.59v-5.26A5.94 5.94 0 0132 24.79z"
        />
      </svg>
      <input
        type="checkbox"
        className={styles.toggle_button}
        onClick={handleTogglerClick}
      />
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="15 0 64 64" width="50">
        <path
          fill="#374151"
          d="M27.91 30.06a3.88 3.88 0 01-5.53 0 3.95 3.95 0 010-5.57 3.85 3.85 0 012.8-1.13 3.88 3.88 0 013.91 3.92 3.84 3.84 0 01-1.18 2.78zm-4-1.54a1.63 1.63 0 001.22.5 1.65 1.65 0 001.21-.5 1.61 1.61 0 00.52-1.2 1.71 1.71 0 00-.51-1.24 1.71 1.71 0 00-2.44 0 1.71 1.71 0 00-.51 1.24 1.64 1.64 0 00.54 1.2zM42.58 23.76a.83.83 0 01.2.63v1.18a.83.83 0 01-.2.63.91.91 0 01-.64.18h-7.35v4.42h6.17a1 1 0 01.65.18.84.84 0 01.19.64v1.17a.89.89 0 01-.18.64.93.93 0 01-.66.18h-6.17v6.19a.91.91 0 01-.18.64.88.88 0 01-.63.18h-1.37a.94.94 0 01-.65-.18.86.86 0 01-.19-.64V24.39a.83.83 0 01.19-.63.94.94 0 01.65-.18h9.53a.91.91 0 01.64.18z"
        />
      </svg>
    </div>
  );
};
