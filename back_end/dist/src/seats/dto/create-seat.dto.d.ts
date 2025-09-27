import { SeatStatus } from '@prisma/client';
export declare class CreateSeatDto {
    zone: string;
    type: string;
    status: SeatStatus;
}
