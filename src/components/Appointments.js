import React, { useEffect, useContext } from "react";

import AppContext from "../context/AppContext";
import Spinner from "./Spinner";
import Appointment from "./Appointment";

export default function Appointments() {
  const { appointments, getAppointments, loading } = useContext(AppContext);
  document.title = "Ease Meet (Your upcoming Appointments)!";
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="text-center container">
      <h2>Your upcoming Appointments</h2>
      <div className="mt-4">
        {loading ? (
          <Spinner />
        ) : !appointments || appointments.length === 0 ? (
          <p>No upcoming appointments are there!</p>
        ) : (
          <ul className="appointments">
            {appointments.map((appointment) => (
              <Appointment key={appointment._id} appointment={appointment} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
