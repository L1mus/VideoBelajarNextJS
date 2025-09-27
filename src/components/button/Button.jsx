import React from "react";

const Button = ({
  children,
  variant = "solid", // 'solid', 'outline', 'light'
  color = "primary", // 'primary', 'secondary', 'disabled'
  size = "md", // 'sm', 'md', 'lg'
  className = "",
  ...props
}) => {
  const baseStyles =
    "font-bold rounded-xl transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2";

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const colorStyles = {
    solid: {
      primary:
        "bg-primary-default text-white hover:bg-primary-400 focus:ring-primary-default",
      secondary:
        "bg-secondary-default text-white hover:bg-secondary-400 focus:ring-secondary-default",
      disabled:
        "bg-gray-400 text-text-disabled hover:bg-gray-500 focus:ring-gray-600",
    },
    light: {
      primary:
        "bg-primary-100 text-primary-default hover:bg-primary-200 focus:ring-primary-100",
      secondary:
        "bg-secondary-100 text-secondary-default hover:bg-secondary-200 focus:ring-secondary-100",
      disabled:
        "bg-gray-300 text-text-disabled hover:bg-gray-300 focus:ring-gray-200",
    },
    outline: {
      primary:
        "bg-transparent border-2 border-primary-default text-primary-default hover:bg-primary-100 focus:ring-primary-default",
      secondary:
        "bg-transparent border-2 border-secondary-default text-secondary-default hover:bg-secondary-100 focus:ring-secondary-default",
      disabled:
        "bg-gray-200 border-2 border-text-disabled text-text-disabled hover:bg-gray-100 focus:ring-gray-500",
    },
  };

  const combinedClassName = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${colorStyles[variant][color]}
    ${className}
  `;

  return (
    <button className={combinedClassName.trim()} {...props}>
      {children}
    </button>
  );
};

export default Button;
