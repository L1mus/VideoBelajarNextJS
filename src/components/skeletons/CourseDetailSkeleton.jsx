import React from "react";

const SkeletonBar = ({ className }) => (
  <div className={`bg-gray-200 rounded animate-pulse ${className}`} />
);

const CourseDetailSkeleton = () => {
  const cardStyle = "p-8 bg-white border border-gray-200 rounded-xl shadow-sm";

  return (
    <div>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <SkeletonBar className="h-5 w-1/3" />
        </div>

        <div className="relative w-full h-auto md:h-96 bg-gray-200 rounded-2xl overflow-hidden flex items-center animate-pulse">
          <div className="relative z-10 p-8 md:p-12 max-w-3xl">
            <SkeletonBar className="h-12 w-3/4 mb-4" />
            <SkeletonBar className="h-10 w-1/2" />
            <SkeletonBar className="h-6 w-1/3 mt-6" />
            <SkeletonBar className="h-5 w-1/4 mt-2" />
          </div>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 lg:gap-x-4 py-8 lg:py-12">
          <div className="lg:col-span-2 flex flex-col gap-y-8">
            <div className={cardStyle}>
              <SkeletonBar className="h-8 w-1/4 mb-6" />
              <div className="space-y-3">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
              </div>
            </div>

            <div className={cardStyle}>
              <SkeletonBar className="h-8 w-1/2 mb-6" />
              <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                <SkeletonBar className="h-16 w-16 rounded-xl flex-shrink-0" />
                <div className="flex-grow space-y-3">
                  <SkeletonBar className="h-5 w-1/3" />
                  <SkeletonBar className="h-4 w-1/2" />
                  <SkeletonBar className="h-4 w-full mt-4" />
                  <SkeletonBar className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            <div className={cardStyle}>
              <SkeletonBar className="h-8 w-1/3 mb-6" />
              <div className="space-y-4">
                <SkeletonBar className="h-12 w-full" />
                <SkeletonBar className="h-12 w-full" />
                <SkeletonBar className="h-12 w-full" />
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <div className={`${cardStyle} flex flex-col gap-6`}>
                <div className="space-y-4">
                  <SkeletonBar className="h-8 w-3/4" />
                  <div className="flex justify-between items-center">
                    <SkeletonBar className="h-7 w-24" />
                    <SkeletonBar className="h-7 w-20" />
                  </div>
                  <SkeletonBar className="h-4 w-full" />
                </div>
                <SkeletonBar className="h-12 w-full rounded-xl" />
                <div className="space-y-3">
                  <SkeletonBar className="h-5 w-1/2 mb-4" />
                  <SkeletonBar className="h-5 w-full" />
                  <SkeletonBar className="h-5 w-full" />
                </div>
                <div className="space-y-3">
                  <SkeletonBar className="h-5 w-1/3 mb-4" />
                  <SkeletonBar className="h-5 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseDetailSkeleton;
