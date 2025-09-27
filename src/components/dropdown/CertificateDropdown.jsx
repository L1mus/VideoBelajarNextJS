"use client";

import React, { useState, useRef, useEffect } from "react";
import PialaIcon from "../icons/PialaIcon";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import Button from "../button/Button";

const CertificateDropdown = ({ isIconOnly = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttonPadding = isIconOnly ? "p-2" : "px-4 py-2";

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center gap-x-2 text-sm font-bold text-primary-default bg-transparent border-2 border-primary-default rounded-xl transition-all duration-200 ease-in-out hover:bg-primary-100 focus:outline-none ${buttonPadding}`}
      >
        <PialaIcon />
        {!isIconOnly && <span>Ambil Sertifikat</span>}
        <ChevronDownIcon
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ${
            isIconOnly ? "w-4 h-4" : "w-5 h-5"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-99 bg-white rounded-xl shadow-lg p-6 z-10 before:content-[''] before:absolute before:bottom-full before:right-4 before:border-8 before:border-transparent before:border-b-white">
          <h3 className="text-lg font-bold text-foreground">
            Modul sudah selesai
          </h3>
          <p className="text-base mt-2 mb-5">
            16 dari 16 modul telah selesai, silahkan download sertifikat
          </p>
          <Button variant="solid" color="primary" size="md" className="w-full">
            Ambil Sertifikat
          </Button>
        </div>
      )}
    </div>
  );
};

export default CertificateDropdown;
