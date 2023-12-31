import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import AppContext from "../context/AppContext";

export default function Navbar() {
  let location = useLocation();

  const { token, logout, clearData } = useContext(AppContext);
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link onClick={clearData} className="navbar-brand" to="/">
          EaseMeet
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link onClick={clearData}
                className={`nav-link ${
                  location.pathname === "/" ? "highlight" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            {!token ? (
              <li
                className={`nav-item ${
                  location.pathname === "/signup" ? "highlight" : ""
                }`}
              >
                <Link onClick={clearData} className="nav-link" to="/signup">
                  Signup
                </Link>
              </li>
            ) : (
              ""
            )}
            {token ? (
              <li
                className={`nav-item ${
                  location.pathname === "/profile" ? "highlight" : ""
                }`}
              >
                <Link onClick={clearData} className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
            ) : (
              ""
            )}
            {token ? (
              <li
                className={`nav-item ${
                  location.pathname === "/appointments" ? "highlight" : ""
                }`}
              >
                <Link onClick={clearData} className="nav-link" to="/appointments">
                  Appointments
                </Link>
              </li>
            ) : (
              ""
            )}
            {token ? (
              <li
                className="nav-link"
              >
                <button onClick={logout} className="nav-link" style={{ border: "none", padding: "0", backgroundColor: "transparent" }}>Logout</button>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
