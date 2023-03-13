import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MessageHandlerModule } from './message-handler/message-handler.module';
import { PenaltyModule } from './penalty/penalty.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,

    MessageHandlerModule,
    PenaltyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
