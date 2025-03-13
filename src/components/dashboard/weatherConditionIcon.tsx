import React, { ReactElement } from "react";
import styles from "@/styles/dashboard.module.css";
import { TiWeatherSunny } from "react-icons/ti";
import { MdWbCloudy, MdFoggy } from "react-icons/md";
import { WiNightPartlyCloudy, WiDaySunnyOvercast } from "react-icons/wi";
import { BsCloudDrizzleFill, BsSnow } from "react-icons/bs";
import { IoIosRainy } from "react-icons/io";
import { IoThunderstormSharp } from "react-icons/io5";

export const weatherCodeToIconMapping: Record<
  number,
  [string, () => ReactElement]
> = {
  0: ["Sunny", () => <TiWeatherSunny className={styles.weather_icon} />],
  1: ["Cloudy", () => <MdWbCloudy className={styles.weather_icon} />],
  2: [
    "Partly Cloudy",
    () => <WiNightPartlyCloudy className={styles.weather_icon} />,
  ],
  3: ["Overcast", () => <WiDaySunnyOvercast className={styles.weather_icon} />],
  45: ["Foggy", () => <MdFoggy className={styles.weather_icon} />],
  48: ["Foggy", () => <MdFoggy className={styles.weather_icon} />],
  51: ["Drizzle", () => <BsCloudDrizzleFill className={styles.weather_icon} />],
  53: ["Drizzle", () => <BsCloudDrizzleFill className={styles.weather_icon} />],
  55: ["Drizzle", () => <BsCloudDrizzleFill className={styles.weather_icon} />],
  56: ["Drizzle", () => <BsCloudDrizzleFill className={styles.weather_icon} />],
  57: ["Drizzle", () => <BsCloudDrizzleFill className={styles.weather_icon} />],
  61: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  63: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  65: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  66: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  67: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  80: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  81: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  82: ["Rainy", () => <IoIosRainy className={styles.weather_icon} />],
  71: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  73: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  75: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  77: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  85: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  86: ["Snow", () => <BsSnow className={styles.weather_icon} />],
  95: [
    "Thunderstorm",
    () => <IoThunderstormSharp className={styles.weather_icon} />,
  ],
  96: [
    "Thunderstorm",
    () => <IoThunderstormSharp className={styles.weather_icon} />,
  ],
  99: [
    "Thunderstorm",
    () => <IoThunderstormSharp className={styles.weather_icon} />,
  ],
};

const WeatherConditionIcon = ({ code }: { code: number }) => {
  return weatherCodeToIconMapping[code][1]();
};

export default WeatherConditionIcon;
