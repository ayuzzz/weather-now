import React from "react";
import styles from "@/styles/settings.module.css";
import { useAppContext } from "@/contexts/appContext";

const Settings = () => {
  const { weatherUnits, setWeatherUnits, theme, setTheme } = useAppContext();
  return (
    <div className={styles.settings_container}>
      <h1 className={styles.settings_heading}>Units</h1>

      <div className={`${styles.card_view} ${styles.settings_toggle}`}>
        <h3>Temperature Units</h3>
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
        <h3>Windspeed Units</h3>
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
        <h3>AQI Index</h3>
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

      <h1 className={styles.settings_heading}>Display</h1>
      <div className={`${styles.card_view} ${styles.settings_toggle}`}>
        <h3>Theme</h3>
        <div className={styles.radio_group}>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="light"
              name="light"
              value="light"
              checked={theme === "light"}
              onChange={() => {
                toggleTheme();
              }}
            />
            <label htmlFor="Light">Light</label>
          </div>
          <div className={styles.unit_toggle}>
            <input
              type="radio"
              id="dark"
              name="dark"
              value="dark"
              checked={theme === "dark"}
              onChange={() => {
                toggleTheme();
              }}
            />
            <label htmlFor="dark">Dark</label>
          </div>
        </div>
      </div>
    </div>
  );

  function toggleTheme(): void {
    // If the current theme is light, set it to dark
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }
};
export default Settings;
