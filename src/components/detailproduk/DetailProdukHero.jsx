import React from "react";
import { formatRupiah, renderStars } from "@/lib/utils";

const DetailProdukHero = ({
  title,
  subtitle,
  rating,
  reviewCount,
  imageUrl,
}) => {
  return (
    <div
      className="relative w-full h-auto md:h-96 bg-cover bg-center rounded-2xl overflow-hidden flex items-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative z-10 flex flex-col items-start text-left text-white p-8 md:p-12 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {title}
        </h1>
        <p className="text-lg mt-4">{subtitle}</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="flex text-xl">{renderStars()}</div>
          <span className="text-base font-bold">{rating}</span>
          <span className="text-base text-gray-200">
            ({reviewCount} rating)
          </span>
        </div>
      </div>
    </div>
  );
};

export default DetailProdukHero;
