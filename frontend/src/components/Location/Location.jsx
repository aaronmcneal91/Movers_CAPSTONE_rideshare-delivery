import React, { useEffect, useRef, useState } from "react";
import "./Location.css";

const defaultCenter = { lat: 37.2490198896223, lng: -80.00534832694282 };
const MyMapp = ({ pickup, dropoff }) => {
  const ref = useRef();

  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds();
    let map = new window.google.maps.Map(ref.current, {
      center: defaultCenter,
      zoom: 14,
    });

    if (pickup && Object.keys(pickup).length) {
      console.log(pickup);
      // createMarker(pickup);
      // map.setCenter(pickup?.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      const pickupMarker = new window.google.maps.Marker({
        position: pickup.geometry?.location,
        title: pickup.name,
      });

      // bounds.extend(pickupMarker.position);
      pickupMarker.setMap(map);
    }

    if (dropoff && Object.keys(dropoff).length) {
      console.log(dropoff);
      // createMarker(dropoff);
      // map.setCenter(dropoff.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      const dropoffMarker = new window.google.maps.Marker({
        position: dropoff.geometry?.location,
        title: dropoff.name,
      });
      // bounds.extend(dropoffMarker.postion);
      dropoffMarker.setMap(map);
    }

    if (
      pickup &&
      Object.keys(pickup).length &&
      dropoff &&
      Object.keys(dropoff).length
    ) {
      console.log(bounds);
      // map.fitBounds(bounds);
    }
  });

  return <div ref={ref} id="map" className="map" />;
};

export default MyMapp;
