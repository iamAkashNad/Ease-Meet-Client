import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import AppContext from "./AppContext";

export default function AppState(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const host = process.env.REACT_APP_HOST;
  const [token, setToken] = useState(localStorage.getItem("Authorization"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [guest, setGuest] = useState(null);
  const [offHours, setOffHours] = useState([]);

  const netError = {
    type: "warning",
    message: "Internet connection Interrupted!"
  };

  const serverError = {
    type: "danger",
    message: "Something went wrong Internally!"
  };

  const clearModel = function (event, id) {
    event.target.reset();
    document.getElementById(id).querySelector(".close-model")?.click();
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

  const automaticLogout = (milli) => {
    setTimeout(logout, milli);
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
    automaticLogout(1000 * 60 * 60 * 2);
    navigate("/");
  };

  const sendCodeForForgot = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const submittedEmail = formData.get("email");

    if(!submittedEmail || submittedEmail.trim() === 0) 
      return toggleAlert({ type: "warning", message: "Please enter a email!" });

    clearModel(event, this.id);
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
          "Authorization": "Bearer " + token,
        },
      });
    } catch (error) {
      setLoading(false);
      return toggleAlert(netError);
    }

    if (response.status === 500) {
      setLoading(false);
      return toggleAlert(serverError);
    }

    if(response.status === 401) {
      setLoading(false);
      return logout();
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
      return toggleAlert(netError);
    }

    if(response.status === 500) {
      setLoading(false);
      return toggleAlert(serverError);
    }

    if(response.status === 401) {
      setLoading(false);
      return logout();
    }

    const responseData = await response.json();

    setLoading(false);
    if(!responseData.success)
      return toggleAlert({ type: "warning", message: responseData.message });

    setUser(responseData.user);
  };

  const changeProfileName = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      password: formData.get("password"),
      name: formData.get("username")
    };

    clearModel(event, this.id);
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
    if(response.status === 401) return logout();

    const responseData = await response.json();
    toggleAlert({ 
      type: responseData.success ? "success" : "warning",
      message: responseData.message 
    });
    if(responseData.success) setUser({ ...user, name: data.name });
  };

  const getAppointments = async () => {
    let response;
    try {
      setLoading(true);
      response = await fetch(`${host}/appointments`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      setLoading(false);
      return toggleAlert(netError);
    }

    if(response.status === 500) {
      setLoading(false);
      return toggleAlert(serverError);
    }

    if(response.status === 401) {
      setLoading(false);
      return logout();
    }

    const responseData = await response.json();
    setAppointments(responseData.appointments);
    setLoading(false);
  };

  const assignGuest = (event) => {
    setUsers(null);
    setGuest({
      id: event.target.dataset?.userid,
      email: event.target.dataset?.email
    })
  };

  const scheduleAppointment = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const appointment = {
      guest: guest.id,
      title: formData.get("title"),
      agenda: formData.get("agenda"),
      start: formData.get("start"),
      duration: formData.get("duration")
    };

    let response;
    try {
      response = await fetch(`${host}/appointments/schedule`, {
        method: "POST",
        body: JSON.stringify(appointment),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) return toggleAlert(serverError);
    if(response.status === 401) return logout();

    const responseData = await response.json();
    toggleAlert({ 
      type: responseData.success ? "success" : "warning",
      message: responseData.message 
    });
    if(responseData.success) setGuest(null);
  };

  const cancelAppointment = async (meetid) => {
    if(!meetid) toggleAlert({ type: "warning", message: "Appointment Id must be provided!" });

    let response;
    try {
      response = await fetch(`${host}/appointments/${meetid}/cancel`, {
        method: "PATCH",
        headers: {
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) return toggleAlert(serverError);
    if(response.status === 401) return logout();

    const responseData = await response.json();
    if(!responseData.success) return toggleAlert({ type: "warning", message: responseData.message });

    toggleAlert({ type: "success", message: responseData.message });
    const newAppointments = appointments.map(appointment => {
      if(appointment._id === meetid) appointment.cancel = true;
      return appointment;
    });
    setAppointments(newAppointments);
  };

  const getOffHours = async () => {
    let response;
    try {
      setLoading(true);
      response = await fetch(`${host}/user/off-hours`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      setLoading(false);
      return toggleAlert(netError);
    }

    if(response.status === 500) {
      setLoading(false);
      return toggleAlert(serverError);
    }

    if(response.status === 401) {
      setLoading(false);
      return logout();
    }

    const responseData = await response.json();

    setLoading(false);
    if(!responseData.success) return toggleAlert({ type: "warning", message: responseData.message });
    setOffHours(responseData.offHours);
  };

  const addOffHour = async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const offHour = {
      start: formData.get("start"),
      end: formData.get("end")
    };

    let response;
    try {
      response = await fetch(`${host}/user/off-hours/add`, {
        method: "POST",
        body: JSON.stringify(offHour),
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
    } catch(error) {
      clearModel(event, this.id);
      return toggleAlert(netError);
    }

    if(response.status === 500) {
      clearModel(event, this.id);
      return toggleAlert(serverError);
    }

    if(response.status === 401) {
      clearModel(event, this.id);
      return logout();
    }

    const responseData = await response.json();

    toggleAlert({ 
      type: responseData.success ? "success" : "warning", 
      message: responseData.message 
    });
    clearModel(event, this.id);
    if(responseData.success) getOffHours();
  };

  const deleteOffHour = async (offHourId) => {
    if(!offHourId) return toggleAlert({ type: "warning", message: "Off hour Id must be provided!" });

    let response;
    try {
      response = await fetch(`${host}/user/off-hours/${offHourId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      });
    } catch(error) {
      return toggleAlert(netError);
    }

    if(response.status === 500) return toggleAlert(serverError);
    if(response.status === 401) return logout();

    const responseData = await response.json();

    toggleAlert({
      type: responseData.success ? "success" : "warning",
      message: responseData.message
    });

    if(responseData.success) {
      const newOffHours = offHours.filter(offHour => offHour._id !== offHourId);
      setOffHours(newOffHours);
    }
  };

  const getTime = (milli) => {
    return new Date(milli).toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    });
  };
  const getDate = (milli) => {
    return new Date(milli).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const clearData = () => {
    setEmail(null);
    setGuest(null);
    if(location.pathname !== "/appointments") setAppointments(null);
    if(location.pathname !== "/profile") {
      setUser(null);
      setOffHours(null);
    }
    if(location.pathname !== "/") setUsers(null);
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
    offHours,
    getOffHours,
    addOffHour,
    deleteOffHour,
    clearData,
    appointments,
    guest,
    setGuest,
    getAppointments,
    assignGuest,
    scheduleAppointment,
    cancelAppointment,
    getTime,
    getDate,
    logout
  };
  return (
    <AppContext.Provider value={collection}>
      {props.children}
    </AppContext.Provider>
  );
}
