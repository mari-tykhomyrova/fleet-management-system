import { IsOptional, IsNumber, IsUUID } from 'class-validator';

export class GetPenaltiesDto {
  @IsNumber()
  limit = 25;

  @IsNumber()
  skip = 0;

  @IsUUID()
  @IsOptional()
  driverId: string;

  @IsUUID()
  @IsOptional()
  carId: string;
}
