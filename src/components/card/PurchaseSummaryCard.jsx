import React from "react";
import { formatRupiah, renderStars } from "@/lib/utils";
import Image from "next/image";
import Chip from "../button/Chip";

const PurchaseSummaryCard = ({
  title = "Gapai Karier Impianmu sebagai Seorang UI/UX Designer & Product Manager.",
  price = 500000,
  discountedPrice = 250000,
  discountPercentage = 50,
  includes = [
    { icon: "/assets/icons/icon-file-check.svg", text: "Ujian Akhir" },
    { icon: "/assets/icons/icon-video.svg", text: "49 Video" },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ],
  language = "Bahasa Indonesia",
  imageUrl = "/assets/images/cover3.jpg",
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 flex flex-col gap-4">
        <div className="relative w-full aspect-video hidden sm:block">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <h6 className="text-lg text-primary-foreground leading-tight">
          {title}
        </h6>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-x-1">
            <p className="text-lg font-bold text-primary-default">
              {formatRupiah(discountedPrice)}
            </p>
            {price && (
              <p className="text-base text-gray-400 line-through">
                {formatRupiah(price)}
              </p>
            )}
          </div>
          {discountPercentage && (
            <Chip color="secondary" variant="solid" className="font-bold">
              Diskon {discountPercentage}%
            </Chip>
          )}
        </div>

        <div>
          <p className="text-sm font-bold text-primary-foreground foreground mb-3">
            Kelas Ini Sudah Termasuk
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {includes.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-foreground"
              >
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

        <div>
          <p className="text-sm font-bold text-primary-foreground mb-3">
            Bahasa Pengantar
          </p>
          <div className="flex items-center gap-3 text-foreground">
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
    </div>
  );
};

export default PurchaseSummaryCard;
