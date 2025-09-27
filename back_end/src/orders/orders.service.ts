import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOrderDto) {
    return this.prisma.order.create({
        data: {
        orderNumber: `ORD-${Date.now()}`,
        customerName: dto.customerName,
        userId: dto.userId,
        seatId: dto.seatId,
        total: dto.total,
        paymentMethod: dto.paymentMethod,
        notes: dto.notes,
        items: {
            create: dto.items.map((i) => ({
            menuId: i.menuId,
            quantity: i.quantity,
            price: i.price,
            })),
        },
        },
        include: { items: { include: { menu: true } } },
    });
    }


    async findAll() {
    return this.prisma.order.findMany({
        include: {
        items: { include: { menu: true } }, // ดึงเมนูด้วย
        user: true, // ดึงข้อมูลผู้ใช้ (ลูกค้า) ด้วย
        seat: true, // ดึงข้อมูลโต๊ะด้วย
        },
        orderBy: { orderDate: "desc" },
    });
    }
  async findOne(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { items: { include: { menu: true } }, user: true, seat: true },
    });
  }

  async findByUser(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { menu: true } }, seat: true },
      orderBy: { orderDate: 'desc' },
    });
  }

  async update(id: number, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: {
        ...dto,
        items: dto.items
          ? {
              deleteMany: {},
              create: dto.items.map((i) => ({
                menuId: i.menuId,
                quantity: i.quantity,
                price: i.price,
              })),
            }
          : undefined,
      },
      include: { items: true },
    });
  }

  async remove(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }
    async updateStatus(id: number, status: OrderStatus) {
    return this.prisma.order.update({
        where: { id },
        data: { status },
        include: { items: true, user: true }, // ถ้าอยากให้ frontend ได้ข้อมูลครบ
    });
    }
}
