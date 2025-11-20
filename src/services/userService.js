import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function updateUserProfile(userId, data) {
    const { password, ...profileData } = data;
    const updatePayload = { ...profileData };

    if (password && password.trim() !== "") {
        if (password.length < 8) {
            throw new Error("Kata sandi minimal harus 8 karakter.");
        }
        updatePayload.password_hash = await bcrypt.hash(password, 10);
    }

    try {
        return await prisma.user.update({
            where: { id: userId },
            data: updatePayload,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                profile_picture_url: true,
            },
        });
    } catch (error) {
        console.error("Error updating user profile:", error);
        throw new Error("Gagal memperbarui profil pengguna.");
    }
}

export async function getUserMyCourses(userId) {
    try {
        const orders = await prisma.order.findMany({
            where: {
                user_id: userId,
                status: "completed",
            },
            include: {
                course: {
                    include: {
                        instructor: {
                            select: {
                                name: true,
                                profile_picture_url: true,
                                instructor_data: { select: { title: true, company: true } },
                            },
                        },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });

        return await Promise.all(
            orders.map(async (order) => {
                const course = order.course;

                const totalLessons = await prisma.lesson.count({
                    where: {
                        chapter: { course_id: course.id },
                    },
                });

                const completedLessons = await prisma.userProgress.count({
                    where: {
                        user_id: userId,
                        is_completed: true,
                        lesson: {
                            chapter: { course_id: course.id },
                        },
                    },
                });

                const progress =
                    totalLessons > 0
                        ? Math.round((completedLessons / totalLessons) * 100)
                        : 0;

                return { ...course, progress };
            })
        );
    } catch (error) {
        console.error("Error fetching user courses:", error);
        return [];
    }
}

export async function getUserOrders(userId) {
    try {
        return await prisma.order.findMany({
            where: { user_id: userId },
            include: {
                course: {
                    select: {
                        title: true,
                        thumbnail_url: true,
                        price: true,
                    },
                },
                invoice: {
                    select: {
                        invoice_number: true,
                        payment_method: { select: { name: true, logo_url: true } },
                    },
                },
            },
            orderBy: { created_at: "desc" },
        });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
}