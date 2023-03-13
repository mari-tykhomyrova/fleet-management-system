import { IsNumber } from 'class-validator';

export class GetCarsDto {
  @IsNumber()
  limit = 25;

  @IsNumber()
  skip = 0;
}
