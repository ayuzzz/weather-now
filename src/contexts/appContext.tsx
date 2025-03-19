"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { City } from "@/models/city";

interface AppContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  currentCity: City | null;
  setCurrentCity: (city: City) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  return (
    <AppContext.Provider
      value={{ theme, setTheme, currentCity, setCurrentCity }}
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
