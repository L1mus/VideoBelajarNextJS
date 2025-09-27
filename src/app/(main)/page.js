"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Hero from "@/components/hero/Hero";
import Newsletter from "@/components/newsletter/Newsletter";
import FilterTabGroup from "@/components/filters/FilterTabGroup";
import CourseCard from "@/components/card/CourseCard";
import CourseCardSkeleton from "@/components/card/CourseCardSkeleton";
import Pagination from "@/components/pagination/Pagination";

export default function HomePage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("Semua Kelas");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          fetch("/api/courses"),
          fetch("/api/categories"),
        ]);
        if (!coursesRes.ok || !categoriesRes.ok)
          throw new Error("Gagal memuat data");

        const coursesData = await coursesRes.json();
        const categoriesData = await categoriesRes.json();

        setCourses(coursesData.courses || []);
        const categoryTabs = [
          "Semua Kelas",
          ...categoriesData.map((cat) => cat.name),
        ];
        setCategories(categoryTabs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCourses =
    activeTab === "Semua Kelas"
      ? courses
      : courses.filter(
          (course) =>
            Array.isArray(course.course_categories) &&
            course.course_categories.some(
              (cc) => cc.category && cc.category.name === activeTab
            )
        );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
            onTabChange={(tab) => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
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
                <Link href={`/courses/${course.id}`} key={course.id}>
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
              ))}
            </div>
            <div className="mt-12 flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredCourses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </section>
      <Newsletter />
    </div>
  );
}
