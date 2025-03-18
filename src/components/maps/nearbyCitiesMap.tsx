import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import CityMarkers, { CityMarker } from "./cityMarkers";

const WeatherMap = () => {
  const center: [number, number] = [20.5937, 78.9629]; // India's approximate center
  const zoom = 5;

  const cityWeatherData = [
    { name: "Bengaluru", coordinates: [12.9716, 77.5946], temperature: 30 },
    { name: "Mumbai", coordinates: [19.076, 72.8777], temperature: 32 },
    { name: "Delhi", coordinates: [28.7041, 77.1025], temperature: 28 },
  ] as CityMarker[];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CityMarkers cities={cityWeatherData} />
    </MapContainer>
  );
};

export default WeatherMap;
