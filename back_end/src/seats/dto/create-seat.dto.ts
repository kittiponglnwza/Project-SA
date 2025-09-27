import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SeatStatus } from '@prisma/client';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsEnum(SeatStatus)
  status: SeatStatus;
}
