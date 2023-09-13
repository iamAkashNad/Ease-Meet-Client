import React, { useContext } from "react";

import Model from "./Model";
import Input from "./Input";

import AppContext from "../context/AppContext";

export default function UserData({ user }) {
  const { changeProfileName, sendCodeForVerifyEmail } = useContext(AppContext);
  document.title = `Ease Meet (${user.name})!`;
  return (
    <>
      <Model title={"Change Profile Name"} id={"update_user_name"}>
        <form onSubmit={changeProfileName.bind({ id: "update_user_name" })} className="model-form">
            <Input id={"password"} name={"password"} label={"Your Password"} type={"password"} required={true} />
            <Input id={"username"} name={"username"} label={"Profile Name"} type={"text"} required={true} />
            <div className="container">
                <button className="btn btn-primary">Change Name</button>
            </div>
        </form>
      </Model>
      <div className="text-center container user-profile">
        <h2>User Info</h2>
        <hr />
        <p>Name: {user.name}</p>
        <hr />
        <p>
          Email: {user.email}{" "}
          {user.verified ? (
            <i
              className="fa-solid fa-circle-check"
              style={{ fontSize: "1rem", color: "rgb(16, 16, 174)" }}
            ></i>
          ) : (
            <button onClick={sendCodeForVerifyEmail} className="btn btn-sm btn-primary">verify</button>
          )}
        </p>
        <hr />
        <button
          data-bs-toggle="modal"
          data-bs-target="#update_user_name"
          className="btn btn-sm btn-primary"
        >
          Update Profile Name
        </button>
      </div>
    </>
  );
}
