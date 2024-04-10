"use client";

import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useState,
  FormEvent,
} from "react";
import styles from "./SearchForm.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchType } from "../../../enums/searchTypeEnum";
import classNames from "classnames";
import TextField from "@mui/material/TextField";
import { CircularProgress } from "@mui/material/";
import { AutocompleteCitySearch } from "./autocomplete";
import { getWeatherData } from "@/redux/features/weatherData-slice";

const buttonsArray = [
  { label: "City name", value: SearchType.CityName },
  { label: "Coordinates", value: SearchType.Coordinates },
  { label: "ZIP code", value: SearchType.ZipCode },
];

export const SearchForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [zipCountry, setZipCountry] = useState("");
  const [searchType, setSearchType] = useState(SearchType.CityName);

  const isLoadingWeatherData = useSelector(
    (state: RootState) => state.weatherDataReducer.isLoading
  );

  const handleInputChange =
    (handleStateFunc: Dispatch<SetStateAction<string>>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      handleStateFunc(event.target.value);
    };

  const handleAutocompleteFormSubmit = (fieldValue: string) => {
    if (fieldValue) {
      dispatch(getWeatherData({ cityName: fieldValue }));
    }
  };

  const handleCoordsZipFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (latitude && longitude) {
      dispatch(getWeatherData({ latitude, longitude }));
      setLatitude("");
      setLongitude("");
    }

    if (zipCode && zipCountry) {
      dispatch(getWeatherData({ zipCode, zipCountry }));
      setZipCode("");
      setZipCountry("");
    }
  };

  const handleChangeSearchType = (type: SearchType) => setSearchType(type);

  return (
    <div className={styles.main_wrapper}>
      <div className={styles.group_btn_wrapper}>
        {buttonsArray.map(({ value, label }) => (
          <button
            className={classNames({
              [styles.button]: true,
              [styles.active]: value === searchType,
            })}
            onClick={() => handleChangeSearchType(value)}
            key={value}
          >
            {label}
          </button>
        ))}
      </div>
      {searchType === SearchType.CityName && (
        <AutocompleteCitySearch
          handleSubmit={handleAutocompleteFormSubmit}
          label="Enter the city name"
          submitButtonLabel="Get weather"
        />
      )}
      {searchType === SearchType.Coordinates && (
        <form
          className={styles.search_form}
          onSubmit={handleCoordsZipFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label="lat"
            variant="outlined"
            size="small"
            sx={{ width: 81 }}
            onChange={handleInputChange(setLatitude)}
            value={latitude}
          />
          <TextField
            id="outlined-basic"
            label="lon"
            variant="outlined"
            size="small"
            sx={{ width: 81 }}
            onChange={handleInputChange(setLongitude)}
            value={longitude}
          />
          <button
            type="submit"
            className={classNames({
              [styles.button]: true,
              [styles.btn_submit]: true,
            })}
          >
            {isLoadingWeatherData ? (
              <CircularProgress color="inherit" size={14} />
            ) : (
              "Get weather"
            )}
          </button>
        </form>
      )}
      {searchType === SearchType.ZipCode && (
        <form
          className={styles.search_form}
          onSubmit={handleCoordsZipFormSubmit}
        >
          <TextField
            id="outlined-basic"
            label="zip code"
            variant="outlined"
            size="small"
            sx={{ width: 81 }}
            onChange={handleInputChange(setZipCode)}
            value={zipCode}
          />
          <TextField
            id="outlined-basic"
            label="country"
            variant="outlined"
            size="small"
            sx={{ width: 81 }}
            onChange={handleInputChange(setZipCountry)}
            value={zipCountry}
          />
          <button
            type="submit"
            className={classNames({
              [styles.button]: true,
              [styles.btn_submit]: true,
            })}
          >
            {isLoadingWeatherData ? (
              <CircularProgress color="inherit" size={14} />
            ) : (
              "Get weather"
            )}
          </button>
        </form>
      )}
    </div>
  );
};
