import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '../database/database.module';
import { Trip, TripSchema } from '../database/entities/trip.schema';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
