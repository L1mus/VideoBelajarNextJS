"use client";

import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes = 10 }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-2 text-red-600 font-bold">
      <span className="bg-red-200 text-red-700 px-2 py-1 rounded-md">
        {String(minutes).padStart(2, "0")}
      </span>
      <span>:</span>
      <span className="bg-red-200 text-red-700 px-2 py-1 rounded-md">
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default CountdownTimer;
