import { PrismaService } from '../prisma/prisma.service';
export declare class SeatsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(data: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: number, status: string): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: string;
        condition: string;
        updatedAt: Date;
    }>;
}
