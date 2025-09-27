import React from "react";

const SkeletonCard = ({ variant = "default" }) => {
  const SkeletonBar = ({ className }) => (
    <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
  );

  if (variant === "mobile") {
    return (
      <div className="flex w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex">
          <div className="relative h-20 w-20 flex-shrink-0">
            <SkeletonBar className="w-full h-full rounded-lg" />
          </div>
          <div className="flex flex-1 flex-col justify-center pl-4 gap-2">
            <SkeletonBar className="h-4 w-3/4" />
            <div className="flex items-center mt-1">
              <SkeletonBar className="h-6 w-6 rounded-xl" />
              <div className="ml-2 w-full flex flex-col gap-1">
                <SkeletonBar className="h-3 w-1/2" />
                <SkeletonBar className="h-2 w-1/3" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 mt-2">
          <SkeletonBar className="h-4 w-24" />
          <SkeletonBar className="h-6 w-16" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-106.5 w-96 flex-col rounded-xl border border-gray-200 bg-white p-5">
      <SkeletonBar className="relative h-48 w-full rounded-lg" />
      <div className="flex flex-grow flex-col gap-3 pt-4">
        <SkeletonBar className="h-5 w-3/4" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-5/6" />
        <div className="flex items-center gap-3 pt-2">
          <SkeletonBar className="relative h-10 w-10 rounded-xl" />
          <div className="w-full flex flex-col gap-2">
            <SkeletonBar className="h-4 w-1/3" />
            <SkeletonBar className="h-3 w-1/2" />
          </div>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between pt-4">
        <SkeletonBar className="h-5 w-1/3" />
        <SkeletonBar className="h-8 w-1/4" />
      </div>
    </div>
  );
};

export default SkeletonCard;
