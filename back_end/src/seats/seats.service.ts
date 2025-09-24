import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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

  async updateStatus(id: number, status: string) {
    return this.prisma.seat.update({
        where: { id },
        data: { status },
    });
  }
}
