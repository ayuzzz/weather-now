import React from "react";
import styles from "@/styles/dashboard.module.css";
import { HourlyForecasts } from "@/models/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TemperatureTrend = ({
  hourlyWeatherData,
}: {
  hourlyWeatherData: HourlyForecasts | undefined;
}) => {
  const chartData =
    hourlyWeatherData === undefined
      ? undefined
      : hourlyWeatherData.time.map((time, index) => ({
          time,
          temperature: hourlyWeatherData.temperature_2m[index],
        }));

  return (
    <div className={`${styles.temperature_trend}`}>
      <p className={styles.dashboard_heading}>Temperature Trend (24 - Hours)</p>
      {hourlyWeatherData === undefined ? (
        "Loading ..."
      ) : (
        <div
          className={`${styles.temperature_trend_chart} ${styles.card_view}`}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip
                labelFormatter={(time) =>
                  `${time} ${", "} ${convertToReadableIST(
                    new Date().toISOString()
                  )}`
                }
              />
              <Legend />
              <Line
                type="linear"
                dataKey="temperature"
                stroke="#8884d8"
                dot={{ r: 5, fill: "#634AFFFF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

const convertToReadableIST = (isoDate: string): string => {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
};

export default TemperatureTrend;
