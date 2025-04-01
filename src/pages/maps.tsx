"use client";
import StyleSheet from "@/styles/maps.module.css";
import Location from "@/components/dashboard/location";
import dynamic from "next/dynamic";

const NearbyCitiesMapWithNoSSR = dynamic(
  () => import("@/components/maps/nearbyCitiesMap"),
  { ssr: false }
);

const Maps = () => {
  return (
    <div className={StyleSheet.maps_container}>
      <Location />
      <NearbyCitiesMapWithNoSSR />
    </div>
  );
};

export default Maps;
