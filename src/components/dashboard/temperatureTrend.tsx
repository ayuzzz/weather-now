import React from "react";
import styles from "@/styles/dashboard.module.css";

const TemperatureTrend = () => {
  return (
    <div className={`${styles.temperature_trend}`}>
      <p className={styles.dashboard_heading}>Temperature Trend</p>
      <div className={`${styles.temperature_trend_chart} ${styles.card_view}`}>
        24-Hour Forecast
      </div>
    </div>
  );
};

export default TemperatureTrend;
