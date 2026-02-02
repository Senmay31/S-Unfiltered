import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
    
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  authorName: string;

  @IsNotEmpty()
  content: string;
}