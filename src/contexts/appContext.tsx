"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { City } from "@/models/city";
import { WeatherUnitSettings } from "@/models/settings";

interface AppContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;

  currentCity: City;
  setCurrentCity: (city: City) => void;

  weatherUnits: WeatherUnitSettings;
  setWeatherUnits: (units: WeatherUnitSettings) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentCity, setCurrentCity] = useState<City>({
    id: 1277333,
    name: "Bengaluru",
    latitude: 12.97194,
    longitude: 77.59369,
    timezone: "Asia/Kolkata",
    country: "India",
  });
  const [weatherUnits, setWeatherUnits] = useState<WeatherUnitSettings>({
    temperatureUnit: "°C",
    windSpeedUnit: "mph",
    aqiUnit: "european_aqi",
  });

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        currentCity,
        setCurrentCity,
        weatherUnits,
        setWeatherUnits,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
