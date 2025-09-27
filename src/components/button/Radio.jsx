import React from "react";

const Checkbox = ({
  label,
  checked = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "relative flex items-center cursor-pointer select-none transition-opacity";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  const boxBaseStyles =
    "w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ease-in-out";

  const getBoxStateStyles = () => {
    if (disabled) {
      return checked
        ? "bg-gray-200 border-gray-300"
        : "bg-transparent border-gray-300";
    }
    if (checked) {
      return "bg-primary-default border-primary-default";
    }
    return "bg-primary-100 border-primary-default";
  };

  const getCheckmarkStyles = () => {
    if (disabled && checked) {
      return "text-gray-700";
    }
    return "text-white";
  };

  const combinedClassName = `
    ${baseStyles}
    ${disabledStyles}
    ${className}
  `.trim();
  g;

  return (
    <label className={combinedClassName}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        disabled={disabled}
        readOnly
        {...props}
      />
      <div className={`${boxBaseStyles} ${getBoxStateStyles()}`}>
        {checked && (
          <svg
            className={`w-4 h-4 ${getCheckmarkStyles()}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {label && <span className="ml-2 text-text-secondary">{label}</span>}
    </label>
  );
};

export default Checkbox;
