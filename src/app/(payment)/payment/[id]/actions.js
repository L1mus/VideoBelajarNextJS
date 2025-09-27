"use server";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createOrder } from "@/services/orderService";

export async function createOrderAndRedirect(formData) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/login");
  }

  const courseId = parseInt(formData.get("courseId"), 10);
  const totalAmount = parseFloat(formData.get("totalAmount"));
  const paymentMethodId = parseInt(formData.get("paymentMethodId"), 10);
  const userId = parseInt(session.user.id, 10);

  try {
    await createOrder({ userId, courseId, totalAmount, paymentMethodId });
  } catch (error) {
    console.error("ORDER_CREATION_ERROR", error);
    throw new Error("Terjadi kesalahan internal saat membuat pesanan.");
  }

  redirect(`/bayar/${courseId}`);
}
