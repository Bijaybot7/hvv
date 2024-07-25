import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}