import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Penalty } from '../database/entities/penalty.schema';
import { IPenalty } from '../database/entities/penalty.interface';

import { CreatePenaltyDto } from './dto/create-penalty.dto';
import { GetPenaltiesDto } from './dto/get-penalties.dto';

import { getGreenwichTime } from '../utils/helpers';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectModel(Penalty.name) private penaltyModel: Model<IPenalty>,
  ) {}

  async getPenalties(data: GetPenaltiesDto): Promise<IPenalty[]> {
    const filterObj: FilterQuery<Penalty> = { deletedAt: null };
    if (data.driverId) {
      filterObj.driverId = data.driverId;
    }
    if (data.carId) {
      filterObj.carId = data.carId;
    }

    return this.penaltyModel.find(
      filterObj,
      {},
      { skip: data.skip, limit: data.limit },
    );
  }

  async createPenalty(data: CreatePenaltyDto): Promise<IPenalty[]> {
    return this.penaltyModel.create([
      {
        ...data,
        penaltyId: uuidv4(),
        createdAt: getGreenwichTime(),
        updatedAt: getGreenwichTime(),
      },
    ]);
  }
}
