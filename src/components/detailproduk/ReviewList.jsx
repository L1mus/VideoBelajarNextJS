"use client";

import React from "react";
import ReviewCard from "@/components/card/ReviewCard";
import { useDragToScroll } from "@/hooks/useDragToScroll";

const ReviewList = ({ reviews }) => {
  const scrollRef = useDragToScroll();

  const validReviews = Array.isArray(reviews)
    ? reviews.filter((review) => review && review.user)
    : [];

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto gap-6 pb-4 cursor-pointer select-none"
    >
      {validReviews.length > 0 ? (
        validReviews.map((review) => (
          <ReviewCard
            key={review.id}
            name={review.user.name}
            avatarUrl={
              review.user.profile_picture_url || "/assets/images/avatar.jpg"
            }
            rating={review.rating}
            comment={review.comment}
          />
        ))
      ) : (
        <p className="text-gray-500">Belum ada review untuk kelas ini.</p>
      )}
    </div>
  );
};

export default ReviewList;
