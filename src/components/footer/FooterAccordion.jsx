"use client";

import React, { useState } from "react";
import ChevronRightIcon from "../icons/ChevronRightIcon";

const FooterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-4 border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <ChevronRightIcon
          className={`w-5 h-5 text-foreground transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      <div
        className={`transition-[max-height,padding] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 pt-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default FooterAccordion;
