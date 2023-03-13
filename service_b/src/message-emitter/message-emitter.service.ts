import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { take, catchError } from 'rxjs/operators';

import { Car } from '../database/entities/car.schema';
import { ICar } from '../database/entities/car.interface';
import { Driver } from '../database/entities/driver.schema';
import { IDriver } from '../database/entities/driver.interface';
import { ICarState } from '../database/entities/car-state.interface';

@Injectable()
export class MessageEmitterService {
  constructor(
    @InjectModel(Car.name) private carModel: Model<ICar>,
    @InjectModel(Driver.name) private driverModel: Model<IDriver>,
    @Inject('SERVICE_B') private client: ClientProxy,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async emitRandomCarState(): Promise<void> {
    const randomCarState = await this.__generateRandomCarState();
    const record = new RmqRecordBuilder(randomCarState).build();

    this.client
      .send('car_state', record)
      .pipe(
        catchError((err, caught) => caught),
        take(1),
      )
      .subscribe();
  }

  private async __generateRandomCarState(): Promise<ICarState> {
    const randomCar = await this.__getRandomCar();
    if (!randomCar) {
      this.client.emit('car_state', null);
    }

    return {
      carId: randomCar.carId,
      lat: this.__generateRandomLatLng(),
      lng: this.__generateRandomLatLng(),
      speed: this.__generateRandomSpeed(),
      driverId: randomCar.driverId || (await this.__getRandomDriverId()),
    };
  }

  private async __getRandomCar(): Promise<ICar | null> {
    const countCars = await this.carModel.count({ deletedAt: null });
    if (!countCars) {
      return null;
    }

    const randomCarIndex = Math.floor(Math.random() * countCars);

    const randomCar = await this.carModel.findOne(
      {},
      {},
      { skip: randomCarIndex },
    );

    if (randomCar) {
      return randomCar;
    }
    return null;
  }

  private async __getRandomDriverId(): Promise<string | null> {
    const countDrivers = await this.driverModel.count({ deletedAt: null });
    if (!countDrivers) {
      return null;
    }

    const randomDriverIndex = Math.floor(Math.random() * countDrivers);

    const randomDriver = await this.driverModel.findOne(
      {},
      {},
      { skip: randomDriverIndex },
    );

    if (randomDriver) {
      return randomDriver.driverId;
    }
    return null;
  }

  private __generateRandomSpeed(): number {
    return Math.floor(Math.random() * 121);
  }

  private __generateRandomLatLng(): number {
    const to = -180;
    const from = 180;

    return Number((Math.random() * (to - from) + from).toFixed(3));
  }
}
