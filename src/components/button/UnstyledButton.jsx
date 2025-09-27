import React from "react";
import ArrowLeftIcon from "../icons/ArrowLeftIcon";
import ArrowRightIcon from "../icons/ArrowRightIcon";

const UnstyledButton = ({
  children,
  iconLeft = false,
  iconRight = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "flex items-center gap-x-2 font-semibold text-text-secondary transition-colors duration-200 ease-in-out";

  const stateStyles = disabled
    ? "text-text-disabled cursor-not-allowed"
    : "hover:text-primary-default cursor-pointer";

  const combinedClassName = `
    ${baseStyles}
    ${stateStyles}
    ${className}
  `.trim();

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {iconLeft && <ArrowLeftIcon />}
      <span>{children}</span>
      {iconRight && <ArrowRightIcon />}
    </button>
  );
};

export default UnstyledButton;
