import React from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { CiCalculator2 } from "react-icons/ci";
import styles from "@/styles/dashboard.module.css";

const CurrentWeather = () => {
  const city = "New York";
  const weatherCondition = "Sunny";

  const temperatureFahrenheit = 72;
  const temperatureUnit = "F";
  const lowTemperatureFahrenheit = 72;
  const highTemperatureFahrenheit = 72;

  const humidityInPercentage = 45;

  const windspeedInMph = 8;
  const windDirection = "NW";

  const aqiValue = 32;
  const aqiCondition = "Good";

  return (
    <div className={styles.current_weather}>
      <p className={styles.dashboard_heading}>Current Weather</p>
      <div className={styles.current_weather_parameters}>
        <div className={`${styles.card_view} ${styles.city_summary}`}>
          <TiWeatherSunny className={styles.weather_icon} />
          <p className={styles.weather_now}>NOW</p>
          <p className={styles.city}>{city}</p>
          <p className={styles.weather_condition}>
            {weatherCondition} Feels like {temperatureFahrenheit}
            {temperatureUnit}
          </p>
          <button className={styles.view_details}>View Details</button>
        </div>
        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <FaTemperatureLow className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>
            {temperatureFahrenheit}
            {temperatureUnit}
          </p>
          <p className={styles.weather_condition}>
            High: {highTemperatureFahrenheit}
            {temperatureUnit} Low: {lowTemperatureFahrenheit}
            {temperatureUnit}
          </p>
        </div>
        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <WiHumidity className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>Humidity</p>
          <p className={styles.weather_condition}>{humidityInPercentage}%</p>
        </div>
        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <FaWind className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>Wind</p>
          <p className={styles.weather_condition}>
            {windspeedInMph} mph {windDirection}
          </p>
        </div>
        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <CiCalculator2 className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>AQI</p>
          <p className={styles.weather_condition}>
            {aqiCondition} ({aqiValue})
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
