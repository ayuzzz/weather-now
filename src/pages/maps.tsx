"use client";
import StyleSheet from "@/styles/maps.module.css";
import Location from "@/components/dashboard/location";
import NearbyCitiesMap from "@/components/maps/nearbyCitiesMap";

const Maps = () => {
  return (
    <div className={StyleSheet.maps_container}>
      <Location />
      <NearbyCitiesMap />
    </div>
  );
};

export default Maps;
