import { BookingsService } from './bookings.service';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
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
            status: string;
            createdAt: Date;
            zone: string;
            type: string;
            condition: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: string;
        startTime: string | null;
        endTime: string | null;
        paymentMethod: string | null;
    })[]>;
    findByUser(userId: string): Promise<({
        seat: {
            id: number;
            status: string;
            createdAt: Date;
            zone: string;
            type: string;
            condition: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: string;
        startTime: string | null;
        endTime: string | null;
        paymentMethod: string | null;
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
            id: number;
            status: string;
            createdAt: Date;
            zone: string;
            type: string;
            condition: string;
            updatedAt: Date;
        };
    } & {
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: string;
        startTime: string | null;
        endTime: string | null;
        paymentMethod: string | null;
    }>;
    updateStatus(id: string, body: {
        status: string;
    }): Promise<{
        id: number;
        userId: number;
        seatId: number;
        date: Date;
        duration: number;
        price: number;
        status: string;
        startTime: string | null;
        endTime: string | null;
        paymentMethod: string | null;
    }>;
}
