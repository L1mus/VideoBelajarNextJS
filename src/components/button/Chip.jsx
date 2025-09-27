import React from "react";

const Chip = ({
  variant = "solid", // 'solid', 'outline', 'light'
  color = "primary", // 'primary', 'secondary', 'disabled', dan lainnya
  children,
  className = "",
}) => {
  const baseStyles =
    "flex items-center justify-center text-sm font-medium py-1 px-2.5 rounded-xl ";

  const colorStyles = {
    light: {
      primary: "bg-primary-100 text-primary-default",
      secondary: "bg-secondary-100 text-secondary-default",
      success: "bg-success-background text-success-default",
      info: "bg-info-background text-info-default",
      warning: "bg-warning-background text-warning-default",
      error: "bg-error-background text-error-default",
      disabled: "bg-gray-300 text-gray-500",
    },
    solid: {
      primary: "bg-primary-default text-white",
      secondary: "bg-secondary-default text-white",
      success: "bg-success-default text-white",
      info: "bg-info-default text-white",
      warning: "bg-warning-default text-white",
      error: "bg-error-default text-white",
      disabled: "bg-gray-400 text-text-disabled",
    },
    outline: {
      primary:
        "bg-transparent border border-primary-default text-primary-default",
      secondary:
        "bg-transparent border border-secondary-default text-secondary-default",
      success:
        "bg-transparent border border-success-default text-success-default",
      info: "bg-transparent border border-info-default text-info-default",
      warning:
        "bg-transparent border border-warning-default text-warning-default",
      error: "bg-transparent border border-error-default text-error-default",
      disabled: "bg-gray-200 border border-gray-500 text-gray-500",
    },
  };

  const combinedClassName = `
    ${baseStyles}
    ${colorStyles[variant][color]}
    ${className}
  `;

  return <div className={combinedClassName.trim()}>{children}</div>;
};

export default Chip;
