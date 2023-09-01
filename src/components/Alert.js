import React, { useContext } from "react";

import AppContext from "../context/AppContext";

export default function Alert() {
  const { alert } = useContext(AppContext);
  return (
    alert && (
      <div className={`alert alert-${alert.type}`} role="alert">
        {alert.message}
      </div>
    )
  );
}
