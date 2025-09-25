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
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateExpiredBookings() {
        const now = new Date();
        const expiredBookings = await this.prisma.booking.findMany({
            where: {
                status: client_1.BookingStatus.ACTIVE,
                endTime: { lt: now },
            },
        });
        for (const booking of expiredBookings) {
            await this.prisma.booking.update({
                where: { id: booking.id },
                data: { status: client_1.BookingStatus.COMPLETED },
            });
        }
        if (expiredBookings.length > 0) {
            console.log(`✅ อัปเดต ${expiredBookings.length} booking เป็น COMPLETED แล้ว`);
        }
    }
    async findAll() {
        await this.updateExpiredBookings();
        return this.prisma.booking.findMany({
            include: { user: true, seat: true },
            orderBy: { date: 'desc' },
        });
    }
    async findByUser(userId) {
        await this.updateExpiredBookings();
        return this.prisma.booking.findMany({
            where: { userId },
            include: { seat: true },
            orderBy: { date: 'desc' },
        });
    }
    async create(data) {
        const existing = await this.prisma.booking.findFirst({
            where: { seatId: data.seatId, status: client_1.BookingStatus.ACTIVE },
        });
        if (existing) {
            throw new Error('โต๊ะนี้ถูกจองแล้ว กรุณาเลือกโต๊ะอื่น');
        }
        let startTime = data.startTime ? new Date(data.startTime) : undefined;
        let endTime = data.endTime ? new Date(data.endTime) : undefined;
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
                status: client_1.BookingStatus.ACTIVE,
                startTime,
                endTime,
                paymentMethod: data.paymentMethod ?? 'cash',
            },
            include: { seat: true },
        });
    }
    async updateStatus(id, status) {
        return this.prisma.booking.update({
            where: { id },
            data: { status },
        });
    }
};
exports.BookingsService = BookingsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BookingsService.prototype, "updateExpiredBookings", null);
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map