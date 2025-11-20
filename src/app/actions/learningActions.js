"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLessonCompletion(lessonId, courseId) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }

    const userId = parseInt(session.user.id, 10);

    try {
        const hasAccess = await prisma.order.findFirst({
            where: {
                user_id: userId,
                course_id: parseInt(courseId),
                status: "completed",
            },
        });

        if (!hasAccess) {
            return { success: false, message: "Anda belum membeli kursus ini." };
        }

        const currentProgress = await prisma.userProgress.findUnique({
            where: {
                user_id_lesson_id: {
                    user_id: userId,
                    lesson_id: parseInt(lessonId),
                },
            },
        });

        if (currentProgress) {
            await prisma.userProgress.update({
                where: { id: currentProgress.id },
                data: { is_completed: !currentProgress.is_completed },
            });
        } else {
            await prisma.userProgress.create({
                data: {
                    user_id: userId,
                    lesson_id: parseInt(lessonId),
                    is_completed: true,
                },
            });
        }

        revalidatePath(`/courses/${courseId}`);
        revalidatePath("/kelassaya");

        return { success: true, message: "Progress diperbarui" };
    } catch (error) {
        console.error("Error updating progress:", error);
        return { success: false, message: "Gagal menyimpan progress" };
    }
}