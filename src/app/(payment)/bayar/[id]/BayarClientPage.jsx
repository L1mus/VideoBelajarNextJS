"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PurchaseSummaryCard from "@/components/card/PurchaseSummaryCard";
import Button from "@/components/button/Button";
import CountdownTimer from "@/components/payment/CountdownTimer";
import InstructionAccordion from "@/components/payment/InstructionAccordion";

const instructionTemplates = {
  bankTransfer: [
    {
      title: (methodName) => `ATM ${methodName}`,
      content: (methodName) => (
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Masukkan kartu ATM dan PIN Anda.</li>
          <li>
            Di menu utama, pilih menu "Transfer" atau "Pembayaran Lainnya".
          </li>
          <li>
            Pilih tujuan transfer ke "Virtual Account" dan masukkan nomor
            Virtual Account yang tertera.
          </li>
          <li>Pastikan detail transaksi sesuai, lalu selesaikan pembayaran.</li>
        </ol>
      ),
    },
    {
      title: (methodName) => `Mobile Banking ${methodName}`,
      content: (methodName) => (
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Login ke aplikasi Mobile Banking Anda.</li>
          <li>Pilih menu "Transfer", lalu pilih "Virtual Account".</li>
          <li>
            Masukkan nomor Virtual Account dan pastikan semua detail benar
            sebelum menyelesaikan transaksi.
          </li>
        </ol>
      ),
    },
  ],
  eWallet: [
    {
      title: (methodName) => `Cara Bayar via ${methodName}`,
      content: (methodName) => (
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>Buka aplikasi {methodName} Anda.</li>
          <li>Pilih menu "Bayar" atau "Pay".</li>
          <li>
            Ikuti notifikasi pembayaran yang muncul atau pindai kode QR jika
            diminta.
          </li>
          <li>Masukkan PIN keamanan Anda untuk mengonfirmasi pembayaran.</li>
        </ol>
      ),
    },
  ],
  creditCard: [
    {
      title: "Pembayaran Kartu Kredit/Debit",
      content: (
        <p className="text-sm">
          Pembayaran dengan kartu kredit/debit biasanya diproses secara
          otomatis. Jika ada kendala, silakan hubungi layanan pelanggan kami.
        </p>
      ),
    },
  ],
  default: [
    {
      title: "Petunjuk Pembayaran",
      content: (
        <p className="text-sm">
          Silakan selesaikan pembayaran sesuai dengan instruksi yang dikirimkan
          ke email Anda atau yang tertera pada aplikasi pembayaran pilihan Anda.
        </p>
      ),
    },
  ],
};

const getPaymentType = (methodName) => {
  const name = methodName.toLowerCase();
  if (name.includes("bank")) return "bankTransfer";
  if (["dana", "ovo", "link aja", "shopeepay"].some((e) => name.includes(e)))
    return "eWallet";
  if (["visa", "master card", "jcb"].some((c) => name.includes(c)))
    return "creditCard";
  return "default";
};

const BayarClientPage = ({ orderData }) => {
  const router = useRouter();

  const { course, invoice, total_amount } = orderData;
  const paymentMethod = invoice.payment_method;

  const paymentType = getPaymentType(paymentMethod.name);
  const currentInstructions = instructionTemplates[paymentType];

  const courseIncludes = [
    { icon: "/assets/icons/icon-file-check.svg", text: "Ujian Akhir" },
    {
      icon: "/assets/icons/icon-video.svg",
      text: `${course.chapters.reduce(
        (acc, chapter) => acc + chapter.lessons.length,
        0
      )} Video`,
    },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ];

  const subtotal = Number(total_amount) - 7000;
  const adminFee = 7000;

  return (
    <div className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center justify-center bg-orange-100 text-orange-800 p-4 rounded-lg mb-8">
          <p className="mr-4">Selesaikan pemesanan dalam</p>
          <CountdownTimer initialMinutes={10} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 flex flex-col gap-y-8">
            <div className="lg:hidden">
              <PurchaseSummaryCard
                title={course.title}
                price={Number(course.price)}
                discountedPrice={subtotal}
                discountPercentage={50}
                includes={courseIncludes}
                language="Bahasa Indonesia"
                imageUrl={course.thumbnail_url}
              />
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
              <div className="flex flex-col items-center justify-center text-center border border-gray-300 rounded-xl pb-4.5">
                <div className="mb-3">
                  <Image
                    src={paymentMethod.logo_url}
                    alt={paymentMethod.name}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <p className="text-;g text-primary-foreground">
                  Bayar Melalui {paymentMethod.name}
                </p>
                <div className="flex items-center justify-center gap-3 mt-2">
                  <p className="text-lg font-bold text-foreground">
                    {invoice.invoice_number
                      .replace("INV-", "")
                      .substring(0, 13)}
                  </p>
                  <button className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                    Salin
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6"></div>

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-bold text-foreground">
                  Ringkasan Pesanan
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between items-start gap-4">
                    <span>Video Learning: {course.title}</span>
                    <span className="flex-shrink-0 font-medium">
                      Rp {subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <span>Biaya Admin</span>
                    <span className="flex-shrink-0 font-medium">
                      Rp {adminFee.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="font-bold text-foreground">
                    Total Pembayaran
                  </span>
                  <span className="font-bold text-primary-default text-lg">
                    Rp {Number(total_amount).toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mt-6">
                  <Button
                    variant="outline"
                    color="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Ganti Metode Pembayaran
                  </Button>
                  <Button
                    variant="solid"
                    color="primary"
                    size="sm"
                    className="w-full"
                    onClick={() => router.push("/infopayment?status=success")}
                  >
                    Bayar Sekarang
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-6">
                Tata Cara Pembayaran
              </h2>
              <div className="space-y-4">
                {currentInstructions.map((instr, index) => (
                  <InstructionAccordion
                    key={index}
                    title={
                      typeof instr.title === "function"
                        ? instr.title(paymentMethod.name)
                        : instr.title
                    }
                  >
                    {typeof instr.content === "function"
                      ? instr.content(paymentMethod.name)
                      : instr.content}
                  </InstructionAccordion>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1 sticky top-28">
            <PurchaseSummaryCard
              title={course.title}
              price={Number(course.price)}
              discountedPrice={subtotal}
              discountPercentage={50}
              includes={courseIncludes}
              language="Bahasa Indonesia"
              imageUrl={course.thumbnail_url}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BayarClientPage;
