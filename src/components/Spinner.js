import React from "react";

export default function Spinner() {
  return (
    <div className="text-center">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
