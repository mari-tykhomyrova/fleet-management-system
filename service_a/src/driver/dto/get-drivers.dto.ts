import { IsNumber } from 'class-validator';

export class GetDriversDto {
  @IsNumber()
  limit = 25;

  @IsNumber()
  skip = 0;
}
