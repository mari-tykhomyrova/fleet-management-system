import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CarStateDto } from './dto/car-state.dto';
import { CreatePenaltyDto } from '../penalty/dto/create-penalty.dto';

import { Car } from '../database/entities/car.schema';
import { ICar } from '../database/entities/car.interface';
import { Driver } from '../database/entities/driver.schema';
import { IDriver } from '../database/entities/driver.interface';

import { PenaltyService } from '../penalty/penalty.service';

@Injectable()
export class MessageHandlerService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<ICar>,
    @InjectModel(Driver.name) private driverModel: Model<IDriver>,
    private penaltyService: PenaltyService,
  ) {}

  async handleCarState(data: CarStateDto) {
    await this.__validateDriver(data.driverId);
    await this.__validateCar(data.carId);

    const numberOfPenaltyPoints = this.__countNumberOfPenaltyPoints(data.speed);

    const createPenaltyData: CreatePenaltyDto = {
      carId: data.carId,
      driverId: data.driverId,
      numberOfPoints: numberOfPenaltyPoints,
    };
    await this.penaltyService.createPenalty(createPenaltyData);
  }

  private async __validateDriver(driverId: string): Promise<void> {
    const isDriverExists = await this.driverModel.exists({ driverId });

    if (!isDriverExists) {
      throw new NotFoundException('Driver was not found');
    }
  }

  private async __validateCar(carId: string): Promise<void> {
    const isCarExists = await this.carModel.exists({ carId });

    if (!isCarExists) {
      throw new NotFoundException('Car was not found');
    }
  }

  private __countNumberOfPenaltyPoints(speed: number): number {
    // 1 Penalty point is added for every Km over 60Km/h
    // 2 points for over 80Km/h
    // 5 points for over 100Km/h

    const speedForPenalty1 = 60;
    const speedForPenalty2 = 80;
    const speedForPenalty3 = 100;

    const penaltyForSpeed1 = 1;
    const penaltyForSpeed2 = 2;
    const penaltyForSpeed3 = 5;

    let count = 0;

    if (speed > speedForPenalty1 && speed <= speedForPenalty2) {
      count += speed - speedForPenalty1;
    } else if (speed > speedForPenalty2) {
      count += (speedForPenalty2 - speedForPenalty1) * penaltyForSpeed1;
    }

    if (speed > speedForPenalty2 && speed <= speedForPenalty3) {
      count += (speed - speedForPenalty2) * 2;
    } else if (speed > speedForPenalty2) {
      count += (speedForPenalty3 - speedForPenalty2) * penaltyForSpeed2;
    }

    if (speed > speedForPenalty3) {
      count += (speed - speedForPenalty3) * penaltyForSpeed3;
    }

    return count;
  }
}
