"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CityMarkers, { CityMarker } from "./cityMarkers";
import { useEffect, useState } from "react";
import { fetchMapData, fetchTopCities } from "@/utils/fetchWeatherData";
import { useAppContext } from "@/contexts/appContext";

const WeatherMap = () => {
  const { currentCity, theme, weatherUnits } = useAppContext();

  const [center, setMapCenter] = useState<[number, number]>([
    currentCity.latitude,
    currentCity.longitude,
  ]);
  const zoom = 5;

  const [cityWeatherData, setCityWeatherData] = useState<CityMarker[]>([]);

  useEffect(() => {
    debugger;
    async function fetchNearbyCitiesAndMapData() {
      setMapCenter([currentCity.latitude, currentCity.longitude]);

      let latitudes: number[] = [];
      let longitudes: number[] = [];

      const topCities = await fetchTopCities(currentCity.country);

      topCities.forEach((city) => {
        latitudes.push(city.latitude);
        longitudes.push(city.longitude);
      });

      const weatherData = await fetchMapData(
        latitudes,
        longitudes,
        weatherUnits
      );
      setCityWeatherData(
        weatherData.map(
          (city, index) =>
            ({
              name: topCities[index].name,
              coordinates: [latitudes[index], longitudes[index]],
              temperature: city.current.temperature_2m,
              windSpeed: city.current.wind_speed_10m,
              rainfall: city.current.rain,
            } as CityMarker)
        )
      );
    }

    fetchNearbyCitiesAndMapData();
  }, [currentCity.latitude, currentCity.longitude, currentCity.country]);

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
