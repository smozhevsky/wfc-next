import { ViewType } from "@/app/enums/viewTypeEnum";
import { getDailyForecast, getWeather } from "@/app/services/weather.service";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type WeatherDataType = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [{ main: string; description: string; icon: string }];
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: string;
  id: number;
  viewType: string;
  uniqueId: string;
  current: {
    temp: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
  };
  daily: [
    {
      clouds: number;
      dew_point: number;
      dt: number;
      feels_like: { day: number; night: number; eve: number; morn: number };
      humidity: number;
      moon_phase: number;
      moonrise: number;
      moonset: number;
      pop: number;
      pressure: number;
      rain: number;
      sunrise: number;
      sunset: number;
      temp: {
        day: number;
        min: number;
        max: number;
        night: number;
        eve: number;
        morn: number;
      };
      uvi: number;
      weather: [
        { id: number; main: string; description: string; icon: string }
      ];
      wind_deg: number;
      wind_gust: number;
    }
  ];
};

type PanelType = {
  data: WeatherDataType[];
  cityName: string;
  viewType: string;
  uniqueId: string;
  timezone: string;
};

type WeatherDataStateType = {
  isLoading: boolean;
  isLoaded: boolean;
  isError: boolean;
  panels: PanelType[];
};

const initialState: WeatherDataStateType = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  panels: [],
};

export const getWeatherData = createAsyncThunk(
  "getWeatherData",
  async (
    {
      zipCode,
      zipCountry,
      cityName,
      latitude,
      longitude,
      viewType = ViewType.Table,
      uniqueId = uuidv4(),
      index,
    }: {
      zipCode?: string;
      zipCountry?: string;
      cityName?: string;
      latitude?: string | number;
      longitude?: string | number;
      viewType?: string;
      uniqueId?: string;
      index?: number; // ++
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getWeather({
        cityName,
        latitude,
        longitude,
        zipCode,
        zipCountry,
      });
      const weatherData = await data?.json();
      const dailyData = await getDailyForecast(
        weatherData.coord.lat,
        weatherData.coord.lon
      );
      const dailyWeather = await dailyData.json();

      return {
        data: [
          {
            ...weatherData,
            daily: dailyWeather.daily,
            current: dailyWeather.current,
          },
        ],
        cityName: weatherData.name,
        viewType,
        uniqueId,
        timezone: dailyWeather.timezone,
      };
    } catch (err: any) {
      console.log("err: ", err);
      return rejectWithValue(!!err);
    }
  }
);

export const weatherDataSlice = createSlice({
  name: "weather_data",
  initialState,
  reducers: {
    cleanWeatherDataError: (state) => {
      state.isError = false;
      state.isLoaded = false;
    },
    removeWeatherDataItem: (state, action) => {
      state.panels.splice(action.payload, 1);
    },
    changeViewtype: (state, action) => {
      state.panels[action.payload.index].viewType = action.payload.viewType;
    },
    moveItems: (state, action) => {
      const newState = [...state.panels];
      const [reorderedItem] = newState.splice(action.payload.sourceIndex, 1);
      newState.splice(action.payload.destinationIndex, 0, reorderedItem);
      return {
        ...state,
        panels: newState,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getWeatherData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoaded = true;
        state.panels = [action.payload, ...state.panels];
      })
      .addCase(
        getWeatherData.rejected,
        // TODO: update PayloadAction type
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isLoaded = true;
          state.isError = action.payload;
        }
      );
  },
});

export const {
  cleanWeatherDataError,
  removeWeatherDataItem,
  changeViewtype,
  moveItems,
  // getWeatherDataToCompareRequest,
  // getWeatherDataToCompareSuccess,
  // getWeatherDataToCompareFailure,
} = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
