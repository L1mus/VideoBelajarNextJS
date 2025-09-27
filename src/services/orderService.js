import prisma from "@/lib/prisma";
export async function createOrder(orderData) {
  const { userId, courseId, totalAmount, paymentMethodId } = orderData;

  if (!userId || !courseId || !totalAmount || !paymentMethodId) {
    throw new Error("Data yang dibutuhkan tidak lengkap.");
  }

  return await prisma.order.create({
    data: {
      user_id: userId,
      course_id: courseId,
      status: "pending",
      total_amount: totalAmount,
      invoice: {
        create: {
          invoice_number: `INV-${Date.now()}-${userId}`,
          payment_method_id: paymentMethodId,
          amount: totalAmount,
        },
      },
    },
    include: {
      invoice: true,
    },
  });
}
