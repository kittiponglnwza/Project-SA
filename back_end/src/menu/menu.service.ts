import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@prisma/client';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Menu[]> {
    return this.prisma.menu.findMany();
  }

  async findOne(id: number): Promise<Menu | null> {
    return this.prisma.menu.findUnique({ where: { id } });
  }

  async create(data: {
    name: string;
    price: number;
    category: string;
    description?: string;
    image?: string;
    rating?: number;
    hasPromo?: boolean;
    hasHappyHour?: boolean;
  }): Promise<Menu> {
    return this.prisma.menu.create({ data });
  }

  async update(id: number, data: Partial<Menu>): Promise<Menu> {
    return this.prisma.menu.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<Menu> {
    return this.prisma.menu.delete({ where: { id } });
  }
}
