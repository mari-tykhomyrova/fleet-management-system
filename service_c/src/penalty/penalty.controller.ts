import { Controller, Get, Query } from '@nestjs/common';

import { PenaltyService } from './penalty.service';

import { GetPenaltiesDto } from './dto/get-penalties.dto';

import { IPenalty } from '../database/entities/penalty.interface';

@Controller('penalties')
export class PenaltyController {
  constructor(private penaltyService: PenaltyService) {}

  @Get()
  getCars(@Query() data: GetPenaltiesDto): Promise<IPenalty[]> {
    return this.penaltyService.getPenalties(data);
  }
}
