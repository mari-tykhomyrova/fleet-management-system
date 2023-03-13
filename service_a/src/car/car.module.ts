import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '../database/database.module';
import { CarController } from './car.controller';
import { CarService } from './car.service';

import { Car, CarSchema } from '../database/entities/car.schema';
import { Driver, DriverSchema } from '../database/entities/driver.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
