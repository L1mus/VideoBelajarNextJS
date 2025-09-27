import React from "react";

const Stepper = ({ children, currentStep = 0, className = "" }) => {
  const steps = React.Children.toArray(children);
  const totalSteps = steps.length;

  return (
    <div className={`flex items-center justify-center w-full p-2 ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isLastStep = index === totalSteps - 1;

        let status = "default";
        if (isCompleted) {
          status = "completed";
        } else if (isCurrent) {
          status = "current";
        }

        return (
          <div key={index} className="flex items-center">
            {React.cloneElement(step, { status })}
            {!isLastStep && (
              <div
                className={`h-0.5 mx-2 w-4 sm:w-8 md:w-12 transition-all duration-300 ${
                  isCompleted ? "bg-primary-default" : "bg-gray-300"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
