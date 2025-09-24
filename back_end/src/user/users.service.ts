import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // ดึง user ทั้งหมด
  findAll() {
    return this.prisma.user.findMany();
  }

  // ดึง user ตาม id
  // users.service.ts
  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            seat: true,   // ✅ ดึงรายละเอียดที่นั่งมาด้วย
          },
        },
        // 👉 ถ้ามี orders ค่อย include: { orders: true }
      },
    });
  }



  // อัปเดต user
  update(id: number, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // ลบ user
  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
