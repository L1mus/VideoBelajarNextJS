import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
        return new NextResponse("Token tidak ditemukan.", { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { verificationToken: token },
        });

        if (!user) {
            return new NextResponse("Invalid Verification Token", { status: 400 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                verificationToken: null,
            },
        });

        return NextResponse.redirect(new URL("/login?verified=true", request.url));

    } catch (error) {
        console.error("VERIFICATION ERROR", error);
        return new NextResponse("Terjadi kesalahan saat verifikasi.", { status: 500 });
    }
}