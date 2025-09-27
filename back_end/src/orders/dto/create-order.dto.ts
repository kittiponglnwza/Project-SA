// src/order/dto/create-order.dto.ts
import { IsInt, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsInt()
  menuId: number;

  @IsInt()
  quantity: number;

  @IsInt()
  price: number;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsOptional()
  seatId?: number;

  @IsString()
  customerName: string;

  @IsString()
  paymentMethod: string;

  @IsInt()
  total: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
