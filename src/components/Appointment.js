import React, { useContext } from "react";

import AppContext from "../context/AppContext";

export default function Appointment({ appointment }) {
  const { userId, cancelAppointment, getTime, getDate } = useContext(AppContext);

  const getUserInfo = (person) => {
    return (
      <span>
        {`${person.name}${userId === person._id ? "(You)" : ""}`}{" ("}
        {userId !== person._id ? (
          <a style={{ textDecoration: "none", color: "black" }} href={`mailto:${person.email}`}>
            {person.email}
          </a>
        ) : (
          <span>{person.email}</span>
        )}{")"}
      </span>
    );
  };

  return (
    <li className="appointment">
      <div className="appointment-body">
        <div className="appointment-meta">
          <h5 className="card-title">{appointment.title}</h5>
          <p className="card-text">{appointment.agenda}</p>
        </div>
        <hr />
        <div className="appointment-time">
          <p><strong>Duration</strong>: {(new Date(appointment.end) - new Date(appointment.start)) / (1000 * 60 * 60)} hours</p>
          <p><strong>Start Time</strong>: {`${getTime(appointment.start)} (${getDate(appointment.start)})`}</p>
          <p><strong>End Time</strong>: {`${getTime(appointment.end)} (${getDate(appointment.end)})`}</p>
        </div>
        <hr />
        <div className="user-info">
          <div className="admin">
            <p><strong>Admin</strong>: {getUserInfo(appointment.admin)}</p>
          </div>
          <div className="guest">
            <p><strong>Guest</strong>: {getUserInfo(appointment.guest)}</p>
          </div>
        </div>
        <hr />
        <div className="manager">
          {new Date(appointment.start) <= Date.now() && Date.now() <= new Date(appointment.end) ?
            <span className="bedge">Running</span>
          : !appointment.cancel ? (
            <button onClick={cancelAppointment.bind(null, appointment._id)} className="btn btn-outline-danger">Cancel</button>
          ) : (
            <span className="bedge danger">Canceled</span>
          )}
        </div>
      </div>
    </li>
  );
}
