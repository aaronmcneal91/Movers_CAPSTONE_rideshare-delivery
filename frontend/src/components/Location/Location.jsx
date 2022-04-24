import React, { useEffect, useRef, useState } from 'react';
import './Location.css';

const defaultCenter = { lat: 37.2490198896223, lng: -80.00534832694282 };
const MyMapp = ({ pickup, dropoff }) => {
  const ref = useRef();

  const calculateAndDisplayRoute = map => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsDisplay = new window.google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    const waypoints = [pickup, dropoff].map(item => ({
      location: {
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng()
      }
    }));
    const origin = waypoints.shift().location;
    const destination = waypoints.pop().location;

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: 'DRIVING'
      },
      (response, status) => {
        if (status === 'OK') {
          // localStorage.setItem(
          //   'tripdetail',
          //   JSON.stringify(response?.routes?.[0]?.legs?.[0] || {})
          // );
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      }
    );
  };

  useEffect(() => {
    const bounds = new window.google.maps.LatLngBounds();
    let map = new window.google.maps.Map(ref.current, {
      center: defaultCenter,
      zoom: 14
    });

    if (pickup && Object.keys(pickup).length) {
      console.log(pickup);
      // createMarker(pickup);
      // map.setCenter(pickup?.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      const pickupMarker = new window.google.maps.Marker({
        position: pickup.geometry?.location,
        title: pickup.name
      });

      bounds.extend(pickupMarker.getPosition());
      pickupMarker.setMap(map);
    }

    if (dropoff && Object.keys(dropoff).length) {
      console.log(dropoff);
      // createMarker(dropoff);
      // map.setCenter(dropoff.geometry?.location);
      // eslint-disable-next-line no-unused-vars
      const dropoffMarker = new window.google.maps.Marker({
        position: dropoff.geometry?.location,
        title: dropoff.name
      });
      bounds.extend(dropoffMarker.getPosition());
      dropoffMarker.setMap(map);
    }

    if (
      pickup &&
      Object.keys(pickup).length &&
      dropoff &&
      Object.keys(dropoff).length
    ) {
      map.fitBounds(bounds); //auto-zoom
      map.panToBounds(bounds); //auto-center
      calculateAndDisplayRoute(map);
    }
  });

  return <div ref={ref} id='map' className='map' />;
};

export default MyMapp;
