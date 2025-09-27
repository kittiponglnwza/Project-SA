import { PrismaService } from '../prisma/prisma.service';
import { SeatStatus } from '@prisma/client';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
export declare class SeatsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(data: CreateSeatDto): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: UpdateSeatDto): import("@prisma/client").Prisma.Prisma__SeatClient<{
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
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
}
