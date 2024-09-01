import React from "react";

const InputField = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  className = "",
  placeholder = "",
  min,
  max,
  minLength,
  maxLength,
  pattern,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border px-2 py-1 ${className}`}
        placeholder={placeholder}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        {...props}
      />
    </div>
  );
};

export default InputField;
