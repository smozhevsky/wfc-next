"use client";

import styles from "./Sidebar.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { CircularProgress } from "@mui/material";
import { Trash } from "@/assets/svgIcons/Trash";
import CloseIcon from "@mui/icons-material/Close";
import { getWeatherData } from "@/redux/features/weatherData-slice";

export const Sidebar = ({
  isActive,
  toggleActive,
}: {
  isActive: boolean;
  toggleActive: () => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(
    (state: RootState) => state.weatherDataReducer.isLoading
  );
  // const favouriteList = JSON.parse(localStorage.getItem("favourites") ?? "[]");
  const [favourites, setFavourites] = useState<any>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const favouriteListLS = localStorage.getItem("favourites");

      const favouriteListLSTest = JSON.parse(favouriteListLS ?? "[]");

      setFavourites(favouriteListLSTest);
    }
  }, []);

  const handleGettingWeatherData = ({
    viewType,
    cityName,
  }: {
    viewType: string;
    cityName: string;
  }) => {
    dispatch(getWeatherData({ cityName, viewType })).then(() => {
      toggleActive();
    });
  };

  const removeCityFromFavourites = ({ name: cityName }: { name: string }) => {
    const favouriteCity: any = favourites.find(
      ({ name }: { name: string }) => name === cityName
    );

    const favouritesState = [...favourites];

    favouritesState.splice(favouritesState.indexOf(favouriteCity), 1);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("favourites", JSON.stringify(favouritesState));
    }

    setFavourites(favouritesState);
  };

  const handleLocalstorageClear = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.clear();
    }
    toggleActive();
  };

  return (
    <>
      <div
        className={classNames({ [styles.overlay_active]: isActive })}
        onClick={toggleActive}
      ></div>
      <div
        className={classNames({
          [styles.sidebar]: true,
          [styles.sidebar_active]: isActive,
        })}
      >
        <div className={styles.favouritesCities}>
          <div className={styles.favourites_header}>
            <div className={styles.favourites}>
              Favourites:
              {isLoading ? <CircularProgress color="inherit" size={20} /> : ""}
            </div>
            <button
              className={styles.trash_button}
              onClick={handleLocalstorageClear}
              title="Remove all cities"
            >
              <Trash />
            </button>
          </div>
          {favourites.map(
            ({ name, viewType }: { name: string; viewType: string }) => (
              <div className={styles.favourite_wrapper} key={name}>
                <button
                  onClick={() =>
                    handleGettingWeatherData({ viewType, cityName: name })
                  }
                  className={classNames({
                    [styles.button]: true,
                    [styles.city_name_overflow]: name.length >= 13,
                  })}
                >
                  {name}
                </button>
                <div className={styles.remove_button}>
                  <CloseIcon
                    onClick={() => removeCityFromFavourites({ name })}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};
