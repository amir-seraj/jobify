import React from "react";

export default function FormRow({
  type,
  name,
  value,
  handleChange,
  labelText,
}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        handleChange={handleChange}
        className="form-input"
      />
    </div>
  );
}
