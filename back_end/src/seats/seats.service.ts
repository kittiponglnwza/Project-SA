import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SeatStatus, BookingStatus } from '@prisma/client'; // ✅ import enums

@Injectable()
export class SeatsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.seat.findMany();
  }

  findOne(id: number) {
    return this.prisma.seat.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.seat.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.seat.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.seat.delete({ where: { id } });
  }

  async updateStatus(id: number, status: SeatStatus) {
    const validStatuses = [
      SeatStatus.AVAILABLE,
      SeatStatus.UNAVAILABLE,
      SeatStatus.MAINTENANCE,
    ];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}`);
    }

    // ถ้า Admin รีเซ็ตเก้าอี้เป็น AVAILABLE → ยกเลิกการจองเก่า
    if (status === SeatStatus.AVAILABLE) {
      await this.prisma.booking.updateMany({
        where: { seatId: id, status: BookingStatus.ACTIVE },
        data: { status: BookingStatus.CANCELLED },
      });
    }

    return this.prisma.seat.update({
      where: { id },
      data: { status },
    });
  }
}
