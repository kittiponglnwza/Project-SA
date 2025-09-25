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
exports.SeatsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let SeatsService = class SeatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.seat.findMany();
    }
    findOne(id) {
        return this.prisma.seat.findUnique({ where: { id } });
    }
    create(data) {
        return this.prisma.seat.create({ data });
    }
    update(id, data) {
        return this.prisma.seat.update({ where: { id }, data });
    }
    remove(id) {
        return this.prisma.seat.delete({ where: { id } });
    }
    async updateStatus(id, status) {
        const validStatuses = [
            client_1.SeatStatus.AVAILABLE,
            client_1.SeatStatus.UNAVAILABLE,
            client_1.SeatStatus.MAINTENANCE,
        ];
        if (!validStatuses.includes(status)) {
            throw new Error(`Invalid status: ${status}`);
        }
        if (status === client_1.SeatStatus.AVAILABLE) {
            await this.prisma.booking.updateMany({
                where: { seatId: id, status: client_1.BookingStatus.ACTIVE },
                data: { status: client_1.BookingStatus.CANCELLED },
            });
        }
        return this.prisma.seat.update({
            where: { id },
            data: { status },
        });
    }
};
exports.SeatsService = SeatsService;
exports.SeatsService = SeatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeatsService);
//# sourceMappingURL=seats.service.js.map