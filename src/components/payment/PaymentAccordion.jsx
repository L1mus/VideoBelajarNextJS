"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const PaymentMethodItem = ({ method, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(method.id)}
    className="w-full flex items-center justify-between px-5 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center">
      <div className="relative h-7 w-14 flex items-center">
        <Image
          src={method.logo_url}
          alt={method.name}
          fill
          sizes="60px"
          className="object-contain"
        />
      </div>
      <span className="font-normal text-sm text-primary-foreground">
        {method.name}
      </span>
    </div>

    {selected ? (
      <Image
        src="/assets/icons/icon-checkred.svg"
        alt="Selected"
        width={24}
        height={24}
      />
    ) : (
      <div className="w-6 h-6" />
    )}
  </button>
);

const PaymentAccordion = ({
  title,
  methods,
  selectedMethod,
  onSelectMethod,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-5 py-4 bg-transparent border rounded-xl border-gray-300"
      >
        <p className="font-bold text-primary-foreground text-base">{title}</p>
        <ChevronDownIcon
          className={`w-5 h-5  transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`flex flex-col gap-5 transition-[max-height] duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {isOpen &&
          methods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              selected={selectedMethod === method.id}
              onSelect={onSelectMethod}
            />
          ))}
      </div>
    </div>
  );
};

export default PaymentAccordion;
