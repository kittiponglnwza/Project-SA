import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client'; // ✅ ใช้ enum ของ Prisma

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  private async updateExpiredBookings() {
    const now = new Date();

    // 🔹 หา booking ที่ยัง ACTIVE แต่หมดเวลาแล้ว
    const expiredBookings = await this.prisma.booking.findMany({
      where: {
        status: BookingStatus.ACTIVE, // ✅ ใช้ enum
        endTime: { lt: now },
      },
    });

    for (const booking of expiredBookings) {
      await this.prisma.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.COMPLETED }, // ✅ ใช้ enum
      });
    }

    if (expiredBookings.length > 0) {
      console.log(`✅ อัปเดต ${expiredBookings.length} booking เป็น COMPLETED แล้ว`);
    }
  }

  // ✅ ดึง booking ทั้งหมด
  async findAll() {
    await this.updateExpiredBookings(); // อัปเดตสถานะก่อน
    return this.prisma.booking.findMany({
      include: { user: true, seat: true },
      orderBy: { date: 'desc' },
    });
  }

  // ✅ ดึง booking ตาม user
  async findByUser(userId: number) {
    await this.updateExpiredBookings(); // อัปเดตสถานะก่อน
    return this.prisma.booking.findMany({
      where: { userId },
      include: { seat: true },
      orderBy: { date: 'desc' },
    });
  }

  // ✅ สร้าง booking
  async create(data: {
    userId: number;
    seatId: number;
    duration: number;
    price: number;
    startTime?: string;
    endTime?: string;
    paymentMethod?: string;
  }) {
    // กันจองซ้ำ
    const existing = await this.prisma.booking.findFirst({
      where: { seatId: data.seatId, status: BookingStatus.ACTIVE }, // ✅ enum
    });

    if (existing) {
      throw new Error('โต๊ะนี้ถูกจองแล้ว กรุณาเลือกโต๊ะอื่น');
    }

    // 🟢 จัดการเวลา
    let startTime: Date | undefined = data.startTime ? new Date(data.startTime) : undefined;
    let endTime: Date | undefined = data.endTime ? new Date(data.endTime) : undefined;

    if (!endTime && startTime) {
      const end = new Date(startTime);
      end.setHours(end.getHours() + data.duration);
      endTime = end;
    }

    return this.prisma.booking.create({
      data: {
        userId: data.userId,
        seatId: data.seatId,
        duration: data.duration,
        price: data.price,
        status: BookingStatus.ACTIVE, // ✅ default เป็น ACTIVE
        startTime,
        endTime,
        paymentMethod: data.paymentMethod ?? 'cash',
      },
      include: { seat: true },
    });
  }

  // ✅ อัปเดตสถานะ booking (เช่น cancel, complete)
  async updateStatus(id: number, status: BookingStatus) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }
}
