import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Driver } from '../database/entities/driver.schema';
import { IDriver } from '../database/entities/driver.interface';

import { GetDriversDto } from './dto/get-drivers.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

import { getGreenwichTime } from '../utils/helpers';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name)
    private driverModel: Model<IDriver>,
  ) {}

  async getDriver(id: string): Promise<IDriver | null> {
    return this.driverModel.findOne({ driverId: id });
  }

  async getDrivers(data: GetDriversDto): Promise<IDriver[]> {
    return this.driverModel.find(
      { deletedAt: null },
      {},
      { skip: data.skip, limit: data.limit },
    );
  }

  async createDriver(data: CreateDriverDto): Promise<IDriver[]> {
    return this.driverModel.create([
      {
        ...data,
        driverId: uuidv4(),
        createdAt: getGreenwichTime(),
        updatedAt: getGreenwichTime(),
      },
    ]);
  }

  async updateDriver(
    id: string,
    data: UpdateDriverDto,
  ): Promise<UpdateWriteOpResult> {
    return this.driverModel.updateOne(
      { driverId: id },
      {
        ...data,
        updatedAt: getGreenwichTime(),
      },
    );
  }

  async deleteDriver(id: string): Promise<UpdateWriteOpResult> {
    return this.driverModel.updateOne(
      { driverId: id },
      { deletedAt: getGreenwichTime() },
    );
  }
}
