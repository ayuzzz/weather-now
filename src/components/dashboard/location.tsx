import styles from "@/styles/dashboard.module.css";
import { TbMapPinSearch } from "react-icons/tb";
import { useState } from "react";
import { City } from "@/models/city";
import { fetchCity } from "@/utils/fetchWeatherData";

const Location = ({
  setCity,
}: {
  setCity: React.Dispatch<React.SetStateAction<City>>;
}) => {
  const [searchQuery, setSearchQuery] = useState("Bengaluru");

  const setFixedCityDetails = async function () {
    try {
      const fetchedCity = await fetchCity(searchQuery);
      if (fetchedCity !== undefined) {
        setCity(fetchedCity);
      } else {
        alert("City not found");
      }
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    }
  };

  return (
    <div className={styles.location}>
      <div className={styles.flex_center}>
        <label className={styles.location_label}>Location</label>
        <input
          className={styles.location_input}
          name="location"
          type="text"
          placeholder="Search for a city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        className={styles.search_button}
        onClick={() => setFixedCityDetails()}
      >
        <TbMapPinSearch />
      </button>
    </div>
  );
};

export default Location;
