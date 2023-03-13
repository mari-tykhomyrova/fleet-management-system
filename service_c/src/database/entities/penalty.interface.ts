import { Document } from 'mongoose';

export interface IPenalty extends Document {
  readonly penaltyId: string;
  readonly driverId: string;
  readonly numberOfPoints: number;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}
