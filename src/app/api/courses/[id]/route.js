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
                duration: true, // Sertakan durasi
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
          // Ubah bagian ini
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

    // Menghitung rata-rata rating dari data review yang sudah di-fetch
    const totalReviews = course.reviews.length;
    const averageRating =
      totalReviews > 0
        ? course.reviews.reduce((acc, review) => acc + review.rating, 0) /
          totalReviews
        : 0;

    // Simpan review yang sudah diproses
    const reviewsWithUserDetails = course.reviews;
    // Hapus data review mentah dari objek course utama
    delete course.reviews;

    // Kirim kembali course, review yang sudah diproses, dan data agregat
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
