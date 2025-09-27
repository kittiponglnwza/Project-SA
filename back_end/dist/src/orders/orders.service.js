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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
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
                items: { include: { menu: true } },
                user: true,
                seat: true,
            },
            orderBy: { orderDate: "desc" },
        });
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { items: { include: { menu: true } }, user: true, seat: true },
        });
    }
    async findByUser(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: { items: { include: { menu: true } }, seat: true },
            orderBy: { orderDate: 'desc' },
        });
    }
    async update(id, dto) {
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
    async remove(id) {
        return this.prisma.order.delete({ where: { id } });
    }
    async updateStatus(id, status) {
        return this.prisma.order.update({
            where: { id },
            data: { status },
            include: { items: true, user: true },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map