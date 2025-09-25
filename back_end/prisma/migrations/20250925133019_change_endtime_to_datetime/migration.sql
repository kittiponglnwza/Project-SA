/*
  Warnings:

  - The `endTime` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `startTime` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Booking" DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3),
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3);
