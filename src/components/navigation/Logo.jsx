import React from "react";
import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Image
        src="/assets/images/Logo.jpg"
        alt="Videobelajar Logo"
        width={200}
        height={40}
        style={{ height: "auto", width: "auto" }}
        priority
      />
    </div>
  );
};

export default Logo;
