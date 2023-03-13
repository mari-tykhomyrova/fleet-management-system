import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '../database/database.module';

import { Penalty, PenaltySchema } from '../database/entities/penalty.schema';
import { PenaltyController } from './penalty.controller';
import { PenaltyService } from './penalty.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: Penalty.name, schema: PenaltySchema }]),
  ],
  controllers: [PenaltyController],
  providers: [PenaltyService],
  exports: [PenaltyService],
})
export class PenaltyModule {}
