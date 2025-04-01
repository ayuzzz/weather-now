import { WeatherUnitSettings } from "@/models/settings";
import DashboardWeatherData from "@/models/dashboard";
import {
  extractISTDate,
  extractISTDay,
  extractISTHour,
  toQueryParamString,
} from "./HelperUtilities";

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  units: WeatherUnitSettings
): Promise<DashboardWeatherData> {
  const params = {
    latitude: latitude,
    longitude: longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
    ],
    hourly: ["temperature_2m", "weather_code"],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
    ],
    temperature_unit: units.temperatureUnit === "°C" ? "celsius" : "fahrenheit",
    ...(units.windSpeedUnit === "km/h" ? {} : { wind_speed_unit: "mph" }),
    timezone: "GMT",
  };

  const weatherDataBaseUrl = "https://api.open-meteo.com/v1/forecast";

  // Construct query parameters
  const queryString = toQueryParamString(params);
  const requestUrl = `${weatherDataBaseUrl}?${queryString}`;

  try {
    const weatherDataResponse = await fetch(requestUrl);
    const airQualityData = await getAqi(latitude, longitude, units.aqiUnit);

    const data = await weatherDataResponse.json();

    // Deserialize into DashboardWeatherData
    const weatherData: DashboardWeatherData = {
      latitude: data.latitude,
      longitude: data.longitude,
      generationtime_ms: data.generationtime_ms,
      utc_offset_seconds: data.utc_offset_seconds,
      timezone: data.timezone,
      timezone_abbreviation: data.timezone_abbreviation,
      elevation: data.elevation,
      current_units: data.current_units,
      current: {
        ...data.current,
        aqi: airQualityData,
      },
      hourly_units: data.hourly_units,
      hourly: {
        time: data.hourly.time
          .filter(
            (time: string) =>
              extractISTDate(time) === extractISTDate(new Date().toISOString())
          )
          .map((time: string) => extractISTHour(time)),
        temperature_2m: data.hourly.temperature_2m,
        weather_code: data.hourly.weather_code,
      },
      daily_units: data.daily_units,
      daily: {
        time: data.daily.time.map((time: string) => extractISTDay(time)),
        temperature_2m_max: data.daily.temperature_2m_max,
        temperature_2m_min: data.daily.temperature_2m_min,
        weather_code: data.daily.weather_code,
        precipitation_sum: data.daily.precipitation_sum,
      },
    };

    return weatherData;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    throw error;
  }
}

async function getAqi(
  latitude: number,
  longitude: number,
  aqiUnit: string
): Promise<number> {
  const airQualityParams = {
    latitude: latitude,
    longitude: longitude,
    current: aqiUnit,
    forecast_days: 1,
    timezone: "GMT",
  };

  const airQualityBaseUrl =
    "https://air-quality-api.open-meteo.com/v1/air-quality";

  const airQualityQueryParams = toQueryParamString(airQualityParams);
  const airQualityRequestUrl = `${airQualityBaseUrl}?${airQualityQueryParams}`;

  const airQualityResponse = await fetch(airQualityRequestUrl);
  const airQualityData = await airQualityResponse.json();

  return airQualityData.current.european_aqi ?? airQualityData.current.us_aqi;
}
