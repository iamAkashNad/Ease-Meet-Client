import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import Login from "./Login";
import Users from "./Users";
import Input from "./Input";
import TextArea from "./TextArea";

export default function Landing() {
  const { token, email, forgotPassword, guest, scheduleAppointment } = useContext(AppContext);
  if (email && !token) document.title = "Ease Meet (Forgot Password)!";
  if(guest) document.title = "Ease Meet (Schedule Appointment)!";
  return !token && email ? (
    <form onSubmit={forgotPassword}>
      <h2 className="mb-4 text-center">Forgot Password</h2>
      <Input
        id={"code"}
        type={"text"}
        name={"code"}
        label={"Verification Code"}
        required={true}
      />
      <Input
        id={"forgot-password"}
        name={"password"}
        type={"password"}
        label={"Password"}
        required={true}
      />
      <div className="container">
        <button className="btn btn-primary">Forgot Password!</button>
      </div>
    </form>
  ) : !token ? (
    <Login />
  ) : guest ? (
    <div className="container">
      <h2 className="text-center">Schedule Appointment</h2>
      <form className="my-4" onSubmit={scheduleAppointment}>
        <Input id={"guest"} name={"guest"} label={"Guest"} type={"text"} value={guest.email} disabled={true} />
        <Input id={"title"} name={"title"} label={"Appointment Title"} type={"text"} required={true} />
        <Input type={"datetime-local"} label={"Appointment Start"} name={"start"} id={"start"} required={true} />
        <Input type={"number"} label={"Duration"} name={"duration"} id={"duration"} required={true} />
        <TextArea id={"agenda"} label={"Appointment Agenda"} name={"agenda"} row={"4"} required={true} />
        <div className="container">
          <button className="btn btn-primary">Schedule!</button>
        </div>
      </form>
    </div>
  ) : (
    <Users />
  );
}
