// src/components/dropdown/ProgressDropdown.js
"use client";

import React, { useState, useRef, useEffect } from "react";
import Button from "../button/Button";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const ProgressDropdown = ({
  progress = 83,
  completedModules = 10,
  totalModules = 12,
}) => {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <div className="hidden md:block w-24 bg-gray-200 rounded-full h-2">
          <div
            className="bg-secondary-default h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p
          className={`text-sm font-medium transition-colors ${
            isOpen ? "text-primary-default" : "text-foreground"
          }`}
        >
          {`${completedModules}/${totalModules}`}
        </p>
        <ChevronDownIcon
          className={`w-4 h-4 transition-all ${
            isOpen ? "text-primary-default rotate-180" : "text-gray-500"
          }`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-4 w-99 bg-white rounded-xl shadow-lg p-6 z-10 
                     before:content-[''] before:absolute before:bottom-full before:right-4 
                     before:border-8 before:border-transparent before:border-b-white"
        >
          <h3 className="text-lg font-bold text-foreground">
            {progress}% Modul Telah Selesai
          </h3>
          <hr className="my-3 border-gray-200" />
          <p className="text-base mb-5">
            Selesaikan Semua Modul Untuk Mendapatkan Sertifikat
          </p>
          <Button
            variant="solid"
            color="disabled"
            size="md"
            className="w-full"
            disabled
          >
            Ambil Sertifikat
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProgressDropdown;
