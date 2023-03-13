import {IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString} from 'class-validator';

export class CreateDriverDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  driverLicense: number;
}
