"use client";

import styles from "@/styles/dashboard.module.css";
import Location from "@/components/dashboard/location";
import CurrentWeather from "@/components/dashboard/currentWeather";
import TemperatureTrend from "@/components/dashboard/temperatureTrend";
import HourlyForecast from "@/components/dashboard/hourlyForecast";
import WeeklyForecast from "@/components/dashboard/weeklyForecast";

export default function Dashboard() {
  return (
    <div className={styles.dashboard_container}>
      <Location />
      <CurrentWeather />
      <TemperatureTrend />
      <HourlyForecast />
      <WeeklyForecast />
    </div>
  );
}
