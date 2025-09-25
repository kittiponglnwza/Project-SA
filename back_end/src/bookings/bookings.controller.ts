import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingStatus } from '@prisma/client';


@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.bookingsService.findByUser(Number(userId));
  }

  @Post()
  create(
    @Body()
    body: {
      userId: number;
      seatId: number;
      duration: number;
      price: number;
      startTime?: string;
      endTime?: string;
      paymentMethod?: string;
    }
  ) {
    return this.bookingsService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: BookingStatus }, // ✅ ใช้ enum
  ) {
    return this.bookingsService.updateStatus(Number(id), body.status);
  }
}

