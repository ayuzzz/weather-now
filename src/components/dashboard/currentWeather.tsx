import React from "react";
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
  const { currentCity, weatherUnits } = useAppContext();

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
              {weatherUnits.temperatureUnit}
            </p>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <FaTemperatureLow className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>
              {currentWeatherData?.temperature_2m}
              {weatherUnits.temperatureUnit}
            </p>
            <p className={styles.weather_condition}>
              High: {dailyWeatherData?.temperature_2m_max[0]}
              {weatherUnits.temperatureUnit} | Low:{" "}
              {dailyWeatherData?.temperature_2m_min[0]}
              {weatherUnits.temperatureUnit}
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
              {currentWeatherData?.wind_speed_10m} {weatherUnits.windSpeedUnit}{" "}
              {getWindDirection(currentWeatherData?.wind_direction_10m)}
            </p>
          </div>
          <div className={`${styles.card_view} ${styles.city_weather_details}`}>
            <CiCalculator2 className={styles.weather_icon} />
            <p className={styles.weather_condition_value}>AQI</p>
            <p className={styles.weather_condition}>
              {getAirQuality(currentWeatherData?.aqi, weatherUnits.aqiUnit)} (
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

function getAirQuality(aqi: number, unit: string): string {
  if (unit === "european_aqi") {
    if (aqi < 20) return "Good";
    else if (aqi >= 20 && aqi < 40) return "Fair";
    else if (aqi >= 40 && aqi < 60) return "Moderate";
    else if (aqi >= 60 && aqi < 80) return "Poor";
    else if (aqi >= 80 && aqi < 100) return "Very Poor";
    else return "Extremely Poor";
  } else {
    if (aqi <= 50) return "Good";
    else if (aqi > 50 && aqi <= 100) return "Moderate";
    else if (aqi > 100 && aqi <= 150) return "Unhealthy for Sensitive Groups";
    else if (aqi > 150 && aqi <= 200) return "Unhealthy";
    else if (aqi > 200 && aqi <= 300) return "Very Unhealthy";
    else return "Hazardous";
  }
}

export default CurrentWeather;
