"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/button/Button";

const InfoPaymentClientPage = ({ status }) => {
  const isSuccess = status === "success";

  const content = {
    success: {
      image: "/assets/images/online-shopping-female 1.jpg",
      title: "Pembayaran Berhasil!",
      message:
        "Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.",
      buttonText: "Lihat Detail Pesanan",
    },
    pending: {
      image: "/assets/images/online-shopping 1.jpg",
      title: "Pembayaran Tertunda!",
      message:
        "Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.",
      buttonText: "Lihat Detail Pesanan",
    },
  };

  const currentContent = isSuccess ? content.success : content.pending;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm text-center">
        <Image
          src={currentContent.image}
          alt={currentContent.title}
          width={250}
          height={250}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold text-foreground mt-6">
          {currentContent.title}
        </h1>
        <p className="text-gray-600 mt-2">{currentContent.message}</p>
        <div className="mt-8">
          <Link href="/#">
            {" "}
            <Button
              variant="solid"
              color="primary"
              size="md"
              className="w-full"
            >
              {currentContent.buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InfoPaymentClientPage;
