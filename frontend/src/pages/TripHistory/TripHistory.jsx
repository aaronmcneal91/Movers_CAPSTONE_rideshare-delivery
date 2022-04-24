/* eslint-disable no-restricted-globals */
import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TripHistory = () => {
  const [user, token] = useAuth();
  const [trips, setTrips] = useState();
  let userData;
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    console.log(storedUserData);
    userData = JSON.parse(storedUserData);
    console.log(userData);
  }

  const path = userData?.type?.id === 1 ? "drivers" : "clients";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/movers/trips/${path}/${userData.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        console.log(response.data);
        setTrips(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTrips();
  }, [token]);

  return (
    <div className="container">
      <h1>Trip History </h1>
      {trips &&
        trips.map((trip) => (
          <div>
            <h2>Trip #{trip.id}</h2>
            <p>Pickup: {trip.pickup}</p>
            <p>Drop off: {trip.dropoff}</p>
            <div>{trip.description}</div>
          </div>
        ))}
    </div>
  );
};

export default TripHistory;
