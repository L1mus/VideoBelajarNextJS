export async function getAllCourses() {
  const courses = await prisma.course.findMany({
    where: { is_published: true },
    include: {
      instructor: {
        select: {
          name: true,
          profile_picture_url: true,
          instructor_data: {
            select: {
              title: true,
              company: true,
            },
          },
        },
      },
      course_categories: {
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      },
      reviews: {
        select: {
          rating: true,
        },
      },
    },
  });

  const processedCourses = courses
    .map((course) => {
      if (!course.instructor) {
        return null;
      }

      return course;
    })
    .filter(Boolean);

  return processedCourses;
}
