import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    constructor(prisma: PrismaService);
    register(email: string, name: string, password: string): Promise<{
        message: string;
        token: string;
        isAdmin: boolean;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
    login(email: string, password: string): Promise<{
        message: string;
        token: string;
        isAdmin: boolean;
        user: {
            id: number;
            name: string;
            email: string;
        };
    }>;
}
