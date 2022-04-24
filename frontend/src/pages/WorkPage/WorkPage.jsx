import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const WorkPage = () => {
  const [user, token] = useAuth();
  const [work, setWork] = useState();
  let userData;
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
  }

  useEffect(() => {
    const viewWork = async () => {
      try {
        let response = await axios.get(
          `http://127.0.0.1:8000/api/movers/trips/${userData.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data?.[0]);
        setWork(response.data?.[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    viewWork();
  }, [token]);

  return (
    <div classname="container">
      <h1>Work</h1>
      {work &&
        work.map((work) => (
          <div>
            <p>Pending:{work.pending}</p>
          </div>
        ))}
    </div>
  );
};
export default WorkPage;
