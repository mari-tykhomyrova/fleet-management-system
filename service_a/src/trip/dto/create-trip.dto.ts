import { IsOptional, IsString } from 'class-validator';

export class CreateTripDto {
  @IsOptional()
  @IsString()
  start: string;

  @IsString()
  @IsOptional()
  destination: string;
}
