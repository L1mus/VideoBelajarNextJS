import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Gender } from "@prisma/client";
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, gender, password } = body;

    if (!name || !email || !phone || !gender || !password) {
      return new NextResponse("Semua field wajib diisi.", {
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

    const validGenders = Object.values(Gender);
    if (!validGenders.includes(gender)) {
      return new NextResponse("Nilai jenis kelamin tidak valid.", {
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
        phone,
        gender,
        role: "student",
      },
    });

    const { password_hash, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.log("REGISTRATION ERROR", error);
    if (error.code === "P2022" && error.meta?.target?.includes("gender")) {
      return new NextResponse("Nilai jenis kelamin tidak valid.", {
        status: 400,
      });
    }
    return new NextResponse("Terjadi kesalahan internal.", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
