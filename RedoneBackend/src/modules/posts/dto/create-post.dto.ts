// post/dto/create-post.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsString()
  image?: string;

  @IsString()
  video?: string;
}

