import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";




const UserHomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [clients, setClients] = useState([]);




  useEffect(() => {
    const fetchClients = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/movers/clients/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setClients(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchClients();
  }, [token]);
  return (
    <div className="container">
      <h1>Clients for {user.first_name}!</h1>
      {clients &&
        clients.map((clients) => (
          <p key={clients.id}>
            {clients.last_name}, {clients.first_name} 
          </p>
        ))}
    </div>
  );
};

export default UserHomePage;