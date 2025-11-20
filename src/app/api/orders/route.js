import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { createOrder } from "@/services/orderService";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { courseId, totalAmount, paymentMethodId } = body;
    const userId = parseInt(session.user.id);

    const newOrder = await createOrder({
      userId,
      courseId,
      totalAmount,
      paymentMethodId,
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("ORDER_CREATION_ERROR", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
