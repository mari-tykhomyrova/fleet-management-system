import { IsNumber } from 'class-validator';

export class GetTripsDto {
  @IsNumber()
  limit = 25;

  @IsNumber()
  skip = 0;
}
