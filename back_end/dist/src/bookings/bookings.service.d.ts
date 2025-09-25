import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus } from '@prisma/client';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private updateExpiredBookings;
    findAll(): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
        };
        seat: {
            id: number;
            status: import("@prisma/client").$Enums.SeatStatus;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
    })[]>;
    findByUser(userId: number): Promise<({
        seat: {
            id: number;
            status: import("@prisma/client").$Enums.SeatStatus;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
    })[]>;
    create(data: {
        userId: number;
        seatId: number;
        duration: number;
        price: number;
        startTime?: string;
        endTime?: string;
        paymentMethod?: string;
    }): Promise<{
        seat: {
            id: number;
            status: import("@prisma/client").$Enums.SeatStatus;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
    }>;
    updateStatus(id: number, status: BookingStatus): Promise<{
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
    }>;
}
