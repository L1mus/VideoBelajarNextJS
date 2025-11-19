import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi."),
    email: z.string().email("Format email tidak valid."),
    phone: z.string().min(10, "Nomor telepon minimal 10 digit."),
    gender: z.enum(["Laki_laki", "Perempuan"], {
        errorMap: () => ({ message: "Jenis kelamin tidak valid." }),
    }),
    password: z.string().min(8, "Kata sandi minimal harus 8 karakter."),
});

export async function POST(request) {
    try {
        const body = await request.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return new NextResponse(validation.error.errors[0].message, {
                status: 400,
            });
        }

        const { name, email, phone, gender, password } = validation.data;
        const exist = await prisma.user.findUnique({
            where: { email },
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
        console.error("REGISTRATION ERROR", error);
        return new NextResponse("Terjadi kesalahan internal.", { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}