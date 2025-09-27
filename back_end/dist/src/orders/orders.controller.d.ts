import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderStatus } from '@prisma/client';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
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
    findOne(id: string): Promise<({
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
    findByUser(userId: string): Promise<({
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
    update(id: string, dto: UpdateOrderDto): Promise<{
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
    remove(id: string): Promise<{
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
    updateStatus(id: string, status: OrderStatus): Promise<{
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
