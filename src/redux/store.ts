import { configureStore } from "@reduxjs/toolkit";
import temperatureReducer from "./features/temperature-slice";
import weatherDataReducer from "./features/weatherData-slice";

export const store = configureStore({
  reducer: { temperatureReducer, weatherDataReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
