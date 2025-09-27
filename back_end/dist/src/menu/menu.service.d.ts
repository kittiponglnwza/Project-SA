import { PrismaService } from '../prisma/prisma.service';
import { Menu } from '@prisma/client';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<Menu[]>;
    findOne(id: number): Promise<Menu | null>;
    create(data: {
        name: string;
        price: number;
        category: string;
        description?: string;
        image?: string;
        rating?: number;
        hasPromo?: boolean;
        hasHappyHour?: boolean;
    }): Promise<Menu>;
    update(id: number, data: Partial<Menu>): Promise<Menu>;
    remove(id: number): Promise<Menu>;
}
