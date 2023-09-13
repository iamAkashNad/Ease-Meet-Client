import React from "react";

export default function Input({ label, id, name, type, children, required, value, disabled }) {
  return (
    <div className="container mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {value ? (
        <input
          type={type}
          className="form-control"
          id={id}
          aria-describedby="emailHelp"
          name={name}
          value={value}
          disabled={disabled || false}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          id={id}
          aria-describedby="emailHelp"
          name={name}
          required={required || false}
          disabled={disabled || false}
        />
      )}
      {children}
    </div>
  );
}
