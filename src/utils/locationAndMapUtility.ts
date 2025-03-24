import { City, NearByCity } from "@/models/city";
import DashboardWeatherData from "@/models/dashboard";
import { WeatherUnitSettings } from "@/models/settings";
import { toQueryParamString } from "./HelperUtilities";

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
