import React, { Fragment } from "react";
import { useEffect, useState } from "react";

import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";


const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  
  const storedUserData = localStorage.getItem('user');
  const userData = storedUserData && JSON.parse(storedUserData);

  const [user, token] = useAuth();

  const [client, setClient] = useState();

  useEffect(() => {
    // get the user by the userid
    // const { id } = user;
    // const fetchUser = async () => {
    //   try {
    //     let response = await axios.get(`http://127.0.0.1:8000/api/movers/users/${id}`, {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     });
    //     console.log(response)
    //     setU(response.data);
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    // };
    // fetchUser();
    const fetchClient = async () => {
      try {
        let response = await axios.get(`http://127.0.0.1:8000/api/movers/clients/${userData.id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        console.log(response.data?.[0])
        setClient(response.data?.[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchClient();
  }, [token]);
  return (
    <div className="container">
      { client && (
        <Fragment>
          <h1>Home Page for {client?.first_name}!</h1>
          <p>
            {client?.last_name}, {client?.first_name}: {client?.type?.type}
            <Link to = "/jobpage"> Plan a trip </Link>
            <Link to ="/">Trip History</Link>
            <Link to ="/">View Jobs</Link>
            
          </p>
        </Fragment>
        
        // <Link to = '/'>Plan a trip</Link>
        // <button style = {{borderColor:'orange', color: 'orange'}}>Login</button>
      )}
    </div>
  );
};

export default HomePage;
