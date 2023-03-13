import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '../database/database.module';
import { PenaltyModule } from '../penalty/penalty.module';
import { MessageHandlerController } from './message-handler.controller';
import { MessageHandlerService } from './message-handler.service';

import { Car, CarSchema } from '../database/entities/car.schema';
import { Driver, DriverSchema } from '../database/entities/driver.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
    PenaltyModule,
  ],
  controllers: [MessageHandlerController],
  providers: [MessageHandlerService],
  exports: [MessageHandlerService],
})
export class MessageHandlerModule {}
