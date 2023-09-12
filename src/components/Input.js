import React from "react";

export default function Input({ label, id, name, type, children, required }) {
  return (
    <div className="container mb-3">
      <label htmlFor={id} className="form-label">
        { label }
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        aria-describedby="emailHelp"
        name={name}
        required={required || false}
      />
      { children }
    </div>
  );
}
