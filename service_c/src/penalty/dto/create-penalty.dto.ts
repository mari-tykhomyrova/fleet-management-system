import { IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreatePenaltyDto {
  @IsUUID()
  @IsNotEmpty()
  carId: string;

  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  numberOfPoints: number;
}
