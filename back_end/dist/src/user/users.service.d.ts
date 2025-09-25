import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__UserClient<({
        bookings: ({
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
        })[];
    } & {
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
