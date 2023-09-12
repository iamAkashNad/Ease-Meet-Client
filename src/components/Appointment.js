import React, { useContext } from "react";

import AppContext from "../context/AppContext";

export default function Appointment({ appointment }) {
  const { user } = useContext(AppContext);
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

  const getUserInfo = (person) => {
    return (
      <p>
        {person.name}{" "}
        {user.email !== person.email ? (
          <a href={`mailto:${person.email}`}>
            {person.email}
          </a>
        ) : (
          <span>{person.email}</span>
        )}
      </p>
    );
  };

  return (
    <li className="appointment">
      <div className="appointment-body">
        <h5 className="card-title">{appointment.title}</h5>
        <p className="card-text">{appointment.agenda}</p>
        <div
          className="d-flex time"
          style={{ justifyContent: "space-between" }}
        >
          <p>{getTime(appointment.start)(getDate(appointment.start))}</p>
          {" ---> "}
          <p>{getTime(appointment.end)(getDate(appointment.end))}</p>
        </div>
        <div className="user-info">
          <div className="admin">
            <p>Admin</p>
            {getUserInfo(appointment.admin)}
          </div>
          <div className="guest">
            <p>Guest</p>
            {getUserInfo(appointment.guest)}
          </div>
        </div>
        {!appointment.cancel ? (
          <button className="btn btn-outline-danger">Cancel</button>
        ) : (
          <span className="bedge">Cancel</span>
        )}
      </div>
    </li>
  );
}
