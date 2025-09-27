import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany({
      where: { is_active: true },
      orderBy: { id: "asc" },
    });

    const groupedMethods = {
      bankTransfer: paymentMethods.filter((m) =>
        m.name.toLowerCase().includes("bank")
      ),
      eWallet: paymentMethods.filter((m) =>
        ["dana", "ovo", "link aja", "shopeepay", "paypal"].some((e) =>
          m.name.toLowerCase().includes(e)
        )
      ),
      creditCard: paymentMethods.filter((m) =>
        ["visa", "master card", "jcb", "creditcard"].some((c) =>
          m.name.toLowerCase().replace(/\s+/g, "").includes(c)
        )
      ),
    };

    return NextResponse.json(groupedMethods);
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
