import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Driver {
  @Prop({ required: true, unique: true, type: String })
  driverId: string;

  @Prop({ required: true, type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: Number })
  driverLicense: number;

  @Prop({ required: true, type: Number })
  createdAt: number;

  @Prop({ required: true, type: Number })
  updatedAt: number;

  @Prop({ type: Number })
  deletedAt: number;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
