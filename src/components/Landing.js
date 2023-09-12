import React, { useContext } from "react";
import AppContext from "../context/AppContext";

import Login from "./Login";
import Users from "./Users";
import Input from "./Input";

export default function Landing() {
  const { token, email, forgotPassword } = useContext(AppContext);
  if(email && !token) document.title = "Ease Meet (Forgot Password)!"; 
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
      <button className="btn btn-primary">Forgot Password!</button>
    </form>
  ) : !token ? (
    <Login />
  ) : (
    <Users />
  );
}
