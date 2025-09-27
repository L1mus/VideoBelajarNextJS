import React from "react";

export const formatRupiah = (value) => {
  if (typeof value !== "number") {
    return "Rp 0";
  }
  if (value >= 1000) {
    return `Rp ${value / 1000}K`;
  }
  return `Rp ${value}`;
};

export const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        className={i <= fullStars ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    );
  }
  return stars;
};
