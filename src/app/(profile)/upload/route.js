import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { saveFile } from "@/lib/upload";

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return new NextResponse("Tidak ada file yang diunggah.", { status: 400 });
        }

        if (!file.type.startsWith("image/")) {
            return new NextResponse("Format file harus gambar.", { status: 400 });
        }

        const fileUrl = await saveFile(file);

        const userId = parseInt(session.user.id, 10);
        await prisma.user.update({
            where: { id: userId },
            data: { profile_picture_url: fileUrl },
        });

        return NextResponse.json({ message: "Upload berhasil", url: fileUrl });
    } catch (error) {
        console.error("Upload Error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}