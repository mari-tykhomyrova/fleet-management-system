import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Car {
  @Prop({ required: true, unique: true, type: String })
  carId: string;

  @Prop({ type: String })
  driverId: string;

  @Prop({ required: true, type: String })
  company: string;

  @Prop({ required: true, type: String })
  model: string;

  @Prop({ required: true, type: Number })
  createdAt: number;

  @Prop({ required: true, type: Number })
  updatedAt: number;

  @Prop({ type: Number })
  deletedAt: number;
}

export const CarSchema = SchemaFactory.createForClass(Car);
