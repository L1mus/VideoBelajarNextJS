import React from "react";
import InfoPaymentClientPage from "./InfoPaymentClientPage";

export default function InfoPaymentPage({ searchParams }) {
  const status = searchParams.status || "pending";

  return <InfoPaymentClientPage status={status} />;
}
