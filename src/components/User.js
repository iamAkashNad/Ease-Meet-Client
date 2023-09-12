import React from "react";

export default function User({ user }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="name">
          {user.name}{" "}
          {user.verified ? (
            <i
              className="fa-solid fa-circle-check"
              style={{ fontSize: "1rem", color: "rgb(16, 16, 174)" }}
            ></i>
          ) : (
            ""
          )}
        </h5>
        <p className="card-text">{user.email}</p>
        <button className="btn btn-sm btn-primary">Ask for Appointment</button>
      </div>
    </div>
  );
}
