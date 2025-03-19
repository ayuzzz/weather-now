"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CityMarkers, { CityMarker } from "./cityMarkers";
import { useEffect, useState } from "react";
import { City } from "@/models/city";
import { fetchMapData, fetchTopCities } from "@/utils/fetchWeatherData";

const WeatherMap = ({ city }: { city: City }) => {
  const [center, setMapCenter] = useState<[number, number]>([
    city.latitude,
    city.longitude,
  ]);
  const zoom = 5;

  const [cityWeatherData, setCityWeatherData] = useState<CityMarker[]>([]);

  useEffect(() => {
    debugger;
    async function fetchNearbyCitiesAndMapData() {
      setMapCenter([city?.latitude, city?.longitude]);

      let latitudes: number[] = [];
      let longitudes: number[] = [];

      const topCities = await fetchTopCities(city.country);

      topCities.forEach((city) => {
        latitudes.push(city.latitude);
        longitudes.push(city.longitude);
      });

      const weatherData = await fetchMapData(latitudes, longitudes);
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
  }, [city?.latitude, city?.longitude, city?.country]);

  return cityWeatherData === undefined || cityWeatherData.length === 0 ? (
    "Loading Map Data ..."
  ) : (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CityMarkers city={city} cities={cityWeatherData} />
    </MapContainer>
  );
};

export default WeatherMap;
