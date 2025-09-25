/*
  Warnings:

  - You are about to drop the column `condition` on the `Seat` table. All the data in the column will be lost.
  - The `status` column on the `Seat` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "public"."SeatStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "public"."Seat" DROP COLUMN "condition",
DROP COLUMN "status",
ADD COLUMN     "status" "public"."SeatStatus" NOT NULL DEFAULT 'AVAILABLE';
