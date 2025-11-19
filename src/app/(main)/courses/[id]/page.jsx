import React from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CourseDetailClientPage from "./CourseDetailClientPage";
import RelatedCoursesList from "@/components/detailproduk/RelatedCoursesList";
import { getCourseById } from "@/services/courseService";

export async function generateMetadata({ params }) {
    const course = await getCourseById(params.id);

    if (!course) {
        return { title: "Kursus Tidak Ditemukan" };
    }

    return {
        title: `${course.title} | VideoBelajar`,
        description: course.description,
        openGraph: {
            images: [course.thumbnail_url || "/assets/images/heroimage.jpg"],
        },
    };
}

async function getRelatedCourses(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/related/${id}`,
        { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.courses || [];
}

export default async function DetailProdukPage({ params }) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id ? parseInt(session.user.id) : null;
    const courseData = await getCourseById(params.id, userId);

    if (!courseData) {
        notFound();
    }

    const relatedCourses = await getRelatedCourses(params.id);

    return (
        <div>
            <CourseDetailClientPage initialCourse={courseData} />
            <section className="py-6">
                <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-start mb-10">
                        <h3 className="text-3xl font-bold text-foreground">
                            Video Pembelajaran Terkait Lainnya
                        </h3>
                        <p className="mt-2 text-lg text-gray-600">
                            Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
                        </p>
                    </div>
                    <RelatedCoursesList courses={relatedCourses} />
                </div>
            </section>
        </div>
    );
}