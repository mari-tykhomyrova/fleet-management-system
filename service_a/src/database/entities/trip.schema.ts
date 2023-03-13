import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Trip {
  @Prop({ required: true, unique: true, type: String })
  tripId: string;

  @Prop({ type: String })
  start: string;

  @Prop({ type: String })
  destination: string;

  @Prop({ required: true, type: Number })
  createdAt: number;

  @Prop({ required: true, type: Number })
  updatedAt: number;

  @Prop({ type: Number })
  deletedAt: number;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
