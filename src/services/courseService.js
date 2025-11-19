import prisma from "@/lib/prisma";

export async function getCourses(filters = {}) {
    const { category, search, sort, limit = 9, page = 1 } = filters;

    const take = parseInt(String(limit), 10) || 9;
    const currentPage = parseInt(String(page), 10) || 1;
    const skip = (currentPage - 1) * take;

    const whereClause = {
        is_published: true,
        AND: [],
    };

    if (category && category !== "Semua Kelas") {
        whereClause.AND.push({
            course_categories: {
                some: { category: { name: category } },
            },
        });
    }

    if (search) {
        whereClause.AND.push({
            title: { contains: search, mode: "insensitive" },
        });
    }

    let orderBy = { created_at: "desc" };
    if (sort === "price_asc") orderBy = { price: "asc" };
    else if (sort === "price_desc") orderBy = { price: "desc" };

    try {
        const courses = await prisma.course.findMany({
            where: whereClause,
            take: take,
            skip: skip,
            include: {
                instructor: {
                    select: {
                        name: true,
                        profile_picture_url: true,
                        instructor_data: { select: { title: true, company: true } },
                    },
                },
                reviews: { select: { rating: true } },
                course_categories: {
                    include: { category: { select: { name: true } } },
                },
            },
            orderBy: orderBy,
        });

        const total = await prisma.course.count({ where: whereClause });
        const processedCourses = Array.isArray(courses)
            ? courses
                .map((course) => {
                    if (!course.instructor) return null;

                    const reviews = course.reviews || [];
                    const totalReviews = reviews.length;
                    const totalRating =
                        totalReviews > 0
                            ? reviews.reduce((acc, review) => acc + (review.rating || 0), 0)
                            : 0;

                    const averageRating =
                        totalReviews > 0 ? totalRating / totalReviews : 0;

                    const { reviews: _, ...rest } = course;

                    return {
                        ...rest,
                        averageRating,
                        totalReviews,
                    };
                })
                .filter(Boolean)
            : [];

        return {
            data: processedCourses,
            total,
            totalPages: Math.ceil(total / take),
        };
    } catch (error) {
        console.error("Get Courses Error:", error);
        return { data: [], total: 0, totalPages: 0 };
    }
}

export async function getCourseById(id, userId = null) {
    const courseId = parseInt(String(id), 10);
    if (isNaN(courseId)) return null;

    const currentUserId = userId ? parseInt(String(userId), 10) : null;

    try {
        const queryOptions = {
            where: { id: courseId },
            include: {
                instructor: {
                    select: {
                        name: true,
                        profile_picture_url: true,
                        instructor_data: {
                            select: { title: true, company: true, bio: true },
                        },
                    },
                },
                chapters: {
                    orderBy: { order_number: "asc" },
                    include: {
                        lessons: {
                            orderBy: { order_number: "asc" },
                            select: {
                                id: true,
                                title: true,
                                video_url: true,
                                duration: true,
                                ...(currentUserId && {
                                    user_progress: {
                                        where: { user_id: currentUserId },
                                        select: { is_completed: true },
                                    },
                                }),
                            },
                        },
                    },
                },
                course_categories: {
                    include: { category: { select: { name: true } } },
                },
                reviews: {
                    include: {
                        user: { select: { name: true, profile_picture_url: true } },
                    },
                },
            },
        };

        const course = await prisma.course.findUnique(queryOptions);

        if (!course) return null;

        let userAccess = false;
        let certificate = null;
        let hasReviewed = false;

        if (currentUserId) {
            const order = await prisma.order.findFirst({
                where: {
                    user_id: currentUserId,
                    course_id: courseId,
                    status: "completed",
                },
            });
            userAccess = !!order;

            if (userAccess) {
                certificate = await prisma.certificate.findFirst({
                    where: { user_id: currentUserId, course_id: courseId },
                });

                const review = await prisma.review.findFirst({
                    where: { user_id: currentUserId, course_id: courseId },
                });
                hasReviewed = !!review;
            }
        }

        let totalLessons = 0;
        let completedCount = 0;
        let completedLessonIds = [];

        course.chapters = Array.isArray(course.chapters)
            ? course.chapters.map((chapter) => ({
                ...chapter,
                lessons: Array.isArray(chapter.lessons)
                    ? chapter.lessons.map((lesson) => {
                        const isCompleted =
                            Array.isArray(lesson.user_progress) &&
                            lesson.user_progress.length > 0 &&
                            lesson.user_progress[0].is_completed;

                        if (userAccess) {
                            totalLessons++;
                            if (isCompleted) {
                                completedCount++;
                                completedLessonIds.push(lesson.id);
                            }
                        }

                        const { video_url, user_progress, ...safeLessonData } = lesson;

                        if (userAccess) {
                            return { ...safeLessonData, video_url, isCompleted };
                        } else {
                            return { ...safeLessonData, isCompleted: false };
                        }
                    })
                    : [],
            }))
            : [];

        const progress =
            totalLessons > 0
                ? Math.round((completedCount / totalLessons) * 100)
                : 0;

        const reviews = course.reviews || [];
        const totalReviews = reviews.length;
        const averageRating =
            totalReviews > 0
                ? reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / totalReviews
                : 0;

        return {
            ...course,
            averageRating,
            totalReviews,
            hasAccess: userAccess,
            hasReviewed,
            progress,
            completedLessonIds,
            certificate,
        };
    } catch (error) {
        console.error("Get Course Detail Error:", error);
        return null;
    }
}