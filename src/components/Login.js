import "../App.css";

import React, { useContext } from "react";

import AppContext from "../context/AppContext";

import Model from "./Model";
import Input from "./Input";

export default function Login() {
  document.title = "Ease Meet (Login)!";
  const { login, sendCodeForForgot } = useContext(AppContext);
  return (
    <div className="container margin-top-3">
      <h2 className="mb-4 text-center">Log In</h2>
      <Model title={"Send Code for Forgot Password!"} id={"forgot_password"}>
        <form className="model-form" onSubmit={sendCodeForForgot.bind({ id: "forgot_password" })}>
          <Input label={"Email Address"} id={"model-email-input"} type={"email"} name={"email"} key={"model-email-input"} required={true} />
          <div className="container">
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </Model>
      <form onSubmit={login}>
        <Input id={"login-email"} type={"email"} label={"Email Address"} name={"email"} required={true} />
        <Input id={"login-password"} type={"password"} label={"Password"} name={"password"} required={true}>
          <button 
            type="button" 
            data-bs-toggle="modal" 
            data-bs-target="#forgot_password" 
            style={{ padding: "0", border: "none", backgroundColor: "transparent" }}>
              Forgot Password?
          </button>
        </Input>
        <div className="container">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
