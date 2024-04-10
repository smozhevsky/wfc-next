"use client";

import { createContext, useState, useEffect } from "react";
import { getCityName } from "../services/weather.service";

export const CitiesNamesContext = createContext<string[]>([]);

export const CitiesNamesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getCityName();
      const cities = await data.json();
      const citiesNames = cities.map(
        ({ cities }: { cities: string[] }) => cities
      );

      const flattedCities = citiesNames.flat(1);

      const sorting = (arr: string[]) => {
        return Array.from(new Set(arr));
      };

      const sortedCities: string[] = sorting(flattedCities);

      setCities(sortedCities);
    })();
  }, []);

  return (
    <CitiesNamesContext.Provider value={cities}>
      {children}
    </CitiesNamesContext.Provider>
  );
};
