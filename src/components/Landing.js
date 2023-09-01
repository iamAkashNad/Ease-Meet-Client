import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Login from "./Login";

export default function Landing() {
  const { token } = useContext(AppContext);
  return !token ? <Login /> : "<h2>Hello World!</h2>";
}
