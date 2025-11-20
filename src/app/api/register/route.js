import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request) {
    try {
        const body = await request.json();

        const registerSchema = z.object({
            name: z.string().min(1, "Nama wajib diisi."),
            email: z.string().email("Format email tidak valid."),
            phone: z.string().min(10, "Nomor telepon minimal 10 digit."),
            gender: z.enum(["Laki_laki", "Perempuan"]),
            password: z.string().min(8, "Kata sandi minimal harus 8 karakter."),
        });

        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, email, phone, gender, password } = validation.data;

        const exist = await prisma.user.findUnique({ where: { email } });
        if (exist) {
            return NextResponse.json(
                { message: "Email sudah terdaftar." },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = uuidv4();

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password_hash: hashedPassword,
                phone,
                gender,
                role: "student",
                verificationToken,
                emailVerified: null
            },
        });

        sendVerificationEmail(email, verificationToken).catch(console.error);

        const { password_hash, verificationToken: vt, ...userWithoutPassword } = user;

        return NextResponse.json({
            message: "Registrasi berhasil! Silakan cek email untuk verifikasi.",
            user: userWithoutPassword
        });

    } catch (error) {
        console.error("REGISTRATION ERROR", error);
        return NextResponse.json(
            { message: "Terjadi kesalahan internal." },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}