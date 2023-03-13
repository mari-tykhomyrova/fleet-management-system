import { Document } from 'mongoose';

export interface ITrip extends Document {
  readonly tripId: string;
  readonly start: string;
  readonly destination: string;
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
}
