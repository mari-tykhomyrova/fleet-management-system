import { Document } from 'mongoose';

export interface IDriver extends Document {
  readonly driverId: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly driverLicense: number;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}
