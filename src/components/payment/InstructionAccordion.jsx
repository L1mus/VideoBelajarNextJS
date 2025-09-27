"use client";

import React, { useState } from "react";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const InstructionAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-300 rounded-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4"
      >
        <h3 className="font-bold text-lg text-foreground">{title}</h3>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`transition-[max-height,padding] duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen px-4 pb-4" : "max-h-0"
        }`}
      >
        <div className="prose text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default InstructionAccordion;
