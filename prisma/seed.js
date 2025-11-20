const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const cat1 = await prisma.category.upsert({
    where: { name: "Digital & Teknologi" },
    update: {},
    create: { name: "Digital & Teknologi" },
  });
  const cat2 = await prisma.category.upsert({
    where: { name: "Pengembangan Diri" },
    update: {},
    create: { name: "Pengembangan Diri" },
  });

  const hashedPassword = await bcrypt.hash("password123", 10);
  const instructor = await prisma.user.upsert({
    where: { email: "instructor@example.com" },
    update: {},
    create: {
      name: "Budi Instruktur",
      email: "instructor@example.com",
      password_hash: hashedPassword,
      role: "instructor",
      instructor_data: {
        create: {
          title: "Software Engineer",
          company: "Tech Corp",
          bio: "Berpengalaman lebih dari 5 tahun di bidang teknologi.",
        },
      },
    },
  });

  await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: "Dasar-Dasar Pemrograman Web",
      description: "Pelajari fondasi pengembangan web dari awal hingga mahir.",
      price: 250000,
      level: "beginner",
      instructor_id: instructor.id,
      thumbnail_url: "/assets/images/cover1.jpg",
      course_categories: {
        create: {
          category_id: cat1.id,
        },
      },
    },
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
