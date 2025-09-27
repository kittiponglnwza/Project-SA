declare class OrderItemDto {
    menuId: number;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    userId: number;
    seatId?: number;
    customerName: string;
    paymentMethod: string;
    total: number;
    notes?: string;
    items: OrderItemDto[];
}
export {};
