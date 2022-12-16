/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  let userData;
  let isDriver;

  useEffect(() => {
    const fetchClient = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/movers/clients/${user.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        userData = response.data?.[0];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isDriver = userData?.type?.id === 1;
        localStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchClient();
  }, [token]);

  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    console.log(storedUserData);
    userData = JSON.parse(storedUserData);
    console.log(userData);
  }

  return (
    <div className="container">
      <Fragment>
        <h1>Home Page for {userData?.first_name}!</h1>
        <p>
          {userData?.last_name}, {userData?.first_name}: {userData?.type?.type}
          {!isDriver && <Link to="/jobpage">Plan a trip</Link>}
          {<Link to="/history">Trip History</Link>}
          {!isDriver && <Link to="/jobs">View Jobs</Link>}
        </p>
      </Fragment>
    </div>
  );
};

export default HomePage;
