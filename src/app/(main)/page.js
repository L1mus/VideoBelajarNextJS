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
        courses,
        categories,
        isLoading,
        error,
        activeTab,
        currentPage,
        totalItems,
        fetchData,
        setActiveTab,
        setCurrentPage,
        setSelectedCourse,
        itemsPerPage,
    } = useCourseStore();

    const isMobile = useMediaQuery("(max-width: 768px)");

    useEffect(() => {
        fetchData();
    }, []);

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
                        {Array.from({ length: 6 }).map((_, index) => (
                            <CourseCardSkeleton
                                key={index}
                                variant={isMobile ? "mobile" : "default"}
                            />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                            {courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <div key={course.id} onClick={() => setSelectedCourse(course)} className="w-full">
                                        <Link href={`/courses/${course.id}`}>
                                            <CourseCard
                                                isPriority={index === 0}
                                                variant={isMobile ? "mobile" : "default"}
                                                title={course.title}
                                                description={course.description}
                                                authorName={course.instructor?.name || "Instruktur"}
                                                authorImage={
                                                    course.instructor?.profile_picture_url ||
                                                    "/assets/images/avatar.jpg"
                                                }
                                                authorRole={
                                                    course.instructor?.instructor_data?.title || "Instructor"
                                                }
                                                authorCompany={
                                                    course.instructor?.instructor_data?.company || ""
                                                }
                                                rating={course.averageRating ? course.averageRating.toFixed(1) : "0.0"}
                                                reviewCount={course.totalReviews || 0}
                                                price={Number(course.price)}
                                                imageUrl={course.thumbnail_url}
                                            />
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-10 text-gray-500">
                                    Tidak ada kelas ditemukan untuk kategori ini.
                                </div>
                            )}
                        </div>

                        <div className="mt-12 flex justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
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