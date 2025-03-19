"use client";

import { useMap } from "react-leaflet";
import { IoMdSunny, IoIosRainy } from "react-icons/io";
import { FaWind } from "react-icons/fa";
import { ReactElement, useEffect, useState } from "react";
import styles from "@/styles/maps.module.css";
import { renderToString } from "react-dom/server";
import { City } from "@/models/city";

export interface CityMarker {
  name: string;
  coordinates: [number, number];
  temperature: number;
  windSpeed: number;
  rainfall: number;
}

const CityMarkers = ({
  city,
  cities,
}: {
  city: City;
  cities: CityMarker[];
}) => {
  const map = useMap();
  const [Leaflet, setLeaflet] = useState<typeof import("leaflet") | null>(null);
  const [layerControl, setLayerControl] = useState<L.Control.Layers | null>(
    null
  );

  useEffect(() => {
    import("leaflet").then((L) => setLeaflet(L));
  }, []);

  useEffect(() => {
    if (!Leaflet) return;
    map.setView([city.latitude, city.longitude], 5);

    // Remove all previous markers and layer groups
    map.eachLayer((layer: L.Layer) => {
      if (
        layer instanceof Leaflet.Marker ||
        layer instanceof Leaflet.LayerGroup
      ) {
        map.removeLayer(layer);
      }
    });

    // Clear previous layer control (to avoid duplicates)
    if (layerControl) {
      map.removeControl(layerControl);
    }

    const temperatureLayer = Leaflet.layerGroup();
    const windLayer = Leaflet.layerGroup();
    const rainLayer = Leaflet.layerGroup();

    cities.forEach((city) => {
      const createMarker = (
        value: number,
        icon: ReactElement,
        layer: L.LayerGroup,
        offset: number = 0,
        unit: string = "",
        weatherParameter: string = ""
      ) => {
        const customIcon = Leaflet.divIcon({
          html: renderToString(icon),
          iconAnchor: [offset, 0],
        });

        const marker = Leaflet.marker(city.coordinates, {
          icon: customIcon,
        }).addTo(layer);
        marker.bindPopup(
          `${weatherParameter} <b>${city.name}</b><br/>${value} ${unit}`
        );
      };

      createMarker(
        city.temperature,
        temperatureIcon(city.temperature),
        temperatureLayer,
        -20,
        "°C",
        "🌡️"
      );
      createMarker(
        city.windSpeed,
        windSpeedIcon(city.windSpeed),
        windLayer,
        0,
        "mph",
        "💨"
      );
      createMarker(
        city.rainfall,
        rainfallIcon(city.rainfall),
        rainLayer,
        20,
        "mm",
        "🌧"
      );
    });

    temperatureLayer.addTo(map);
    windLayer.addTo(map);
    rainLayer.addTo(map);

    const newLayerControl = Leaflet.control
      .layers(undefined, {
        "🌡️ Temperature": temperatureLayer,
        "💨 Wind Speed": windLayer,
        "🌧️ Rainfall": rainLayer,
      })
      .addTo(map);

    setLayerControl(newLayerControl);

    return () => {
      temperatureLayer.clearLayers();
      windLayer.clearLayers();
      rainLayer.clearLayers();
      if (layerControl) map.removeControl(layerControl); // Clean old controls
    };
  }, [cities, Leaflet]);

  return null;
};

function temperatureIcon(value: number): ReactElement {
  if (value < 10) {
    return <IoMdSunny className={styles.weather_icon_low} />;
  } else if (value >= 10 && value < 25) {
    return <IoMdSunny className={styles.weather_icon_moderate} />;
  } else {
    return <IoMdSunny className={styles.weather_icon_high} />;
  }
}

function windSpeedIcon(value: number): ReactElement {
  if (value < 10) {
    return <FaWind className={styles.weather_icon_low} />;
  } else if (value >= 10 && value < 25) {
    return <FaWind className={styles.weather_icon_moderate} />;
  } else {
    return <FaWind className={styles.weather_icon_high} />;
  }
}

function rainfallIcon(value: number): ReactElement {
  if (value <= 2) {
    return <IoIosRainy className={styles.weather_icon_low} />;
  } else if (value > 2 && value <= 10) {
    return <IoIosRainy className={styles.weather_icon_moderate} />;
  } else {
    return <IoIosRainy className={styles.weather_icon_high} />;
  }
}

export default CityMarkers;
