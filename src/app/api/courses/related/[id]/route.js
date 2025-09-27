import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const currentCourseId = parseInt(params.id);

  try {
    const course = await prisma.course.findUnique({
      where: { id: currentCourseId },
      include: { course_categories: true },
    });

    if (!course || course.course_categories.length === 0) {
      return NextResponse.json({ courses: [] });
    }

    const categoryId = course.course_categories[0].category_id;

    const relatedCourses = await prisma.course.findMany({
      where: {
        AND: [
          {
            course_categories: {
              some: {
                category_id: categoryId,
              },
            },
          },
          {
            NOT: {
              id: currentCourseId,
            },
          },
        ],
      },
      take: 3,
      include: {
        instructor: {
          select: {
            name: true,
            profile_picture_url: true,
            instructor_data: {
              select: { title: true, company: true },
            },
          },
        },
        reviews: {
          select: { rating: true },
        },
      },
    });

    // Proses data untuk menyertakan rating rata-rata
    const coursesWithRatings = relatedCourses.map((c) => {
      const totalReviews = c.reviews.length;
      const averageRating =
        totalReviews > 0
          ? c.reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews
          : 0;
      delete c.reviews;
      return { ...c, averageRating, totalReviews };
    });

    return NextResponse.json({ courses: coursesWithRatings });
  } catch (error) {
    console.error("Error fetching related courses:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
