import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import BayarClientPage from "./BayarClientPage";

async function getOrderData(courseId) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        course_id: parseInt(courseId),
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        course: {
          include: {
            chapters: {
              include: {
                lessons: true,
              },
            },
          },
        },
        invoice: {
          include: {
            payment_method: true,
          },
        },
      },
    });

    if (!order) {
      console.log(`Order for course ID ${courseId} not found.`);
      return null;
    }

    return order;
  } catch (error) {
    console.error("Failed to get order data:", error);
    return null;
  }
}

export default async function BayarPage({ params }) {
  const order = await getOrderData(params.id);

  if (!order) {
    notFound();
  }

  return <BayarClientPage orderData={order} />;
}
