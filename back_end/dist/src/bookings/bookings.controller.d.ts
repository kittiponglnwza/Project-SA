import { BookingsService } from './bookings.service';
import { BookingStatus } from '@prisma/client';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
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
    findByUser(userId: string): Promise<({
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
    create(body: {
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
    updateStatus(id: string, body: {
        status: BookingStatus;
    }): Promise<{
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
