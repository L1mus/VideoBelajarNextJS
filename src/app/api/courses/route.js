import { NextResponse } from "next/server";
import { getAllCourses } from "@/services/courseService";

export async function GET(request) {
  try {
    const courses = await getAllCourses();
    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
