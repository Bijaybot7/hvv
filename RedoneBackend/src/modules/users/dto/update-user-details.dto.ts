import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDetailsDto {
  @IsOptional()
  @IsString()
  contact?: string;

  @IsOptional()
  @IsString()
  genre?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
