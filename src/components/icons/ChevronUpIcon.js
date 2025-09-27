import React from "react";

const ChevronUpIcon = ({ className = "w-5 h-5", ...props }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 16L12 9L19 16"
      stroke-opacity="0.68"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default ChevronUpIcon;
