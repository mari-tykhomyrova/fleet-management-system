import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Penalty {
  @Prop({ required: true, unique: true, type: String })
  penaltyId: string;

  @Prop({ required: true, type: String })
  driverId: string;

  @Prop({ type: Number })
  numberOfPoints: string;

  @Prop({ required: true, type: Number })
  createdAt: number;

  @Prop({ required: true, type: Number })
  updatedAt: number;

  @Prop({ type: Number })
  deletedAt: number;
}

export const PenaltySchema = SchemaFactory.createForClass(Penalty);
