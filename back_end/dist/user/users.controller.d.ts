import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__UserClient<({
        bookingHistory: never;
        foodHistory: never;
    } & {
        id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, body: any): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__UserClient<{
        id: number;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
