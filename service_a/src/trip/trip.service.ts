import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Trip } from '../database/entities/trip.schema';
import { ITrip } from '../database/entities/trip.interface';

import { GetTripsDto } from './dto/get-trips.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

import { getGreenwichTime } from '../utils/helpers';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: Model<ITrip>,
  ) {}

  async getTrip(id: string): Promise<ITrip | null> {
    return this.tripModel.findOne({ tripId: id });
  }

  async getTrips(data: GetTripsDto): Promise<ITrip[]> {
    return this.tripModel.find(
      { deletedAt: null },
      {},
      { skip: data.skip, limit: data.limit },
    );
  }

  async createTrip(data: CreateTripDto): Promise<ITrip[]> {
    return this.tripModel.create([
      {
        ...data,
        tripId: uuidv4(),
        createdAt: getGreenwichTime(),
        updatedAt: getGreenwichTime(),
      },
    ]);
  }

  async updateTrip(
    id: string,
    data: UpdateTripDto,
  ): Promise<UpdateWriteOpResult> {
    return this.tripModel.updateOne(
      { tripId: id },
      {
        ...data,
        updatedAt: getGreenwichTime(),
      },
    );
  }

  async deleteTrip(id: string): Promise<UpdateWriteOpResult> {
    return this.tripModel.updateOne(
      { tripId: id },
      { deletedAt: getGreenwichTime() },
    );
  }
}
