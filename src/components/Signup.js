import React, { useContext } from "react";

import AppContext from "../context/AppContext";
import Input from "./Input";

export default function Signup() {
  const { signup } = useContext(AppContext);
  document.title = "Ease Meet (Sign Up)!";
  return (
    <div className="container margin-top-3">
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form onSubmit={signup}>
        <Input id={"signup-name"} label={"Your Name"} type={"text"} name={"username"} required={true} />
        <Input id={"signup-email"} label={"Email Address"} type={"email"} name={"email"} required={true} />
        <Input id={"signup-password"} label={"Password"} type={"password"} name={"password"} required={true} />
        <div className="container">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
