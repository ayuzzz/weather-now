"use client";

import styles from "@/styles/dashboard.module.css";
import { TbMapPinSearch } from "react-icons/tb";
import {
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherPartlySunny,
  TiWeatherSnow,
} from "react-icons/ti";
import { FaTemperatureLow, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { CiCalculator2 } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";

export default function Dashboard() {
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

  const precipitationPercentage = 20;

  return (
    <div className={styles.dashboard_container}>
      <div className={styles.location}>
        <div className={styles.flex_center}>
          <label className={styles.location_label}>Location</label>
          <input
            className={styles.location_input}
            name="location"
            type="text"
            placeholder="Search for a city..."
          />
        </div>
        <button className={styles.search_button}>
          <TbMapPinSearch />
        </button>
      </div>

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

      <div className={`${styles.temperature_trend}`}>
        <p className={styles.dashboard_heading}>Temperature Trend</p>
        <div
          className={`${styles.temperature_trend_chart} ${styles.card_view}`}
        >
          24-Hour Forecast
        </div>
      </div>

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
    </div>
  );
}
