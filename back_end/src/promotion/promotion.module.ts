import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
  exports: [PromotionService],
})
export class PromotionModule {}
