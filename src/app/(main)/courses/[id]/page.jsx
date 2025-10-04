import React from "react";
import CourseDetailClientPage from "./CourseDetailClientPage";
import RelatedCoursesList from "@/components/detailproduk/RelatedCoursesList";

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
  const courseId = params.id;

  const relatedCourses = await getRelatedCourses(courseId);

  return (
    <div>
      <CourseDetailClientPage courseId={courseId} />

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
