import styles from "@/styles/dashboard.module.css";
import { SlOptions } from "react-icons/sl";
import { DailyForecasts } from "@/models/dashboard";
import WeatherConditionIcon, {
  weatherCodeToIconMapping,
} from "./weatherConditionIcon";
import { useState } from "react";

const WeeklyForecast = ({
  dailyWeatherData,
}: {
  dailyWeatherData: DailyForecasts | undefined;
}) => {
  // Get day of the week in IST
  const todayDay = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(new Date());

  const [temperatureUnit, setTemperatureUnit] = useState("°C");

  return (
    <div className={`${styles.weekly_forecast}`}>
      <p className={styles.dashboard_heading}>7-Day Forecast</p>
      <div className={styles.weekly_forecasts}>
        {dailyWeatherData === undefined
          ? "Loading ..."
          : dailyWeatherData.time.map((day, index) => (
              <div className={styles.weekly_forecast_parameters} key={index}>
                <div className={styles.card_view}>
                  <WeatherConditionIcon
                    code={dailyWeatherData.weather_code[index]}
                  />
                </div>
                <div className={styles.weekly_forecast_details}>
                  <p className={styles.weekly_forecast_day}>
                    {day === todayDay ? "Today" : day}
                  </p>
                  <p className={styles.hourly_forecast_weather_condition}>{`${
                    weatherCodeToIconMapping[
                      dailyWeatherData.weather_code[index]
                    ][0]
                  } | High: ${
                    dailyWeatherData.temperature_2m_max[index]
                  }${temperatureUnit} | Low: ${
                    dailyWeatherData.temperature_2m_min[index]
                  }${temperatureUnit} | ${
                    dailyWeatherData.precipitation_sum[index]
                  }% precipitation`}</p>
                </div>
                <SlOptions />
              </div>
            ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
