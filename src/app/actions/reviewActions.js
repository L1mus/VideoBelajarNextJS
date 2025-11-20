"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Schema Validasi Review
const reviewSchema = z.object({
    rating: z.coerce.number().min(1).max(5),
    comment: z.string().min(5, "Ulasan minimal 5 karakter").max(500, "Ulasan maksimal 500 karakter"),
    courseId: z.coerce.number(),
});

export async function submitReview(prevState, formData) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return { success: false, message: "Unauthorized" };
    }

    const userId = parseInt(session.user.id, 10);

    const rawData = {
        rating: formData.get("rating"),
        comment: formData.get("comment"),
        courseId: formData.get("courseId"),
    };

    const validation = reviewSchema.safeParse(rawData);
    if (!validation.success) {
        return { success: false, message: validation.error.errors[0].message };
    }

    const { rating, comment, courseId } = validation.data;

    try {
        const hasAccess = await prisma.order.findFirst({
            where: { user_id: userId, course_id: courseId, status: "completed" },
        });

        if (!hasAccess) {
            return { success: false, message: "Anda harus membeli kursus ini untuk memberikan ulasan." };
        }
        const existingReview = await prisma.review.findFirst({
            where: { user_id: userId, course_id: courseId },
        });

        if (existingReview) {
            return { success: false, message: "Anda sudah memberikan ulasan untuk kursus ini." };
        }

        await prisma.review.create({
            data: {
                user_id: userId,
                course_id: courseId,
                rating: rating,
                comment: comment,
            },
        });

        revalidatePath(`/courses/${courseId}`);
        return { success: true, message: "Ulasan berhasil dikirim!" };

    } catch (error) {
        console.error("Submit Review Error:", error);
        return { success: false, message: "Gagal mengirim ulasan." };
    }
}