import { formatRupiah, renderStars } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const CourseCard = ({
  variant = "default",
  isPriority = false,
  title = "Big 4 Auditor Financial Analyst",
  description = "Mulai transformasi dengan instruktur profesional, harga yang terjangkau, dan...",
  authorName = "Jenna Ortega",
  authorRole = "Senior Accountant",
  authorCompany = "Gojek",
  authorImage = "/assets/images/avatar3.jpg",
  rating = 3.5,
  reviewCount = 86,
  price = 300000,
  discountedPrice,
  imageUrl = "/assets/images/cover7.jpg",
}) => {
  if (variant === "mobile") {
    const mobileClasses =
      "flex w-90 max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1";

    return (
      <div className={mobileClasses}>
        <div className="flex w-full gap-4">
          <div className="relative h-24 w-24 flex-shrink-0">
            <Image
              src={imageUrl}
              alt={title}
              fill
              priority={isPriority}
              sizes="96px"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between ">
            <div>
              <h6 className="text-base font-bold line-clamp-2">{title}</h6>
              <div className="mt-1 flex items-center gap-2">
                <div className="relative h-6 w-6">
                  <Image
                    src={authorImage}
                    alt={authorName}
                    fill
                    sizes="24px"
                    className="rounded-full object-cover"
                  />
                </div>
                <p className="text-xs text-gray-600">{authorName}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {renderStars(rating)}
                </div>
                <span className="text-xs">
                  {rating} ({reviewCount})
                </span>
              </div>
              <p className="text-base font-bold text-primary-default">
                {formatRupiah(price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const defaultClasses =
    "flex w-full flex-col rounded-xl border border-gray-200 bg-white p-5 h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-2";

  return (
    <div className={defaultClasses}>
      <div className="relative w-full aspect-video">
        <Image
          src={imageUrl}
          alt={title}
          fill
          priority={isPriority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-grow flex-col gap-2 pt-4">
        <h6 className="text-lg font-bold">{title}</h6>
        <p className="text-base text-gray-600 line-clamp-2">{description}</p>
        <div className="flex items-center gap-3 pt-2">
          <div className="relative h-10 w-10">
            <Image
              src={authorImage}
              alt={authorName}
              fill
              sizes="40px"
              className="rounded-xl object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{authorName}</p>
            <p className="text-xs">
              {authorRole}
              <span> di </span>
              <span className="font-bold">{authorCompany}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4">
        <div className="flex items-center gap-1">
          <div className="flex">{renderStars(rating)}</div>
          <span className="text-sm ">
            {rating} ({reviewCount})
          </span>
        </div>
        {discountedPrice ? (
          <div className="flex items-center gap-2">
            <p className="text-lg font-bold text-gray-400 line-through">
              {formatRupiah(price)}
            </p>
            <p className="text-xl font-bold text-green-500">
              {formatRupiah(discountedPrice)}
            </p>
          </div>
        ) : (
          <p className="text-xl font-bold text-primary-default">
            {formatRupiah(price)}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
