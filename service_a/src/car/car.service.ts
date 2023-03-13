import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { ICar } from '../database/entities/car.interface';
import { Car } from '../database/entities/car.schema';
import { Driver } from '../database/entities/driver.schema';
import { IDriver } from '../database/entities/driver.interface';

import { UpdateCarDto } from './dto/update-car.dto';
import { GetCarsDto } from './dto/get-cars.dto';
import { CreateCarDto } from './dto/create-car.dto';

import { getGreenwichTime } from '../utils/helpers';

@Injectable()
export class CarService {
  constructor(
    @InjectModel(Car.name)
    private carModel: Model<ICar>,
    @InjectModel(Driver.name)
    private driverModel: Model<IDriver>,
  ) {}

  async getCar(id: string): Promise<ICar | null> {
    return this.carModel.findOne({ carId: id });
  }

  async getCars(data: GetCarsDto): Promise<ICar[]> {
    return this.carModel.find(
      { deletedAt: null },
      {},
      { skip: data.skip, limit: data.limit },
    );
  }

  async createCar(data: CreateCarDto): Promise<ICar[]> {
    return this.carModel.create([
      {
        ...data,
        carId: uuidv4(),
        createdAt: getGreenwichTime(),
        updatedAt: getGreenwichTime(),
      },
    ]);
  }

  async updateCar(
    id: string,
    data: UpdateCarDto,
  ): Promise<UpdateWriteOpResult> {
    if (data.driverId) {
      await this.__validateDriver(data.driverId);
    }

    return this.carModel.updateOne(
      { carId: id },
      {
        ...data,
        updatedAt: getGreenwichTime(),
      },
    );
  }

  private async __validateDriver(driverId: string): Promise<void> {
    const isDriverExists = await this.driverModel.exists({ driverId });

    if (!isDriverExists) {
      throw new NotFoundException('Driver was not found');
    }
  }

  async deleteCar(id: string): Promise<UpdateWriteOpResult> {
    return this.carModel.updateOne(
      { carId: id },
      { deletedAt: getGreenwichTime() },
    );
  }
}
