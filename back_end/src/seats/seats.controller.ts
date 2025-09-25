import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatStatus } from '@prisma/client'; // ✅ import enum

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatsService.findOne(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.seatsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.seatsService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatsService.remove(+id);
  }

  // ✅ เปลี่ยนสถานะด้วย enum
  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: SeatStatus, // 👈 ใช้ enum
  ) {
    return this.seatsService.updateStatus(id, status);
  }

  // ✅ ถ้าอยากเก็บ route เดิมไว้ (เช่นจอง/ปล่อยโต๊ะ)
  @Patch(':id/book')
  bookSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, SeatStatus.UNAVAILABLE);
  }

  @Patch(':id/release')
  releaseSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, SeatStatus.AVAILABLE);
  }
}
