import { useMap } from "react-leaflet";
import { IoMdSunny } from "react-icons/io";
import L from "leaflet";
import { useEffect } from "react";
import styles from "@/styles/maps.module.css";
import { renderToString } from "react-dom/server";

export interface CityMarker {
  name: string;
  coordinates: [number, number];
  temperature: number;
}

const CityMarkers = ({ cities }: { cities: CityMarker[] }) => {
  const map = useMap();

  useEffect(() => {
    cities.forEach((city) => {
      const temperatureIcon = L.divIcon({
        html: renderToString(<IoMdSunny className={styles.weather_icon} />),
        iconAnchor: [0, 0],
      });
      const marker = L.marker(city.coordinates, {
        icon: temperatureIcon,
      }).addTo(map);

      marker.bindPopup(`<b>${city.name}</b><br/>🌡️ ${city.temperature}°C`);
    });

    return () => {
      map.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
    };
  }, [cities, map]);

  return null;
};

export default CityMarkers;
