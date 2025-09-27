"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PromotionService = class PromotionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.promotion.create({
            data: {
                name: dto.name,
                description: dto.description ?? "",
                type: dto.type ?? "general",
                discount: dto.discount ?? 0,
                category: dto.category ?? "other",
                items: dto.items ? dto.items : undefined,
                startTime: dto.startTime ?? null,
                endTime: dto.endTime ?? null,
                validDays: dto.validDays ? dto.validDays : undefined,
                isActive: dto.isActive ?? true,
                icon: dto.icon ?? "🎁",
            },
        });
    }
    async findAll() {
        return this.prisma.promotion.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllActive() {
        return this.prisma.promotion.findMany({
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.promotion.findUnique({ where: { id } });
    }
    async update(id, dto) {
        return this.prisma.promotion.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description ?? "",
                type: dto.type ?? "general",
                discount: dto.discount ?? 0,
                category: dto.category ?? "other",
                items: dto.items ? dto.items : undefined,
                startTime: dto.startTime ?? null,
                endTime: dto.endTime ?? null,
                validDays: dto.validDays ? dto.validDays : undefined,
                isActive: dto.isActive ?? true,
                icon: dto.icon ?? "🎁",
            },
        });
    }
    async remove(id) {
        return this.prisma.promotion.delete({ where: { id } });
    }
};
exports.PromotionService = PromotionService;
exports.PromotionService = PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromotionService);
//# sourceMappingURL=promotion.service.js.map