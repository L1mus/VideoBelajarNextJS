"use client";

import React, { useEffect } from "react";
import { useCourseStore } from "@/store/courseStore";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DetailProdukHero from "@/components/detailproduk/DetailProdukHero";
import TutorCard from "@/components/card/TutorCard";
import KurikulumAccordion from "@/components/detailproduk/KurikulumAccordion";
import OrderSummaryCard from "@/components/card/OrderSummaryCard";
import ReviewList from "@/components/detailproduk/ReviewList";
import CourseDetailSkeleton from "@/components/skeletons/CourseDetailSkeleton";

const CourseDetailClientPage = ({ courseId }) => {
  const { selectedCourse, fetchCourseById, isLoadingDetails, error } =
    useCourseStore();

  useEffect(() => {
    if (!selectedCourse || selectedCourse.id !== parseInt(courseId)) {
      fetchCourseById(courseId);
    }
  }, [courseId, selectedCourse, fetchCourseById]);

  if (
    (!selectedCourse || selectedCourse.id !== parseInt(courseId)) &&
    isLoadingDetails
  ) {
    return <CourseDetailSkeleton />;
  }

  const course = selectedCourse;

  if (error) {
    return <p className="text-center py-20 text-red-500">Error: {error}</p>;
  }

  if (!course) {
    return <CourseDetailSkeleton />;
  }

  const instructor = course.instructor;
  const courseIncludes = [
    { icon: "/assets/icons/icon-file-check.svg", text: "Ujian Akhir" },
    {
      icon: "/assets/icons/icon-video.svg",
      text: `${
        course.chapters?.reduce(
          (acc, chapter) => acc + (chapter.lessons?.length || 0),
          0
        ) || 0
      } Video`,
    },
    { icon: "/assets/icons/icon-book.svg", text: "7 Dokumen" },
    { icon: "/assets/icons/icon-file-certificate.svg", text: "Sertifikat" },
    { icon: "/assets/icons/icon-file-edit.svg", text: "Pretest" },
  ];
  const curriculumData =
    course.chapters?.map((chapter) => ({
      title: chapter.title,
      lessons:
        chapter.lessons?.map((lesson) => ({
          title: lesson.title,
          duration: `${lesson.duration || 0} Menit`,
        })) || [],
    })) || [];
  const breadcrumb = [
    { name: "Beranda", href: "/" },
    {
      name: course.course_categories?.[0]?.category.name || "Kategori",
      href: "#",
    },
    { name: course.title, href: "#" },
  ];

  const cardStyle = "p-8 bg-white border border-gray-200 rounded-xl shadow-sm";

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <Breadcrumb items={breadcrumb} />
        </div>

        <DetailProdukHero
          title={course.title}
          subtitle={course.description}
          rating={course.averageRating?.toFixed(1) || "0.0"}
          reviewCount={course.totalReviews || 0}
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
            checkoutUrl={`/payment/${courseId}`}
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 lg:gap-x-4 py-8 lg:py-12">
          <div className="lg:col-span-2 flex flex-col gap-y-8">
            <div className={cardStyle}>
              <h5 className="text-2xl font-bold text-foreground">Deskripsi</h5>
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
                <ReviewList reviews={course.reviews || []} />
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
                checkoutUrl={`/payment/${courseId}`}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailClientPage;
