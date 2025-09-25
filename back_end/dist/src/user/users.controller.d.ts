import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<({
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
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        email: string;
        name: string;
        password: string;
        role: string;
        createdAt: Date;
        id: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
