import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatStatus } from '@prisma/client';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get()
  findAll() {
    return this.seatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateSeatDto) {
    return this.seatsService.create(body);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSeatDto,
  ) {
    return this.seatsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.remove(id);
  }

  // ✅ เปลี่ยนสถานะที่นั่ง
  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: SeatStatus,
  ) {
    return this.seatsService.updateStatus(id, status);
  }

  // ✅ ทางลัด: จอง (set UNAVAILABLE)
  @Patch(':id/book')
  bookSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, SeatStatus.UNAVAILABLE);
  }

  // ✅ ทางลัด: ปล่อย (set AVAILABLE)
  @Patch(':id/release')
  releaseSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, SeatStatus.AVAILABLE);
  }
}
