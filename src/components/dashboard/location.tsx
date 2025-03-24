import styles from "@/styles/dashboard.module.css";
import { TbMapPinSearch } from "react-icons/tb";
import { useState } from "react";
import { fetchCity } from "@/utils/fetchWeatherData";
import { useAppContext } from "@/contexts/appContext";

const Location = () => {
  const { currentCity, setCurrentCity } = useAppContext();
  const [searchQuery, setSearchQuery] = useState(
    currentCity?.name ?? "Bengaluru"
  );

  const setFixedCityDetails = async function () {
    try {
      const fetchedCity = await fetchCity(searchQuery);
      if (fetchedCity !== undefined) {
        setCurrentCity(fetchedCity);
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
        <label className={styles.location_label} htmlFor="location">
          Location
        </label>
        <input
          className={styles.location_input}
          id="location"
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
