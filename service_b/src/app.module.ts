import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MessageEmitterModule } from './message-emitter/message-emitter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ScheduleModule.forRoot(),

    MessageEmitterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
