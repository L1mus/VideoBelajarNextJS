import React from "react";

const Switch = ({
  checked = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const containerStyles = `relative inline-flex items-center cursor-pointer ${className}`;
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <label className={`${containerStyles} ${disabledStyles}`}>
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        disabled={disabled}
        readOnly
        {...props}
      />

      <div
        className="w-11 h-6 bg-primary-100 rounded-full transition-colors
                   peer-checked:bg-primary-default"
      ></div>

      <div
        className="absolute left-0.5 top-0.5 bg-gray-50 border-border border rounded-full 
                   h-5 w-5 transition-transform peer-checked:translate-x-full peer-checked:border-white"
      ></div>
    </label>
  );
};

export default Switch;
