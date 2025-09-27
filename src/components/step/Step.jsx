import React from "react";
import CheckIcon from "../icons/CheckStepIcon";

const Step = ({ title, status = "default" }) => {
  const renderIcon = () => {
    switch (status) {
      case "completed":
        return (
          <div className="w-7 h-7 rounded-full bg-primary-default flex items-center justify-center text-white flex-shrink-0">
            <CheckIcon />
          </div>
        );
      case "current":
        return (
          <div className="w-7 h-7 rounded-full border-2 border-primary-default bg-white p-1 flex-shrink-0">
            <div className="w-full h-full rounded-full bg-primary-default" />
          </div>
        );
      default:
        return (
          <div className="w-7 h-7 rounded-full border-2 border-gray-300 bg-tranparent p-1">
            <div className="w-full h-full rounded-full bg-gray-300" />
          </div>
        );
    }
  };

  const getTitleStyles = () => {
    const baseClasses = "text-sm sm:text-base whitespace-nowrap";

    switch (status) {
      case "current":
      case "completed":
        return `${baseClasses} text-foreground font-bold`;
      default:
        return `${baseClasses} text-gray-500 font-medium`;
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      {renderIcon()}
      <p className={getTitleStyles()}>{title}</p>
    </div>
  );
};

export default Step;
