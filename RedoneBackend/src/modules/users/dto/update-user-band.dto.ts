import { IsOptional, IsString } from 'class-validator';

export class UpdateUserBandDto {
  @IsOptional()
  @IsString()
  band?: string;
}
