import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { MenusService } from './menu.service';
import { Menu } from '@prisma/client';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Get()
  async findAll(): Promise<Menu[]> {
    return this.menusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Menu | null> {
    return this.menusService.findOne(id);
  }

  @Post()
  async create(@Body() data: any): Promise<Menu> {
    return this.menusService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<Menu>,
  ): Promise<Menu> {
    return this.menusService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<Menu> {
    return this.menusService.remove(id);
  }
}
