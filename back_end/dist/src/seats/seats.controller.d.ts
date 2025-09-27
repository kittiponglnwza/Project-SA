import { SeatsService } from './seats.service';
import { SeatStatus } from '@prisma/client';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
export declare class SeatsController {
    private readonly seatsService;
    constructor(seatsService: SeatsService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    create(body: CreateSeatDto): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, body: UpdateSeatDto): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__SeatClient<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: number, status: SeatStatus): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }>;
    bookSeat(id: number): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }>;
    releaseSeat(id: number): Promise<{
        createdAt: Date;
        id: number;
        zone: string;
        type: string;
        status: import("@prisma/client").$Enums.SeatStatus;
        updatedAt: Date;
    }>;
}
