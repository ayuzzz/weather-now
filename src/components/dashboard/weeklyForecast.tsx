import styles from "@/styles/dashboard.module.css";
import { TiWeatherSunny } from "react-icons/ti";
import { SlOptions } from "react-icons/sl";

const WeeklyForecast = () => {
  const weatherCondition = "Sunny";

  const temperatureUnit = "F";
  const lowTemperatureFahrenheit = 72;
  const highTemperatureFahrenheit = 72;

  const precipitationPercentage = 20;

  return (
    <div className={`${styles.weekly_forecast}`}>
      <p className={styles.dashboard_heading}>7-Day Forecast</p>
      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Today</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Friday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Saturday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Sunday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Monday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Tuesday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>

      <div className={styles.weekly_forecasts}>
        <div className={styles.card_view}>
          <TiWeatherSunny className={styles.weather_icon} />
        </div>
        <div className={styles.weekly_forecast_details}>
          <p className={styles.weekly_forecast_day}>Wednesday</p>
          <p
            className={styles.hourly_forecast_weather_condition}
          >{`${weatherCondition} : High: ${highTemperatureFahrenheit}${temperatureUnit} : Low: ${lowTemperatureFahrenheit}${temperatureUnit} ${precipitationPercentage}% precipitation`}</p>
        </div>
        <SlOptions />
      </div>
    </div>
  );
};

export default WeeklyForecast;
