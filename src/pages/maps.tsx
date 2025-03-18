"use client";
import StyleSheet from "@/styles/maps.module.css";
import React, { useState } from "react";
import Location from "@/components/dashboard/location";
import { City } from "@/models/city";
import NearbyCitiesMap from "@/components/maps/nearbyCitiesMap";

const Maps = () => {
  const [city, setCity] = useState<City>({
    id: 1277333,
    name: "Bengaluru",
    latitude: 12.97194,
    longitude: 77.59369,
    timezone: "Asia/Kolkata",
    country: "India",
  });
  return (
    <div className={StyleSheet.maps_container}>
      <Location setCity={setCity} />
      <NearbyCitiesMap />
    </div>
  );
};

export default Maps;
