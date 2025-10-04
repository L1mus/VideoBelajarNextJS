"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useCourseStore } from "@/store/courseStore";
import Hero from "@/components/hero/Hero";
import Newsletter from "@/components/newsletter/Newsletter";
import FilterTabGroup from "@/components/filters/FilterTabGroup";
import CourseCard from "@/components/card/CourseCard";
import CourseCardSkeleton from "@/components/card/CourseCardSkeleton";
import Pagination from "@/components/pagination/Pagination";

export default function HomePage() {
  const {
    categories,
    isLoading,
    error,
    activeTab,
    currentPage,
    fetchData,
    setActiveTab,
    setCurrentPage,
    getFilteredCourses,
    getCurrentPageCourses,
    setSelectedCourse,
  } = useCourseStore();

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredCourses = getFilteredCourses();
  const currentCourses = getCurrentPageCourses();

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <Hero />
      <section className="py-16">
        <div className="flex flex-col items-start text-left mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Koleksi Video Pembelajaran Unggulan
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>
        <div className="relative mb-8">
          <FilterTabGroup
            tabs={categories}
            defaultTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>
        {error && (
          <p className="text-center text-error-default">Error: {error}</p>
        )}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
            {Array.from({ length: 9 }).map((_, index) => (
              <CourseCardSkeleton
                key={index}
                variant={isMobile ? "mobile" : "default"}
              />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {currentCourses.map((course, index) => (
                <div key={course.id} onClick={() => setSelectedCourse(course)}>
                  <Link href={`/courses/${course.id}`}>
                    <CourseCard
                      isPriority={index === 0}
                      variant={isMobile ? "mobile" : "default"}
                      title={course.title}
                      description={course.description}
                      authorName={course.instructor.name}
                      authorImage={
                        course.instructor.profile_picture_url ||
                        "/assets/images/avatar.jpg"
                      }
                      authorRole={
                        course.instructor.instructor_data?.title || "Instructor"
                      }
                      authorCompany={
                        course.instructor.instructor_data?.company || ""
                      }
                      rating={4.5}
                      reviewCount={86}
                      price={Number(course.price)}
                      imageUrl={course.thumbnail_url}
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-12 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredCourses.length}
                itemsPerPage={useCourseStore.getState().itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </section>
      <Newsletter />
    </div>
  );
}
