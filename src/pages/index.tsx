"use client";

import styles from "@/styles/dashboard.module.css";
import Location from "@/components/dashboard/location";
import CurrentWeather from "@/components/dashboard/currentWeather";
import TemperatureTrend from "@/components/dashboard/temperatureTrend";
import HourlyForecast from "@/components/dashboard/hourlyForecast";
import WeeklyForecast from "@/components/dashboard/weeklyForecast";
import { fetchWeatherData } from "@/utils/fetchWeatherData";
import { useEffect, useState } from "react";
import DashboardWeatherData from "@/models/dashboard";
import { useAppContext } from "@/contexts/appContext";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<DashboardWeatherData>(
    {} as DashboardWeatherData
  );

  const { currentCity, weatherUnits } = useAppContext();

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeatherData(
          currentCity.latitude,
          currentCity.longitude,
          weatherUnits
        );
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    }

    getWeather();
  }, [currentCity]);

  return (
    <div className={styles.dashboard_container}>
      <Location />
      <CurrentWeather
        currentWeatherData={weatherData?.current}
        dailyWeatherData={weatherData?.daily}
      />
      <TemperatureTrend hourlyWeatherData={weatherData?.hourly} />
      <HourlyForecast hourlyWeatherData={weatherData?.hourly} />
      <WeeklyForecast dailyWeatherData={weatherData?.daily} />
    </div>
  );
}
