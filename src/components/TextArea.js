import React from "react";

export default function TextArea({ row, id, name, label, required }) {
  return (
    <div className="mb-3 container">
      <label htmlFor={id} class="form-label">
        {label}
      </label>
      <textarea
        className="form-control"
        style={{ resize: "none" }}
        id={id}
        rows={row}
        name={name}
        required={required || false}
      ></textarea>
    </div>
  );
}
