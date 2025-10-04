"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCheckoutStore } from "@/store/checkoutStore";
import Button from "@/components/button/Button";
import PurchaseSummaryCard from "@/components/card/PurchaseSummaryCard";
import PaymentAccordion from "@/components/payment/PaymentAccordion";
import { createOrderAndRedirect } from "./actions";

const OrderTotalsCard = ({ subtotal, adminFee, total, courseTitle }) => {
  const { selectedMethodId } = useCheckoutStore();
  const isButtonDisabled = !selectedMethodId;
  const formatCurrency = (value) => `Rp ${value.toLocaleString("id-ID")}`;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col gap-4">
      <h3 className="text-xl font-bold text-foreground">Ringkasan Pesanan</h3>
      <div className="space-y-3 text-gray-600">
        <div className="flex justify-between items-start gap-4">
          <span>Video Learning: {courseTitle}</span>
          <span className="flex-shrink-0 font-medium">
            {formatCurrency(subtotal)}
          </span>
        </div>
        <div className="flex justify-between items-start gap-4">
          <span>Biaya Admin</span>
          <span className="flex-shrink-0 font-medium">
            {formatCurrency(adminFee)}
          </span>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
        <span className="font-bold text-foreground">Total Pembayaran</span>
        <span className="font-bold text-primary-default text-lg">
          {formatCurrency(total)}
        </span>
      </div>
      <Button
        type="submit"
        variant="solid"
        color={isButtonDisabled ? "disabled" : "primary"}
        size="md"
        className="w-full mt-2"
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Pilih Metode Bayar" : "Beli Sekarang"}
      </Button>
    </div>
  );
};

export default function PaymentClientPage({ course: initialCourse }) {
  const {
    paymentMethods,
    selectedMethodId,
    isLoading,
    fetchPaymentMethods,
    setSelectedMethodId,
    setCourse,
  } = useCheckoutStore();

  useEffect(() => {
    setCourse(initialCourse);
    fetchPaymentMethods();
  }, [initialCourse, setCourse, fetchPaymentMethods]);

  const discountedPrice = Number(initialCourse.price) / 2;
  const adminFee = 7000;
  const total = discountedPrice + adminFee;

  const courseIncludes = [
    {
      icon: "/assets/icons/icon-video.svg",
      text: `${initialCourse.chapters.reduce(
        (acc, chapter) => acc + chapter.lessons.length,
        0
      )} Video`,
    },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ];

  return (
    <form action={createOrderAndRedirect}>
      <input type="hidden" name="courseId" value={initialCourse.id} />
      <input type="hidden" name="totalAmount" value={total} />
      <input
        type="hidden"
        name="paymentMethodId"
        value={selectedMethodId || ""}
      />

      <div className="min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col gap-y-8">
              <div className="lg:hidden">
                <PurchaseSummaryCard
                  title={initialCourse.title}
                  price={Number(initialCourse.price)}
                  discountedPrice={discountedPrice}
                  discountPercentage={50}
                  includes={courseIncludes}
                  language="Bahasa Indonesia"
                  imageUrl={initialCourse.thumbnail_url}
                />
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm max-w-[798px]">
                <h2 className="text-xl font-bold text-foreground mb-6">
                  Metode Pembayaran
                </h2>
                {isLoading ? (
                  <p>Memuat metode pembayaran...</p>
                ) : (
                  <div className="space-y-4">
                    <PaymentAccordion
                      title="Transfer Bank"
                      methods={paymentMethods.bankTransfer}
                      selectedMethod={selectedMethodId}
                      onSelectMethod={setSelectedMethodId}
                    />
                    <PaymentAccordion
                      title="E-Wallet"
                      methods={paymentMethods.eWallet}
                      selectedMethod={selectedMethodId}
                      onSelectMethod={setSelectedMethodId}
                    />
                    <PaymentAccordion
                      title="Kartu Kredit/Debit"
                      methods={paymentMethods.creditCard}
                      selectedMethod={selectedMethodId}
                      onSelectMethod={setSelectedMethodId}
                    />
                  </div>
                )}
              </div>
              <div className="md:hidden">
                <OrderTotalsCard
                  subtotal={discountedPrice}
                  adminFee={adminFee}
                  total={total}
                  courseTitle={initialCourse.title}
                />
              </div>
            </div>
            <div className="hidden lg:block lg:col-span-1 sticky top-28">
              <OrderTotalsCard
                subtotal={discountedPrice}
                adminFee={adminFee}
                total={total}
                courseTitle={initialCourse.title}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
