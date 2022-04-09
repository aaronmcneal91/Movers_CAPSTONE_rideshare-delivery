import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: 'none', style: 'italic', color: "ORANGE" }}>
            <b>MOVERS</b>
          </Link>
        </li>
        <li> 
          <button style = {{borderBlockColor:'orange', color: 'orange'}} onClick={('')}> HOME </button>
        </li>
        <li> 
          <button style = {{borderBlockColor:'orange', color: 'orange'}} onClick={('')}> CONTACT US </button>
        </li>
        <li>
        <li> 
          <button style = {{borderBlockColor:'orange', color: 'orange'}} onClick={('')}> REGISTER </button>
        </li>
          {user ? (
            <button style = {{borderBlockColor:'orange', color: 'orange'}} onClick={logoutUser}>LOGOUT</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
     
      </ul>
    </div>
  );
};

export default Navbar;
