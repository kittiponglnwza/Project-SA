import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { ScheduleModule } from '@nestjs/schedule';
import { MenusModule } from './menu/menu.module';
import { PromotionModule } from './promotion/promotion.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule,UsersModule,SeatsModule,BookingsModule,ScheduleModule.forRoot(),MenusModule,PromotionModule,OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
