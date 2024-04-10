import { TemperatureUnit } from "@/app/enums/temperatureEnum";
import { createSlice } from "@reduxjs/toolkit";

type TemperatureStateType = {
  unit: string;
};

const initialState: TemperatureStateType = {
  unit: TemperatureUnit.Celcius,
};

export const temperatureUnitSlice = createSlice({
  name: "temperature_unit",
  initialState,
  reducers: {
    toggleTemp: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const { toggleTemp } = temperatureUnitSlice.actions;

export default temperatureUnitSlice.reducer;
