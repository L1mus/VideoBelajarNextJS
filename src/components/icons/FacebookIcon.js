import React from "react";

const FacebookIcon = ({ className = "w-6 h-6", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    {...props}
  >
    <path d="M22 12c0-5.523-4.477-10-10-10s-10 4.477-10 10c0 5.035 3.738 9.199 8.547 9.878v-6.988h-2.547v-2.89h2.547v-2.21c0-2.525 1.503-3.905 3.791-3.905 1.09 0 2.228.196 2.228.196v2.45h-1.285c-1.25 0-1.635.772-1.635 1.562v1.906h2.771l-.443 2.89h-2.328v6.988c4.809-.679 8.547-4.843 8.547-9.878z" />
  </svg>
);

export default FacebookIcon;
