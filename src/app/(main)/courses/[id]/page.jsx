import React from "react";
import { notFound } from "next/navigation";

import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DetailProdukHero from "@/components/detailproduk/DetailProdukHero";
import TutorCard from "@/components/card/TutorCard";
import KurikulumAccordion from "@/components/detailproduk/KurikulumAccordion";
import OrderSummaryCard from "@/components/card/OrderSummaryCard";
import RelatedCoursesList from "@/components/detailproduk/RelatedCoursesList";
import ReviewList from "@/components/detailproduk/ReviewList";

async function getCourseData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    return null;
  }
  return res.json();
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
  const [course, relatedCourses] = await Promise.all([
    getCourseData(params.id),
    getRelatedCourses(params.id),
  ]);

  if (!course) {
    notFound();
  }

  const instructor = course.instructor;

  const courseIncludes = [
    { icon: "/assets/icons/icon-file-check.svg", text: "Ujian Akhir" },
    {
      icon: "/assets/icons/icon-video.svg",
      text: `${course.chapters.reduce(
        (acc, chapter) => acc + chapter.lessons.length,
        0
      )} Video`,
    },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ];

  const curriculumData = course.chapters.map((chapter) => ({
    title: chapter.title,
    lessons: chapter.lessons.map((lesson) => ({
      title: lesson.title,
      duration: `${lesson.duration || 0} Menit`,
    })),
  }));

  const breadcrumb = [
    { name: "Beranda", href: "/" },
    {
      name: course.course_categories[0]?.category.name || "Kategori",
      href: "#",
    },
    { name: course.title, href: "#" },
  ];

  const cardStyle = "p-8 bg-white border border-gray-200 rounded-xl shadow-sm";

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <Breadcrumb items={breadcrumb} />
        </div>

        <DetailProdukHero
          title={course.title}
          subtitle={course.description}
          rating={course.averageRating.toFixed(1)}
          reviewCount={course.totalReviews}
          imageUrl={course.thumbnail_url || "/assets/images/heroimage.jpg"}
        />

        <div className="lg:hidden my-8">
          <OrderSummaryCard
            variant="mobile"
            title={course.title}
            price={Number(course.price)}
            discountedPrice={Number(course.price) / 2}
            discountPercentage={50}
            specialOfferText="Penawaran spesial tersisa 2 hari lagi!"
            includes={courseIncludes}
            language="Bahasa Indonesia"
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 lg:gap-x-4 py-8 lg:py-12">
          <div className="lg:col-span-2 flex flex-col gap-y-8">
            <div className={cardStyle}>
              <h5 className=" text-foreground">Deskripsi</h5>
              <p className="text-base text-gray-600 leading-relaxed mt-4">
                {course.description}
              </p>
            </div>
            {instructor && (
              <div className={cardStyle}>
                <h5 className="text-2xl font-bold text-foreground mb-6">
                  Belajar bersama Tutor Profesional
                </h5>
                <TutorCard
                  name={instructor.name}
                  title={instructor.instructor_data?.title || "Instruktur"}
                  company={instructor.instructor_data?.company || "Perusahaan"}
                  bio={instructor.instructor_data?.bio}
                  avatarUrl={
                    instructor.profile_picture_url ||
                    "/assets/images/avatar.jpg"
                  }
                />
              </div>
            )}
            <div className={cardStyle}>
              <h5 className="text-2xl font-bold text-foreground mb-4">
                Kamu akan Mempelajari
              </h5>
              <KurikulumAccordion curriculumData={curriculumData} />
            </div>

            <div className={cardStyle}>
              <h5 className="text-2xl font-bold text-foreground">
                Rating dan Review
              </h5>
              <div className="mt-6">
                <ReviewList reviews={course.reviews} />
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <OrderSummaryCard
                title={course.title}
                price={Number(course.price)}
                discountedPrice={Number(course.price) / 2}
                discountPercentage={50}
                specialOfferText="Penawaran spesial tersisa 2 hari lagi!"
                includes={courseIncludes}
                language="Bahasa Indonesia"
                checkoutUrl={`/payment/${params.id}`}
              />
            </div>
          </div>
        </section>
      </div>

      <section className=" py-6">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-start mb-10">
            <h3 className="text-3xl">Video Pembelajaran Terkait Lainnya</h3>
            <p className="mt-2 text-lg">
              Ekspansi Pengetahuan Anda dengan Rekomendasi Spesial Kami!
            </p>
          </div>
          <RelatedCoursesList courses={relatedCourses} />
        </div>
      </section>
    </div>
  );
}
