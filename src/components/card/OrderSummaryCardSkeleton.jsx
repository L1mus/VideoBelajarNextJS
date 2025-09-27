import React from "react";

const OrderSummaryCardSkeleton = ({ variant = "default" }) => {
  const isMobile = variant === "mobile";

  const SkeletonBar = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );

  return (
    <div
      className={`flex flex-col bg-white rounded-lg border border-gray-200 p-6 shadow-sm ${
        isMobile ? "w-80 h-[464px] gap-4" : "w-[366px] h-auto gap-6"
      }`}
    >
      {/* --- Top Container Skeleton --- */}
      <div className="flex flex-col gap-4">
        <SkeletonBar className="h-8 w-3/4" />
        <div className="flex items-baseline gap-x-3">
          <SkeletonBar className="h-7 w-24" />
          <SkeletonBar className="h-5 w-20" />
        </div>
        <SkeletonBar className="h-4 w-full" />
      </div>

      {/* --- Button Skeleton --- */}
      <SkeletonBar className="h-12 w-full rounded-xl" />

      {/* --- Middle Container Skeleton --- */}
      <div className="flex flex-col gap-4">
        <SkeletonBar className="h-5 w-1/2" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <SkeletonBar className="h-5 w-full" />
          <SkeletonBar className="h-5 w-full" />
          <SkeletonBar className="h-5 w-full" />
          <SkeletonBar className="h-5 w-full" />
        </div>
      </div>

      {/* --- Bottom Container Skeleton --- */}
      <div className="flex flex-col gap-4">
        <SkeletonBar className="h-5 w-1/3" />
        <SkeletonBar className="h-5 w-2/3" />
      </div>
    </div>
  );
};

export default OrderSummaryCardSkeleton;
