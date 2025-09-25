import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { SeatsModule } from './seats/seats.module';
import { BookingsModule } from './bookings/bookings.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AuthModule,UsersModule,SeatsModule,BookingsModule,ScheduleModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
