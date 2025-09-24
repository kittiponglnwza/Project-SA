import { Controller, Get, Post, Put, Delete, Param, Body, Patch, ParseIntPipe } from '@nestjs/common';

import { SeatsService } from './seats.service';

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
  @Patch(':id/book')
    bookSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, 'ไม่ว่าง'); // หรือ 'occupied'
  }

  @Patch(':id/release')
    releaseSeat(@Param('id', ParseIntPipe) id: number) {
    return this.seatsService.updateStatus(id, 'ว่าง'); // หรือ 'available'
  }
}
