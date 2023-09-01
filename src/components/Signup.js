import React, { useContext } from "react";

import AppContext from "../context/AppContext";

export default function Signup() {
  const { signup } = useContext(AppContext);
  return (
    <div className="container margin-top-3">
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form onSubmit={signup}>
        <div className="container mb-2">
          <label htmlFor="exampleInputName1" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputName1"
            name="username"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div className="container mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            required
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
            required
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
