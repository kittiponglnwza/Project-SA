import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  // CREATE
    async create(dto: CreatePromotionDto) {
    return this.prisma.promotion.create({
        data: {
        name: dto.name,
        description: dto.description ?? "",
        type: dto.type ?? "general",        // 🔥 กัน undefined
        discount: dto.discount ?? 0,
        category: dto.category ?? "other",  // 🔥 กัน undefined
        items: dto.items ? (dto.items as Prisma.InputJsonValue) : undefined,
        startTime: dto.startTime ?? null,
        endTime: dto.endTime ?? null,
        validDays: dto.validDays ? (dto.validDays as Prisma.InputJsonValue) : undefined,
        isActive: dto.isActive ?? true,
        icon: dto.icon ?? "🎁",
        },
    });
    }

  // READ ALL
  async findAll() {
    return this.prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ACTIVE
  async findAllActive() {
    return this.prisma.promotion.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // READ ONE
  async findOne(id: number) {
    return this.prisma.promotion.findUnique({ where: { id } });
  }

  // UPDATE
    async update(id: number, dto: UpdatePromotionDto) {
    return this.prisma.promotion.update({
        where: { id },
        data: {
        name: dto.name,
        description: dto.description ?? "",
        type: dto.type ?? "general",        // 🔥 default ถ้าไม่ได้ส่งมา
        discount: dto.discount ?? 0,
        category: dto.category ?? "other",  // 🔥 default ถ้าไม่ได้ส่งมา
        items: dto.items ? (dto.items as Prisma.InputJsonValue) : undefined,
        startTime: dto.startTime ?? null,
        endTime: dto.endTime ?? null,
        validDays: dto.validDays ? (dto.validDays as Prisma.InputJsonValue) : undefined,
        isActive: dto.isActive ?? true,
        icon: dto.icon ?? "🎁",
        },
    });
    }

  // DELETE
  async remove(id: number) {
    return this.prisma.promotion.delete({ where: { id } });
  }
}
