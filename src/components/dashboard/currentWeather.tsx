import React, { useState } from "react";
import { FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { CiCalculator2 } from "react-icons/ci";
import styles from "@/styles/dashboard.module.css";
import { CurrentForecasts, DailyForecasts } from "@/models/dashboard";
import WeatherConditionIcon, {
  weatherCodeToIconMapping,
} from "@/components/dashboard/weatherConditionIcon";
import { useAppContext } from "@/contexts/appContext";

const CurrentWeather = ({
  currentWeatherData,
  dailyWeatherData,
}: {
  currentWeatherData: CurrentForecasts | undefined;
  dailyWeatherData: DailyForecasts | undefined;
}) => {
  const [temperatureUnit, setTemperatureUnit] = useState("°C");
  const { currentCity } = useAppContext();

  return (
    <div className={styles.current_weather}>
      <p className={styles.dashboard_heading}>Current Weather</p>

      {currentWeatherData === undefined || dailyWeatherData === undefined ? (
        "Loading ..."
      ) : (
        <div className={styles.current_weather_parameters}>
          <div className={`${styles.card_view} ${styles.city_summary}`}>
            <WeatherConditionIcon code={dailyWeatherData?.weather_code[0]} />
            <p className={styles.weather_now}>NOW</p>
            <p className={styles.city}>{currentCity?.name}</p>
            <p className={styles.weather_condition}>
              {weatherCodeToIconMapping[dailyWeatherData?.weather_code[0]][0]}
              {" | "}
              Feels like {currentWeatherData?.apparent_temperature}
              {temperatureUnit}
            </p>
            <button className={styles.view_details}>View Details</button>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <FaTemperatureLow className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>
              {currentWeatherData?.temperature_2m}
              {temperatureUnit}
            </p>
            <p className={styles.weather_condition}>
              High: {dailyWeatherData?.temperature_2m_max[0]}
              {temperatureUnit} | Low: {dailyWeatherData?.temperature_2m_min[0]}
              {temperatureUnit}
            </p>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <WiHumidity className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>Humidity</p>
            <p className={styles.weather_condition}>
              {currentWeatherData?.relative_humidity_2m}%
            </p>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <FaWind className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>Wind</p>
            <p className={styles.weather_condition}>
              {currentWeatherData?.wind_speed_10m} mph{" "}
              {getWindDirection(currentWeatherData?.wind_direction_10m)}
            </p>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <CiCalculator2 className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>AQI</p>
            <p className={styles.weather_condition}>
              {getAirQuality(currentWeatherData?.aqi)} (
              {currentWeatherData?.aqi})
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

function getWindDirection(degrees: number): string {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "N"];

  // Convert degrees to index in 8-point compass (each covers 45°)
  const index = Math.round(degrees / 45);

  return directions[index];
}

function getAirQuality(aqi: number) {
  if (aqi < 20) return "Good";
  else if (aqi >= 20 && aqi < 40) return "Fair";
  else if (aqi >= 40 && aqi < 60) return "Moderate";
  else if (aqi >= 60 && aqi < 80) return "Poor";
  else if (aqi >= 80 && aqi < 100) return "Very Poor";
  else return "Extremely Poor";
}

export default CurrentWeather;
