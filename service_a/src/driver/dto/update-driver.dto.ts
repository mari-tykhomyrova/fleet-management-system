import { IsOptional } from 'class-validator';
import { CreateDriverDto } from './create-driver.dto';

export class UpdateDriverDto extends CreateDriverDto {
  @IsOptional()
  firstName: string;
}
