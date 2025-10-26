-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('Laki_laki', 'Perempuan');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "gender" "public"."Gender",
ADD COLUMN     "phone" TEXT;
