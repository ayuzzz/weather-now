import React from "react";
import styles from "@/styles/settings.module.css";
import { useAppContext } from "@/contexts/appContext";

const Settings = () => {
  const { weatherUnits, setWeatherUnits } = useAppContext();
  return (
    <div className={styles.settings_container}>
      <h1 className={styles.settings_heading}>Settings</h1>

      <div className={`${styles.card_view} ${styles.settings_toggle}`}>
        <h2>Temperature Units</h2>
        <div className={styles.radio_group}>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="celsius"
              name="temperature"
              value="°C"
              checked={weatherUnits.temperatureUnit === "°C"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, temperatureUnit: "°C" });
              }}
            />
            <label htmlFor="celsius">Celsius</label>
          </div>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="fahrenheit"
              name="temperature"
              value="°F"
              checked={weatherUnits.temperatureUnit === "°F"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, temperatureUnit: "°F" });
              }}
            />
            <label htmlFor="fahrenheit">Fahrenheit</label>
          </div>
        </div>
      </div>

      <div className={`${styles.card_view} ${styles.settings_toggle}`}>
        <h2>Windspeed Units</h2>
        <div className={styles.radio_group}>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="mph"
              name="windspeed"
              value="mph"
              checked={weatherUnits.windSpeedUnit === "mph"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, windSpeedUnit: "mph" });
              }}
            />
            <label htmlFor="mph">mph</label>
          </div>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="kmph"
              name="km/h"
              value="kmph"
              checked={weatherUnits.windSpeedUnit === "km/h"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, windSpeedUnit: "km/h" });
              }}
            />
            <label htmlFor="kmph">km/h</label>
          </div>
        </div>
      </div>

      <div className={`${styles.card_view} ${styles.settings_toggle}`}>
        <h2>AQI Index</h2>
        <div className={styles.radio_group}>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="european_aqi"
              name="european_aqi"
              value="european_aqi"
              checked={weatherUnits.aqiUnit === "european_aqi"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, aqiUnit: "european_aqi" });
              }}
            />
            <label htmlFor="european_aqi">European AQI</label>
          </div>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="us_aqi"
              name="us_aqi"
              value="us_aqi"
              checked={weatherUnits.aqiUnit === "us_aqi"}
              onChange={() => {
                setWeatherUnits({ ...weatherUnits, aqiUnit: "us_aqi" });
              }}
            />
            <label htmlFor="us_aqi">US AQI</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
