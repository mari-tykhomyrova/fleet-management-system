import { Document } from 'mongoose';

export interface ICar extends Document {
  readonly carId: string;
  readonly driverId: string;
  readonly company: string;
  readonly model: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}
