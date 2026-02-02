import { Controller, Post as PostRoute, Body, Get, Param, Delete } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @PostRoute()
  createComment(@Body() input: CreateCommentDto) {
    return this.commentsService.createComment(input);
  }

  @Get('post/:postId')
  getCommentByPost(@Param('postId') postId: string) {
    return this.commentsService.findByPost(postId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentsService.removeComment(id);
  }
}