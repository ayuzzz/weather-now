import styles from "@/styles/dashboard.module.css";
import {
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherPartlySunny,
  TiWeatherSnow,
} from "react-icons/ti";

const HourlyForecast = () => {
  const temperatureFahrenheit = 72;
  const temperatureUnit = "F";

  return (
    <div className={`${styles.hourly_forecast}`}>
      <p className={styles.dashboard_heading}>Hourly Forecast</p>
      <div className={styles.hourly_forecasts}>
        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <TiWeatherSunny className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>Now</p>
          <p className={styles.weather_condition}>
            {temperatureFahrenheit} {temperatureUnit}
          </p>
        </div>

        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <TiWeatherPartlySunny className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>1 PM</p>
          <p className={styles.weather_condition}>
            {temperatureFahrenheit} {temperatureUnit}
          </p>
        </div>

        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <TiWeatherSnow className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>2 PM</p>
          <p className={styles.weather_condition}>
            {temperatureFahrenheit} {temperatureUnit}
          </p>
        </div>

        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <TiWeatherShower className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>3 PM</p>
          <p className={styles.weather_condition}>
            {temperatureFahrenheit} {temperatureUnit}
          </p>
        </div>

        <div className={`${styles.card_view} ${styles.city_weather_details}`}>
          <TiWeatherShower className={styles.weather_icon} />
          <p className={styles.weather_condition_value}>4 PM</p>
          <p className={styles.weather_condition}>
            {temperatureFahrenheit} {temperatureUnit}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
