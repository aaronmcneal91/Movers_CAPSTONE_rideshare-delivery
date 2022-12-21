/* eslint-disable no-restricted-globals */
import React from "react";
import { useEffect, useState } from "react";


import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TripHistory = () => {
  const [user, token] = useAuth();
  const [trips, setTrips] = useState([]);
  let userData;
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    console.log(storedUserData);
    userData = JSON.parse(storedUserData);
    console.log(userData);
  }

  const path = userData?.TripHistory?.id === 1 ? "drivers" : "clients";

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/movers/trips/${path}/${user.id}`,
          {
           
            headers: {
              Authorization: "Bearer " + token,
              
            },
            
          }
        
        );
       
        setTrips(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchTrips();
  }, [token]);
  

  return (
    <div className="container">
      <h1>Trip History for {user.first_name}! </h1>
      {trips &&
        trips.map((trips) => (
          <p key={user.id}>
          <div>
            <h2>Trip: {trips.id}</h2>
            <p>Pickup: {trips.pickup}</p>
            <p>Drop off: {trips.dropoff}</p>
            <p>Trips:{trips.TripHistory}</p>
            <div>{trips.description}</div>
          </div>
          </p>
        ))}
    </div>
  );
};

export default TripHistory;
