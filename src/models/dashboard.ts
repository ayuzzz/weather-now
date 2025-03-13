export default interface DashboardWeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string | null;
  timezone_abbreviation: string | null;
  elevation: number;
  current_units: CurrentUnits;
  current: CurrentForecasts;
  hourly_units: HourlyUnits;
  hourly: HourlyForecasts;
  daily_units: DailyUnits;
  daily: DailyForecasts;
}

export interface CurrentForecasts {
  time: string; // 2025-03-07T11:30
  interval: number; // 900
  temperature_2m: number; // 60.3
  relative_humidity_2m: number; // 40
  apparent_temperature: number; // 55.6
  is_day: number; // 1
  wind_speed_10m: number; // 3.6
  wind_direction_10m: number; // 176
  aqi: number; // 63
  weather_code: number;
}

export interface HourlyForecasts {
  time: string[];
  temperature_2m: number[];
  weather_code: number[];
}

interface CurrentUnits {
  time: string; // iso8601
  interval: string; // seconds
  temperature_2m: string; // °F
  relative_humidity_2m: string; // %
  apparent_temperature: string; // °F
  is_day: string; // empty string
  wind_speed_10m: string; // mp/h
  wind_direction_10m: string; // °
  weather_code: string;
}

interface HourlyUnits {
  temperature_2m: string;
  weather_code: string;
}

interface DailyUnits {
  time: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  weather_code: string;
}

export interface DailyForecasts {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  weather_code: number[];
  precipitation_sum: number[];
}

interface CurrentUnits {
  time: string; // iso8601
  interval: string; // seconds
  european_aqi: string; // EAQI
  weather_code: string;
}

interface Current {
  time: string; // 2025-03-07T12:00
  interval: number; // 3600
  european_aqi: number; // 63
  weather_code: number;
}
