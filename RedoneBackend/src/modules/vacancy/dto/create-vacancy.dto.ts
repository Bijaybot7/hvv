import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateVacancyDto {
  @IsNotEmpty()
  @IsString()
  bandName: string;
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  experience: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
