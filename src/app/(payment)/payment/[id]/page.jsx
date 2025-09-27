import React from "react";
import { notFound } from "next/navigation";
import PaymentClientPage from "./PaymentClientPage";

async function getCourseData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function MetodePembayaranPage({ params }) {
  const course = await getCourseData(params.id);

  if (!course) {
    notFound();
  }

  return <PaymentClientPage course={course} />;
}
