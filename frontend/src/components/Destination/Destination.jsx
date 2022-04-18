import React, { useEffect, useRef, useState } from "react";

const MyMapp = ({ destination }) => {
  const ref = useRef();

  useEffect(() => {
    let map = new window.google.maps.Map(ref.current, {
      zoom: 14,
    });

    if (destination && Object.keys(destination).length) {
      console.log(destination);
      // createMarker(place);
      map.setCenter(destination?.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      let marker = new window.google.maps.Marker({
        position: destination?.geometry?.location,
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
