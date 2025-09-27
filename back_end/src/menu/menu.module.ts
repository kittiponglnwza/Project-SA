import { Module } from '@nestjs/common';
import { MenusService } from './menu.service';
import { MenusController } from './menu.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MenusController],
  providers: [MenusService, PrismaService],
})
export class MenusModule {}
