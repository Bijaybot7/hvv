// application/dto/create-application.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  bandId: string;

  @IsNotEmpty()
  @IsString()
  vaccancyId: string;
}
