import React, { useEffect, useRef, useState } from "react";
import "./Location.css";

const defaultCenter = { lat: 37.2490198896223, lng: -80.00534832694282 };
const MyMapp = ({ place }) => {
  const ref = useRef();

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {
      center: defaultCenter,
      zoom: 14,
    });

    if (place && Object.keys(place).length) {
      console.log(place);
      // createMarker(place);
      map.setCenter(place?.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      let marker = new window.google.maps.Marker({
        position: place?.geometry?.location,
        title: "hello",
      });

      marker.setMap(map);
      console.log(marker);
      console.log(map);
    }
  });

  return <div ref={ref} id="map" className="map" />;
};

export default MyMapp;
