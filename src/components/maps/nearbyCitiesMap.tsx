"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CityMarkers, { CityMarker } from "./cityMarkers";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/appContext";
import { fetchMapData, fetchTopCities } from "@/utils/locationAndMapUtility";

const WeatherMap = () => {
  const { currentCity, theme, weatherUnits } = useAppContext();

  const [center, setMapCenter] = useState<[number, number]>([
    currentCity.latitude,
    currentCity.longitude,
  ]);
  const zoom = 5;

  const [cityWeatherData, setCityWeatherData] = useState<CityMarker[]>([]);

  useEffect(() => {
    async function fetchNearbyCitiesAndMapData() {
      // Set map center first (no await needed)
      setMapCenter([currentCity.latitude, currentCity.longitude]);

      // Fetch cities and extract lat/long in one step (no manual pushing)
      const topCities = await fetchTopCities(currentCity.country);
      const latitudes = topCities.map((city) => city.latitude);
      const longitudes = topCities.map((city) => city.longitude);

      // Fetch weather data and map to CityMarker format
      const weatherData = await fetchMapData(
        latitudes,
        longitudes,
        weatherUnits
      );
      const newCityWeatherData = weatherData.map(
        (city, index) =>
          ({
            name: topCities[index].name,
            coordinates: [latitudes[index], longitudes[index]],
            temperature: city.current.temperature_2m,
            windSpeed: city.current.wind_speed_10m,
            rainfall: city.current.rain,
          } as CityMarker)
      );

      setCityWeatherData(newCityWeatherData);
    }

    fetchNearbyCitiesAndMapData();
  }, [
    currentCity.latitude,
    currentCity.longitude,
    currentCity.country,
    weatherUnits,
  ]);

  return cityWeatherData === undefined || cityWeatherData.length === 0 ? (
    "Loading Map Data ..."
  ) : (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "100%" }}
    >
      {theme === "light" ? (
        <TileLayer
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.de/">OSM DE</a>'
        />
      ) : (
        <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png" />
      )}

      <CityMarkers cities={cityWeatherData} />
    </MapContainer>
  );
};

export default WeatherMap;
