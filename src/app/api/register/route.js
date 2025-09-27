import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // 1. Validasi input dasar
    if (!name || !email || !password) {
      return new NextResponse("Nama, email, dan kata sandi harus diisi.", {
        status: 400,
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse("Format email tidak valid.", { status: 400 });
    }

    if (password.length < 8) {
      return new NextResponse("Kata sandi minimal harus 8 karakter.", {
        status: 400,
      });
    }

    const exist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (exist) {
      return new NextResponse("Email sudah terdaftar.", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        role: "student",
      },
    });

    const { password_hash, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.log("REGISTRATION ERROR", error);
    return new NextResponse("Terjadi kesalahan internal.", { status: 500 });
  }
}
