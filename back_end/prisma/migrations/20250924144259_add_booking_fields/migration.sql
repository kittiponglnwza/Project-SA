-- AlterTable
ALTER TABLE "public"."Booking" ADD COLUMN     "endTime" TEXT,
ADD COLUMN     "paymentMethod" TEXT DEFAULT 'cash',
ADD COLUMN     "startTime" TEXT,
ALTER COLUMN "status" SET DEFAULT 'active';
