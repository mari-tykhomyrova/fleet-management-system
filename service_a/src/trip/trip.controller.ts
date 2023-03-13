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

import { TripService } from './trip.service';
import { ITrip } from '../database/entities/trip.interface';

import { GetTripsDto } from './dto/get-trips.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get(':id')
  getTrip(@Param('id', ParseUUIDPipe) id: string): Promise<ITrip | null> {
    return this.tripService.getTrip(id);
  }

  @Get()
  getTrips(@Query() data: GetTripsDto): Promise<ITrip[]> {
    return this.tripService.getTrips(data);
  }

  @Post()
  createTrip(@Body() data: CreateTripDto): Promise<ITrip[]> {
    return this.tripService.createTrip(data);
  }

  @Patch(':id')
  updateTrip(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateTripDto,
  ): Promise<UpdateWriteOpResult> {
    return this.tripService.updateTrip(id, data);
  }

  @Delete(':id')
  deleteTrip(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UpdateWriteOpResult> {
    return this.tripService.deleteTrip(id);
  }
}
