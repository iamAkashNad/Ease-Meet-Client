import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "./AppContext";

export default function AppState(props) {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [alert, setAlert] = useState(null);

  const toggleAlert = (alertData) => {
    setAlert(alertData);
    setTimeout(() => setAlert(null), 3000);
  };

  const signup = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      name: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    let response;
    try {
      response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return toggleAlert({
        type: "warning",
        message: "Internet connection Interrupted!",
      });
    }

    if (response.status === 500)
      return toggleAlert({
        type: "danger",
        message: "Something went wrong Internally!",
      });

    const responseData = await response.json();

    if (!responseData.success) {
      return toggleAlert({ type: "warning", message: responseData.message });
    }

    navigate("/login");
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userId");
  };

  const setAutoLogout = (milliseconds) => {
    setTimeout(() => logout(), milliseconds);
  };

  const login = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    let response;
    try {
      response = await fetch(`${host}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return toggleAlert({
        type: "warning",
        message: "Internet connection Interrupted!",
      });
    }

    if (response.status === 500)
      return toggleAlert({
        type: "danger",
        message: "Something went wrong Internally!",
      });

    const responseData = await response.json();
    if (!responseData.success) {
      return toggleAlert({ type: "warning", message: responseData.message });
    }

    setToken(responseData.token);
    setUserId(responseData.userId);
    localStorage.setItem("Authorization", responseData.token);
    localStorage.setItem("userId", responseData.userId);
    const remainingMilliseconds = 1000 * 60 * 60 * 2;
    setAutoLogout(remainingMilliseconds);
    navigate("/");
  };

  const collection = { token, userId, setToken, alert, toggleAlert, signup, login };
  return (
    <AppContext.Provider value={collection}>
      {props.children}
    </AppContext.Provider>
  );
}
