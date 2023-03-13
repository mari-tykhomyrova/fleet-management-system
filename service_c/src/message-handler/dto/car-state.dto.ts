import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CarStateDto {
  @IsUUID()
  @IsNotEmpty()
  carId: string;

  @IsUUID()
  @IsNotEmpty()
  driverId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  lat: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(-180)
  @Max(180)
  lng: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  speed: number;
}
