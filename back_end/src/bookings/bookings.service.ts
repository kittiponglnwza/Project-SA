import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.booking.findMany({
      include: { user: true, seat: true },
      orderBy: { date: 'desc' }
    });
  }

  async findByUser(userId: number) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { seat: true },
      orderBy: { date: 'desc' }
    });
  }

  async create(data: {
    userId: number;
    seatId: number;
    duration: number;
    price: number;
    startTime?: string;
    endTime?: string;
    paymentMethod?: string;
  }) {
    // ✅ กันจองซ้ำ
    const existing = await this.prisma.booking.findFirst({
      where: { seatId: data.seatId, status: 'active' },
    });

    if (existing) {
      throw new Error('โต๊ะนี้ถูกจองแล้ว กรุณาเลือกโต๊ะอื่น');
    }

    return this.prisma.booking.create({
      data: {
        ...data,
        status: 'active',
      },
      include: { seat: true },
    });
  }

  async updateStatus(id: number, status: string) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }
}
