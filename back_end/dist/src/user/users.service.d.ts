import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
    }[]>;
    findOne(id: number): import("@prisma/client").Prisma.Prisma__UserClient<({
        bookings: ({
            seat: {
                id: number;
                createdAt: Date;
                status: string;
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
        })[];
    } & {
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, data: any): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
