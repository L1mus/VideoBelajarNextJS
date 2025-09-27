"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

const PaymentNavbar = () => {
  const pathname = usePathname();
  let currentStep = 0;

  if (pathname.includes("/infopayment")) {
    currentStep = 2;
  } else if (pathname.includes("/bayar")) {
    currentStep = 1;
  } else if (pathname.includes("/payment")) {
    currentStep = 0;
  }

  return <Navbar navType="payment" currentStep={currentStep} />;
};

export default PaymentNavbar;
