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
import { City } from "@/models/city";

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState<DashboardWeatherData>(
    {} as DashboardWeatherData
  );
  const [city, setCity] = useState<City>({
    id: 1277333,
    name: "Bengaluru",
    latitude: 12.97194,
    longitude: 77.59369,
    timezone: "Asia/Kolkata",
    country: "India",
  });

  useEffect(() => {
    async function getWeather() {
      try {
        const data = await fetchWeatherData(city.latitude, city.longitude);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    }

    getWeather();
  }, [city]);

  return (
    <div className={styles.dashboard_container}>
      <Location setCity={setCity} />
      <CurrentWeather
        cityName={city.name}
        currentWeatherData={weatherData?.current}
        dailyWeatherData={weatherData?.daily}
      />
      <TemperatureTrend hourlyWeatherData={weatherData?.hourly} />
      <HourlyForecast hourlyWeatherData={weatherData?.hourly} />
      <WeeklyForecast dailyWeatherData={weatherData?.daily} />
    </div>
  );
}
