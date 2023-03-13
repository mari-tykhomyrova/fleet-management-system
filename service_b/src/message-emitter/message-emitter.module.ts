import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DatabaseModule } from '../database/database.module';
import { MessageEmitterService } from './message-emitter.service';

import { Car, CarSchema } from '../database/entities/car.schema';
import { Driver, DriverSchema } from '../database/entities/driver.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: Driver.name, schema: DriverSchema },
    ]),
    ClientsModule.register([
      {
        name: 'SERVICE_B',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pass@localhost:5672'],
          queue: 'fleet_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [],
  providers: [MessageEmitterService],
  exports: [MessageEmitterService],
})
export class MessageEmitterModule {}
