import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserMyCourses } from "@/services/userService";
import Link from "next/link";
import CourseCard from "@/components/card/CourseCard";

export default async function KelasSayaPage() {
    const session = await getServerSession(authOptions);
    const userId = parseInt(session?.user?.id, 10);

    const myCourses = await getUserMyCourses(userId);

    return (
        <div>
            <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">Kelas Saya</h3>
                <p className="text-sm text-gray-500">
                    Lanjutkan pembelajaran Anda dari terakhir kali.
                </p>
            </div>

            {myCourses.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {myCourses.map((course) => (
                        <Link key={course.id} href={`/courses/${course.id}`}>
                            {/* Kita gunakan CourseCard yang sudah ada */}
                            <CourseCard
                                variant="mobile" // Tampilan list horizontal cocok untuk dashboard
                                title={course.title}
                                description={course.description}
                                authorName={course.instructor?.name}
                                authorImage={course.instructor?.profile_picture_url}
                                authorRole={course.instructor?.instructor_data?.title}
                                imageUrl={course.thumbnail_url}
                                price={0}
                            />
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 border border-dashed border-gray-300 rounded-xl">
                    <p className="text-gray-500 mb-4">Anda belum mengikuti kelas apapun.</p>
                    <Link
                        href="/"
                        className="text-primary-default font-bold hover:underline"
                    >
                        Cari Kelas Sekarang
                    </Link>
                </div>
            )}
        </div>
    );
}