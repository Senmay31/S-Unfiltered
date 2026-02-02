import { Controller, Get, Post as PostRoute, Body, Param, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';


@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAllPosts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  getOnePost(@Param('id') id: string) {
    return this.postsService.findPostById(id);
  }

  @UseGuards(JwtAuthGuard)
  @PostRoute()
  createPost(@Body() input: CreatePostDto, @Req() req: any) {
    return this.postsService.createPost(input, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePost(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    return this.postsService.updatePost(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postsService.removePost(id);
  }
}
