"use client";

import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { useState, FormEvent, useContext, useEffect } from "react";
import { AutocompletePropsType } from "./types";
import { Autocomplete } from "@mui/material";
import { Chip } from "@mui/material";
import styles from "../SearchForm.module.scss";
import classNames from "classnames";
import { useDebounce } from "./useDebounce";
import { CitiesNamesContext } from "@/app/context/citiesNamesContext";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { regString } from "@/helpers/helpers";
import { useDispatch } from "react-redux";
import { cleanWeatherDataError } from "@/redux/features/weatherData-slice";

export const AutocompleteCitySearch = ({
  submitButtonLabel,
  handleSubmit,
  label,
}: AutocompletePropsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(false);
  const [isOptionsLoading, setIsOptionsLoading] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [fieldValue, setFieldValue] = useState("");

  const isLoading = useSelector(
    (state: RootState) => state.weatherDataReducer.isLoading
  );
  const isRequestSuccess = useSelector((state: RootState) => {
    const { isLoading, isLoaded, isError } = state.weatherDataReducer;
    return !isLoading && isLoaded && !isError;
  });
  const isRequestError = useSelector(
    (state: RootState) => state.weatherDataReducer.isError
  );
  const weatherData = useSelector(
    (state: RootState) => state.weatherDataReducer.panels
  );

  const debouncedValue = useDebounce(fieldValue, 700);
  const cities = useContext(CitiesNamesContext);

  const isDisabled = !regString.test(fieldValue);
  const availableCities = weatherData.map(({ cityName }) => cityName);
  const citiesForReplaceOptions = Array.from(new Set(availableCities));

  useEffect(() => {
    if (debouncedValue) {
      setIsOptionsLoading(true);
      const filterTimeout = setTimeout(() => {
        const result = cities.filter(
          (city: string) => city.indexOf(debouncedValue) !== -1
        );
        setIsOptionsLoading(false);

        setOptions(result);
      }, 500);

      return () => {
        clearTimeout(filterTimeout);
      };
    }
  }, [cities, debouncedValue]);

  useEffect(() => {
    if (isRequestSuccess) {
      setFieldValue("");
    }
  }, [isRequestSuccess]);

  const openCloseHandler = () => setOpen(!open);
  const validateField = (value: string) => !!regString.test(value);
  const handleInputChange = (value: string) => {
    if (isRequestError) {
      dispatch(cleanWeatherDataError());
    }

    if (!validateField(value)) {
      return;
    }

    setFieldValue(value);

    if (!value) {
      setOptions([]);
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(fieldValue);
  };

  return (
    <form className={styles.search_form} onSubmit={handleFormSubmit}>
      <Autocomplete
        size="small"
        sx={{ width: 162 }}
        open={open}
        onOpen={openCloseHandler}
        onClose={openCloseHandler}
        onBlur={() => setIsOptionsLoading(false)}
        onInputChange={(e, value) => handleInputChange(value)}
        inputValue={fieldValue}
        options={fieldValue ? options : citiesForReplaceOptions}
        loading={isOptionsLoading}
        freeSolo
        renderOption={(props, option) => {
          return (
            <li {...props} key={option}>
              {option}
            </li>
          );
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <Chip {...getTagProps({ index })} key={option} label={option} />
          ));
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={isRequestError}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isOptionsLoading ? (
                    <CircularProgress color="inherit" size={28} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      <button
        type="submit"
        disabled={isDisabled || isRequestError}
        className={classNames({
          [styles.button]: true,
          [styles.btn_submit]: true,
          [styles.btn_disabled]: isDisabled || isRequestError,
        })}
      >
        {isLoading ? (
          <CircularProgress color="inherit" size={14} />
        ) : (
          submitButtonLabel
        )}
      </button>
    </form>
  );
};
