import React, { useContext, useEffect } from "react";

import AppContext from "../context/AppContext";

import Spinner from "./Spinner";
import UserData from "./UserData";
import Input from "./Input";

export default function Profile() {
  const { user, getProfile, loading, verifyEmail, email } = useContext(AppContext);

  useEffect(() => {
    async function profile() {
      await getProfile();
    }
    profile();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Spinner />
  ) : email ? (
    <form onSubmit={verifyEmail}>
      <h2 className="mb-4 text-center">Email Verification</h2>
      <Input
        id={"code"}
        type={"text"}
        name={"code"}
        label={"Verification Code"}
        required={true}
      />
      <div className="container">
        <button className="btn btn-primary">Send Code!</button>
      </div>
    </form>
  ) : user ? (
    <UserData user={user} />
  ) : (
    ""
  );
}
