import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const logout = () => {
    localStorage.clear();
    logoutUser();
  };
  const navigate = useNavigate();
  return (
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "orange" }}>
            <b>Movers</b>
          </Link>
        </li>
        <li>
          <button
            style={{ borderColor: "orange", color: "orange" }}
            onClick={() => navigate("/")}
          >
            {" "}
            HOME{" "}
          </button>
        </li>
        <li>
          <button
            style={{ borderColor: "orange", color: "orange" }}
            onClick={() => navigate("/contact")}
          >
            {" "}
            CONTACT US{" "}
          </button>
        </li>

        <li>
          <button
            style={{ borderColor: "orange", color: "orange" }}
            onClick={() => navigate("/register")}
          >
            {" "}
            REGISTER{" "}
          </button>
        </li>
        <li>
          {user ? (
            <button
              style={{ borderColor: "orange", color: "orange" }}
              onClick={logout}
            >
              LOGOUT
            </button>
          ) : (
            <button
              style={{ borderColor: "orange", color: "orange" }}
              onClick={() => navigate("/login")}
            >
              LOGIN
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
