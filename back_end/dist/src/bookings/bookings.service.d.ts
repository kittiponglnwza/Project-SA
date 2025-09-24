import { PrismaService } from 'src/prisma/prisma.service';
export declare class BookingsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findByUser(userId: number): Promise<({
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
    updateStatus(id: number, status: string): Promise<{
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
