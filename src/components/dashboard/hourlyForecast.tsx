import { HourlyForecasts } from "@/models/dashboard";
import styles from "@/styles/dashboard.module.css";
import WeatherConditionIcon from "./weatherConditionIcon";
import { useAppContext } from "@/contexts/appContext";

const HourlyForecast = ({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyForecasts | undefined;
}) => {
  const { weatherUnits } = useAppContext();

  const now = new Date();

  // Get hour of the day in IST (12-hour format)
  const todayHour = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: true,
  }).format(now);

  let currentWeatherDataIndex = 0;
  let lastWeatherDataIndex = 0;

  if (hourlyWeatherData != undefined) {
    currentWeatherDataIndex = hourlyWeatherData.time.findIndex(
      (value) => value === todayHour
    );

    lastWeatherDataIndex = currentWeatherDataIndex + 5;
  }

  return (
    <div className={`${styles.hourly_forecast}`}>
      <p className={styles.dashboard_heading}>Hourly Forecast</p>
      <div className={styles.hourly_forecasts}>
        {hourlyWeatherData === undefined
          ? "Loading ..."
          : hourlyWeatherData.time
              .slice(currentWeatherDataIndex, lastWeatherDataIndex)
              .map((hour, index) => (
                <div
                  key={index}
                  className={`${styles.card_view} ${styles.city_weather_details}`}
                >
                  <WeatherConditionIcon
                    code={hourlyWeatherData.weather_code[index]}
                  />
                  <p className={styles.weather_condition_value}>
                    {" "}
                    {hour === todayHour ? "NOW " : hour}{" "}
                  </p>
                  <p className={styles.weather_condition}>
                    {hourlyWeatherData.temperature_2m[index]}
                    {weatherUnits.temperatureUnit}
                  </p>
                </div>
              ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
