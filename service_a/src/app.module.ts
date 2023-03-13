import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CarModule } from './car/car.module';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,

    CarModule,
    DriverModule,
    TripModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
