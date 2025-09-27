import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto): Promise<{
        items: ({
            menu: {
                id: number;
                price: number;
                name: string;
                category: string;
                description: string | null;
                image: string | null;
                rating: number;
                hasPromo: boolean;
                hasHappyHour: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        })[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    }>;
    findAll(): Promise<({
        seat: {
            status: import("@prisma/client").$Enums.SeatStatus;
            id: number;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        } | null;
        user: {
            id: number;
            name: string;
            createdAt: Date;
            email: string;
            password: string;
            role: string;
        } | null;
        items: ({
            menu: {
                id: number;
                price: number;
                name: string;
                category: string;
                description: string | null;
                image: string | null;
                rating: number;
                hasPromo: boolean;
                hasHappyHour: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        })[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    })[]>;
    findOne(id: number): Promise<({
        seat: {
            status: import("@prisma/client").$Enums.SeatStatus;
            id: number;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        } | null;
        user: {
            id: number;
            name: string;
            createdAt: Date;
            email: string;
            password: string;
            role: string;
        } | null;
        items: ({
            menu: {
                id: number;
                price: number;
                name: string;
                category: string;
                description: string | null;
                image: string | null;
                rating: number;
                hasPromo: boolean;
                hasHappyHour: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        })[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    }) | null>;
    findByUser(userId: number): Promise<({
        seat: {
            status: import("@prisma/client").$Enums.SeatStatus;
            id: number;
            createdAt: Date;
            zone: string;
            type: string;
            updatedAt: Date;
        } | null;
        items: ({
            menu: {
                id: number;
                price: number;
                name: string;
                category: string;
                description: string | null;
                image: string | null;
                rating: number;
                hasPromo: boolean;
                hasHappyHour: boolean;
                createdAt: Date;
            };
        } & {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        })[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    })[]>;
    update(id: number, dto: UpdateOrderDto): Promise<{
        items: {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        }[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    }>;
    remove(id: number): Promise<{
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    }>;
    updateStatus(id: number, status: OrderStatus): Promise<{
        user: {
            id: number;
            name: string;
            createdAt: Date;
            email: string;
            password: string;
            role: string;
        } | null;
        items: {
            id: number;
            quantity: number;
            price: number;
            menuId: number;
            orderId: number;
        }[];
    } & {
        orderNumber: string;
        customerName: string;
        status: import("@prisma/client").$Enums.OrderStatus;
        total: number;
        notes: string | null;
        paymentMethod: string;
        orderDate: Date;
        id: number;
        seatId: number | null;
        userId: number | null;
    }>;
}
