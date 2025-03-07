import React from "react";
import styles from "@/styles/dashboard.module.css";
import { TbMapPinSearch } from "react-icons/tb";

const Location = () => {
  return (
    <div className={styles.location}>
      <div className={styles.flex_center}>
        <label className={styles.location_label}>Location</label>
        <input
          className={styles.location_input}
          name="location"
          type="text"
          placeholder="Search for a city..."
        />
      </div>
      <button className={styles.search_button}>
        <TbMapPinSearch />
      </button>
    </div>
  );
};

export default Location;
