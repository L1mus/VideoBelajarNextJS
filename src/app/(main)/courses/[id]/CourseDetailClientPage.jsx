"use client";

import React, { useTransition } from "react";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import DetailProdukHero from "@/components/detailproduk/DetailProdukHero";
import TutorCard from "@/components/card/TutorCard";
import KurikulumAccordion from "@/components/detailproduk/KurikulumAccordion";
import ReviewList from "@/components/detailproduk/ReviewList";
import OrderSummaryCard from "@/components/card/OrderSummaryCard";
import Button from "@/components/button/Button";
import ReviewForm from "@/components/form/ReviewForm";
import { useNotificationStore } from "@/store/notificationStore";
import { claimCertificate } from "@/app/actions/certificateActions";
import Image from "next/image";

const CourseActionCard = ({ course, isMobile = false }) => {
    const { showToast } = useNotificationStore();
    const [isPending, startTransition] = useTransition();

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

    if (!course.hasAccess) {
        return (
            <OrderSummaryCard
                variant={isMobile ? "mobile" : "default"}
                title={course.title}
                price={Number(course.price)}
                discountedPrice={Number(course.price) / 2}
                discountPercentage={50}
                includes={courseIncludes}
                checkoutUrl={`/payment/${course.id}`}
            />
        );
    }

    return (
        <div
            className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm flex flex-col gap-6 ${
                isMobile ? "w-full" : "w-full"
            }`}
        >
            <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                    Progress Belajar
                </h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                    <div
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>
                <p className="text-sm text-gray-600 text-right">
                    {course.progress}% Selesai
                </p>
            </div>

            {course.certificate ? (
                <div className="flex flex-col gap-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                        <Image
                            src="/assets/icons/icon-piala.svg"
                            width={24}
                            height={24}
                            alt="Trophy"
                        />
                        <div>
                            <p className="text-sm font-bold text-green-800">Selamat!</p>
                            <p className="text-xs text-green-700">Anda telah lulus.</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        color="primary"
                        size="md"
                        className="w-full"
                    >
                        Lihat Sertifikat
                    </Button>
                </div>
            ) : course.progress >= 100 ? (
                <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-600">
                        Selamat! Anda telah menyelesaikan semua materi.
                    </p>
                    <Button
                        variant="solid"
                        color="primary"
                        size="md"
                        className="w-full"
                        disabled={isPending}
                        onClick={() => {
                            startTransition(async () => {
                                const res = await claimCertificate(course.id);
                                if (res.success) showToast(res.message, "success");
                                else showToast(res.message, "error");
                            });
                        }}
                    >
                        {isPending ? "Memproses..." : "Klaim Sertifikat"}
                    </Button>
                </div>
            ) : (
                <Button variant="solid" color="primary" size="md" className="w-full">
                    Lanjut Belajar
                </Button>
            )}

            <div className="border-t border-gray-100 pt-4">
                <p className="text-sm font-bold mb-3">Materi Kursus:</p>
                <div className="grid grid-cols-2 gap-3">
                    {courseIncludes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-600">
                            <Image src={item.icon} width={16} height={16} alt="" />
                            <span className="text-xs">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const CourseDetailClientPage = ({ initialCourse }) => {
    const course = initialCourse;
    const instructor = course.instructor;
    const curriculumData =
        course.chapters?.map((chapter) => ({
            title: chapter.title,
            lessons: chapter.lessons || [],
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

                {/* Mobile Action Card */}
                <div className="lg:hidden my-8">
                    <CourseActionCard course={course} isMobile={true} />
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
                            <KurikulumAccordion
                                curriculumData={curriculumData}
                                completedLessonIds={course.completedLessonIds}
                            />
                        </div>

                        <div className={cardStyle}>
                            <h5 className="text-2xl font-bold text-foreground mb-6">
                                Rating dan Review
                            </h5>

                            {course.hasAccess && !course.hasReviewed && (
                                <ReviewForm courseId={course.id} />
                            )}

                            {course.hasReviewed && (
                                <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm border border-blue-100 flex items-center gap-2">
                                    <span className="text-xl">✨</span>
                                    Anda sudah memberikan ulasan untuk kursus ini. Terima kasih!
                                </div>
                            )}

                            <div className="mt-6">
                                <ReviewList reviews={course.reviews || []} />
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-28">
                            <CourseActionCard course={course} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CourseDetailClientPage;