import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateUserProfile } from "@/services/userService";

export async function PATCH(request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const userId = parseInt(session.user.id, 10);

  try {
    const body = await request.json();
    if (!body || typeof body !== "object") {
      return new NextResponse(
        JSON.stringify({ message: "Invalid request body" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const { email, role, confirmPassword, ...updateData } = body;

    const updatedUser = await updateUserProfile(userId, updateData);

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("API Profile Update Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    const statusCode =
      errorMessage === "Kata sandi minimal harus 8 karakter." ? 400 : 500;

    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: statusCode,
      headers: { "Content-Type": "application/json" },
    });
  }
}
