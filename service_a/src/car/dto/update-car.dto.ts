import { IsOptional, IsUUID } from 'class-validator';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends CreateCarDto {
  @IsOptional()
  company: string;

  @IsOptional()
  model: string;

  @IsUUID()
  @IsOptional()
  driverId: string;
}
