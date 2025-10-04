import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        instructor: {
          select: {
            name: true,
            profile_picture_url: true,
            instructor_data: {
              select: {
                title: true,
                company: true,
                bio: true,
              },
            },
          },
        },
        chapters: {
          orderBy: {
            order_number: "asc",
          },
          include: {
            lessons: {
              orderBy: {
                order_number: "asc",
              },
              select: {
                title: true,
                video_url: true,
                duration: true,
              },
            },
          },
        },
        course_categories: {
          include: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                profile_picture_url: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Course not found", { status: 404 });
    }

    const totalReviews = course.reviews.length;
    const averageRating =
      totalReviews > 0
        ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
          totalReviews
        : 0;

    const reviewsWithUserDetails = course.reviews;
    delete course.reviews;

    return NextResponse.json({
      ...course,
      reviews: reviewsWithUserDetails,
      averageRating,
      totalReviews,
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
