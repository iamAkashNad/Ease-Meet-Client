import "../App.css";

import React, { useContext } from "react";

import AppContext from "../context/AppContext";

export default function Login() {
  const { login } = useContext(AppContext);
  return (
    <div className="container margin-top-3">
      <h2 className="mb-4 text-center">Log In</h2>
      <form onSubmit={login}>
        <div className="container mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
          />
        </div>
        <div className="container mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
          />
        </div>
        <div className="container">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
