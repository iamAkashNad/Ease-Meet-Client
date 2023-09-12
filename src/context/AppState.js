import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "./AppContext";

export default function AppState(props) {
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);

  const netError = {
    type: "warning",
    message: "Internet connection Interrupted!"
  };

  const serverError = {
    type: "danger",
    message: "Something went wrong Internally!"
  };

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
      return toggleAlert(netError);
    }

    if (response.status === 500)
      return toggleAlert(serverError);

    const responseData = await response.json();

    if (!responseData.success) {
      return toggleAlert({ type: "warning", message: responseData.message });
    }

    navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userId");
    clearData();
    navigate("/");
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
      return toggleAlert(netError);
    }

    if (response.status === 500)
      return toggleAlert(serverError);

    const responseData = await response.json();
    if (!responseData.success) {
      return toggleAlert({ type: "warning", message: responseData.message });
    }

    setToken(responseData.token);
    setUserId(responseData.userId);
    localStorage.setItem("Authorization", responseData.token);
    localStorage.setItem("userId", responseData.userId);
    navigate("/");
  };

  const sendCodeForForgot = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submittedEmail = formData.get("email");

    if(!submittedEmail || submittedEmail.trim() === 0) 
      return toggleAlert({ type: "warning", message: "Please enter a email!" });

    event.target.querySelector("#model-email-input").value = "";
    document.getElementById("close-model")?.click();
    let response;
    try {
      response = await fetch(`${host}/user/password/forgot?email=${submittedEmail}`);
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) {
      return toggleAlert(serverError);
    }

    const responseData = await response.json();
    if(!responseData.success) {
      return toggleAlert({ type: "warning", message: responseData.message });
    }
    toggleAlert({ type: "success", message: responseData.message });
    setEmail(submittedEmail);
  };

  const forgotPassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email,
      code: formData.get("code"),
      password: formData.get("password")
    };
    let response;
    try {
      response = await fetch(`${host}/user/password/forgot`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch(error) {
      setEmail(null);
      return toggleAlert(netError);
    }

    setEmail(null);
    if(response.status === 500) return toggleAlert(serverError);

    const responseData = await response.json();
    toggleAlert({ 
      type: responseData.success ? "success" : "warning", 
      message: responseData.message 
    });
  };

  const sendCodeForVerifyEmail = async () => {
    if(!user) {
      logout();
      return toggleAlert({ 
        type: "warning",
        message: "You should authenticated first in order to verify your email!" 
      });
    }
    
    let response;
    try {
      response = await fetch(`${host}/auth/signup/verify?email=${user.email}`);
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) return toggleAlert(serverError);

    const responseData = await response.json();
    if(!responseData.success) return toggleAlert({ type: "warning", message: responseData.message });

    toggleAlert({ type: "success", message: responseData.message });
    setEmail(user.email);
  };

  const verifyEmail = async (event) => {
    event.preventDefault();
    if(!user) {
      logout();
      return toggleAlert({ 
        type: "warning",
        message: "You should authenticated first in order to verify your email!" 
      });
    }

    const formData = new FormData(event.target);
    const data = {
      code: formData.get("code"),
      email: user.email
    };

    let response;
    try {
      response = await fetch(`${host}/auth/signup/verify`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch(error) {
      setEmail(null);
      return toggleAlert(netError);
    }

    setEmail(null);
    if(response.status === 500) return toggleAlert(serverError);

    const responseData = await response.json();
    if(!responseData.success) return toggleAlert({ type: "warning", message: responseData.message });

    toggleAlert({ type: "success", message: responseData.message });
    setUser({ ...user, verified: true });
  };

  const fetchUsers = async () => {
    let response;
    setLoading(true);
    try {
      response = await fetch(`${host}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      setLoading(false);
      return toggleAlert({
        type: "warning",
        message: "Internet connection Interrupted!",
      });
    }

    if (response.status === 500) {
      setLoading(false);
      return toggleAlert({
        type: "danger",
        message: "Something went wrong Internally!",
      });
    }
    
    const responseData = await response.json();

    setLoading(false);
    if(!responseData.success)
      return toggleAlert({ type: "warning", message: responseData.message });

    setUsers(responseData.users);
  };

  const getProfile = async () => {
    let response;
    setLoading(true);
    try {
      response = await fetch(`${host}/user`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      setLoading(false);
      return toggleAlert({
        type: "warning",
        message: "Internet connection Interrupted!",
      });
    }

    if(response.status === 500) {
      setLoading(false);
      return toggleAlert({
        type: "danger",
        message: "Something went wrong Internally!",
      });
    }

    const responseData = await response.json();

    setLoading(false);
    if(!responseData.success)
      return toggleAlert({ type: "warning", message: responseData.message });

    setUser(responseData.user);
  };

  const changeProfileName = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      password: formData.get("password"),
      name: formData.get("username")
    };

    event.target.reset();
    document.getElementById("close-model")?.click();
    let response;
    try {
      response = await fetch(`${host}/user/update`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) return toggleAlert(serverError);

    const responseData = await response.json();
    toggleAlert({ 
      type: responseData.success ? "success" : "warning",
      message: responseData.message 
    });
    if(responseData.success) setUser({ ...user, name: data.name });
  };

  const clearData = () => {
    setEmail(null);
  };

  const collection = {
    token,
    userId,
    setToken,
    alert,
    toggleAlert,
    signup,
    login,
    sendCodeForForgot,
    forgotPassword,
    sendCodeForVerifyEmail,
    verifyEmail,
    email,
    setEmail,
    loading,
    setLoading,
    users,
    fetchUsers,
    user,
    getProfile,
    changeProfileName,
    clearData,
    logout
  };
  return (
    <AppContext.Provider value={collection}>
      {props.children}
    </AppContext.Provider>
  );
}
