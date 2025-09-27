"use client";

import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import CourseCard from "@/components/card/CourseCard";

const RelatedCoursesList = ({ courses }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map((relatedCourse, index) => (
        <CourseCard
          key={relatedCourse.id}
          isPriority={index < 3}
          variant={isMobile ? "mobile" : "default"}
          title={relatedCourse.title}
          description={relatedCourse.description}
          authorName={relatedCourse.instructor.name}
          authorImage={
            relatedCourse.instructor.profile_picture_url ||
            "/assets/images/avatar.jpg"
          }
          authorRole={
            relatedCourse.instructor.instructor_data?.title || "Instructor"
          }
          authorCompany={
            relatedCourse.instructor.instructor_data?.company || ""
          }
          rating={
            relatedCourse.averageRating
              ? relatedCourse.averageRating.toFixed(1)
              : "0.0"
          }
          reviewCount={relatedCourse.totalReviews || 0}
          price={Number(relatedCourse.price)}
          imageUrl={relatedCourse.thumbnail_url}
        />
      ))}
    </div>
  );
};

export default RelatedCoursesList;
