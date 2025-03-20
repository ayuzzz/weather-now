import { WeatherUnitSettings } from "@/models/settings";
import { City, NearByCity } from "@/models/city";
import DashboardWeatherData from "@/models/dashboard";

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

export async function fetchCity(query: string): Promise<City> {
  const geocodingApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1&language=en&format=json`;
  const fetchedCities = await (await fetch(geocodingApiUrl)).json();
  const city = fetchedCities?.results ? fetchedCities?.results[0] : undefined;

  return city as City;
}

export async function fetchTopCities(country: string): Promise<NearByCity[]> {
  const url = `https://overpass-api.de/api/interpreter?data=[out:json];area[name="${country}"]->.searchArea;(node[place=city](area.searchArea);node[population](area.searchArea););out body;out skel qt;`;

  const response = await fetch(url);
  const data = await response.json();

  const topCities = data.elements
    .filter((el: any) => el.tags && el.tags.name && el.tags.population)
    .sort(
      (a: any, b: any) => (b.tags.population || 0) - (a.tags.population || 0)
    )
    .slice(0, 30)
    .map(
      (city: any) =>
        ({
          name: city.tags.name,
          latitude: city.lat,
          longitude: city.lon,
        } as NearByCity)
    );

  return topCities;
}

export async function fetchMapData(
  latitude: number[],
  longitude: number[],
  weatherUnits: WeatherUnitSettings
): Promise<DashboardWeatherData[]> {
  const params = {
    latitude: latitude.join(","),
    longitude: longitude.join(","),
    current: ["temperature_2m", "rain", "wind_speed_10m", "weather_code"],
    temperature_unit:
      weatherUnits.temperatureUnit === "°C" ? "celsius" : "fahrenheit",
    ...(weatherUnits.windSpeedUnit === "km/h"
      ? {}
      : { wind_speed_unit: "mph" }),
    timezone: "GMT",
    forecast_days: 1,
  };

  const weatherDataBaseUrl = "https://api.open-meteo.com/v1/forecast";

  // Construct query parameters
  const queryString = toQueryParamString(params);
  const requestUrl = `${weatherDataBaseUrl}?${queryString}`;

  try {
    const weatherDataResponse = await fetch(requestUrl);

    const data = (await weatherDataResponse.json()) as DashboardWeatherData[];
    return data;
  } catch (error) {
    console.error("Failed to fetch map data:", error);
    throw error;
  }
}

function toQueryParamString(
  params: Record<string, string | number | string[] | number[]>
): string {
  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.join(",")
        )}`;
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          value.toString()
        )}`;
      }
    })
    .join("&");
}

const extractISTHour = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    hour12: true,
  }).format(new Date(isoDate));
};

const extractISTDay = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
  }).format(new Date(isoDate));
};

const extractISTDate = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
  }).format(new Date(isoDate));
};
