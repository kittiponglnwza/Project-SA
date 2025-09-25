import { SeatsService } from './seats.service';
import { SeatStatus } from '@prisma/client';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(body: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: number, status: SeatStatus): Promise<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    bookSeat(id: number): Promise<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
    releaseSeat(id: number): Promise<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
