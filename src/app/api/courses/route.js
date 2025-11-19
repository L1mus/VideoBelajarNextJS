import { NextResponse } from "next/server";
import { getCourses } from "@/services/courseService";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const filters = {
            category: searchParams.get("category") || "Semua Kelas",
            page: searchParams.get("page") || 1,
            limit: searchParams.get("limit") || 9,
            search: searchParams.get("search") || "",
            sort: searchParams.get("sort") || "newest",
        };

        const result = await getCourses(filters);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}