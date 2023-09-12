import React, { useContext, useEffect } from "react";

import AppContext from "../context/AppContext";

import Spinner from "./Spinner";
import UserData from "./UserData";

export default function Profile() {
  const { user, getProfile, loading } = useContext(AppContext);

  useEffect(() => {
    async function profile() {
      await getProfile();
    }
    profile();
    // eslint-disable-next-line
  }, []);

  return loading ? (
    <Spinner />
  ) : user ? (
    <UserData user={user} />
  ) : (
    ""
  );
}
