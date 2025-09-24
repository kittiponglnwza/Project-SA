import { SeatsService } from './seats.service';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(body: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    bookSeat(id: number): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }>;
    releaseSeat(id: number): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }>;
}
