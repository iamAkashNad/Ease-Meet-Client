import React, { useEffect, useContext } from "react";

import AppContext from "../context/AppContext";

import Spinner from "./Spinner";
import User from "./User";

export default function Users() {
  const { loading, fetchUsers, users } = useContext(AppContext);
  document.title = "Ease Meet - Let's make your appointment management easy and simple!";
  useEffect(() => {
    async function fetchData() {
      await fetchUsers();
    }
    fetchData();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container margin-top-3">
      <h2 className="mb-4 text-center">All Users</h2>
      {loading ? (
        <Spinner />
      ) : !users || users.length === 0 ? (
        <p className="text-center">No users Found!</p>
      ) : (
        <ul className="grid">
          {users.map((user) => (
            <User key={user._id} user={user} />
          ))}
        </ul>
      )}
    </div>
  );
}
