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

import { DriverService } from './driver.service';
import { IDriver } from '../database/entities/driver.interface';

import { GetDriversDto } from './dto/get-drivers.dto';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get(':id')
  getDriver(@Param('id', ParseUUIDPipe) id: string): Promise<IDriver | null> {
    return this.driverService.getDriver(id);
  }

  @Get()
  getDrivers(@Query() data: GetDriversDto): Promise<IDriver[]> {
    return this.driverService.getDrivers(data);
  }

  @Post()
  createDriver(@Body() data: CreateDriverDto): Promise<IDriver[]> {
    return this.driverService.createDriver(data);
  }

  @Patch(':id')
  updateDriver(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateDriverDto,
  ): Promise<UpdateWriteOpResult> {
    return this.driverService.updateDriver(id, data);
  }

  @Delete(':id')
  deleteDriver(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UpdateWriteOpResult> {
    return this.driverService.deleteDriver(id);
  }
}
