"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function claimCertificate(courseId) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }

    const userId = parseInt(session.user.id, 10);
    const cId = parseInt(courseId, 10);

    try {
        const existingCert = await prisma.certificate.findFirst({
            where: {
                user_id: userId,
                course_id: cId,
            },
        });

        if (existingCert) {
            return { success: true, message: "Sertifikat sudah tersedia.", certificate: existingCert };
        }

        const totalLessons = await prisma.lesson.count({
            where: { chapter: { course_id: cId } },
        });

        const completedLessons = await prisma.userProgress.count({
            where: {
                user_id: userId,
                is_completed: true,
                lesson: { chapter: { course_id: cId } },
            },
        });

        if (completedLessons < totalLessons || totalLessons === 0) {
            return {
                success: false,
                message: `Anda baru menyelesaikan ${completedLessons} dari ${totalLessons} pelajaran.`
            };
        }

        const certificateCode = `CERT-${new Date().getFullYear()}-${cId}-${userId}-${Date.now().toString().slice(-4)}`;

        const newCert = await prisma.certificate.create({
            data: {
                user_id: userId,
                course_id: cId,
                certificate_code: certificateCode,
            },
        });

        revalidatePath(`/courses/${cId}`);
        revalidatePath("/kelassaya");
        revalidatePath("/profilesaya");

        return { success: true, message: "Sertifikat berhasil diterbitkan!", certificate: newCert };

    } catch (error) {
        console.error("Certificate Claim Error:", error);
        return { success: false, message: "Gagal memproses sertifikat." };
    }
}