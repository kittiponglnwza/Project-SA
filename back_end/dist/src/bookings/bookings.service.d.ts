import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus } from '@prisma/client';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
    private updateExpiredBookings;
    findAll(): Promise<({
        seat: {
            createdAt: Date;
            id: number;
            zone: string;
            type: string;
            status: import("@prisma/client").$Enums.SeatStatus;
            updatedAt: Date;
        };
        user: {
            email: string;
            name: string;
            password: string;
            role: string;
            createdAt: Date;
            id: number;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
        userId: number;
    })[]>;
    findByUser(userId: number): Promise<({
        seat: {
            createdAt: Date;
            id: number;
            zone: string;
            type: string;
            status: import("@prisma/client").$Enums.SeatStatus;
            updatedAt: Date;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
        userId: number;
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
            createdAt: Date;
            id: number;
            zone: string;
            type: string;
            status: import("@prisma/client").$Enums.SeatStatus;
            updatedAt: Date;
        };
    } & {
        id: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
        userId: number;
    }>;
    updateStatus(id: number, status: BookingStatus): Promise<{
        id: number;
        status: import("@prisma/client").$Enums.BookingStatus;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        startTime: Date | null;
        endTime: Date | null;
        paymentMethod: string | null;
        userId: number;
    }>;
}
