import React from "react";
import { formatRupiah, renderStars } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import Chip from "../button/Chip";

const OrderSummaryCard = ({
  variant = "default",
  title = "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
  price = 500000,
  discountedPrice = 250000,
  discountPercentage = 50,
  specialOfferText = "Penawaran spesial tersisa 2 hari lagi!",
  includes = [
    { icon: "/assets/icons/icon-file-check.svg", text: "Ujian Akhir" },
    { icon: "/assets/icons/icon-video.svg", text: "49 Video" },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ],
  language = "Bahasa Indonesia",
  checkoutUrl,
}) => {
  const isMobile = variant === "mobile";

  return (
    <div
      className={`flex flex-col bg-white rounded-lg border border-gray-200 p-6 gap-6 shadow-sm ${
        isMobile ? "w-full h-auto" : "w-91.5 h-auto"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground leading-tight">
            {title}
          </h2>
        </div>
        <div className="flex flex- items-center justify-between">
          <div className="flex items-baseline gap-x-1 gap-y-1">
            <p className="text-lg font-bold text-primary-default">
              {formatRupiah(discountedPrice)}
            </p>
            {price && (
              <p className="text-base font-bold text-gray-400 line-through">
                {formatRupiah(price)}
              </p>
            )}
          </div>
          <div>
            {discountPercentage && (
              <Chip color="secondary" variant="light" className="font-bold">
                Diskon {discountPercentage}%
              </Chip>
            )}
          </div>
        </div>
        {specialOfferText && (
          <div>
            <p className="text-sm font-medium text-info-default">
              {specialOfferText}
            </p>
          </div>
        )}
      </div>

      <Link href={checkoutUrl || "#"}>
        <Button variant="solid" color="primary" size="md" className="w-full">
          Beli Sekarang
        </Button>
      </Link>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold text-foreground">
          Kelas Ini Sudah Termasuk
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {includes.map((item, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-600">
              <Image
                src={item.icon}
                alt={item.text}
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-base font-bold text-foreground">
          Bahasa Pengantar
        </h3>
        <div className="flex items-center gap-3 text-gray-600">
          <Image
            src="/assets/icons/icon-world.svg"
            alt="Bahasa"
            width={20}
            height={20}
            className="flex-shrink-0"
          />
          <span className="text-sm">{language}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
