import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';

import { CarService } from './car.service';
import { ICar } from '../database/entities/car.interface';

import { GetCarsDto } from './dto/get-cars.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get(':id')
  getCar(@Param('id', ParseUUIDPipe) id: string): Promise<ICar | null> {
    return this.carService.getCar(id);
  }

  @Get()
  getCars(@Query() data: GetCarsDto): Promise<ICar[]> {
    return this.carService.getCars(data);
  }

  @Post()
  createCar(@Body() data: CreateCarDto): Promise<ICar[]> {
    return this.carService.createCar(data);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateCarDto,
  ): Promise<UpdateWriteOpResult> {
    return this.carService.updateCar(id, data);
  }

  @Delete(':id')
  deleteCar(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UpdateWriteOpResult> {
    return this.carService.deleteCar(id);
  }
}
