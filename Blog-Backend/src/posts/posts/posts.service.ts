import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post, PostDocument } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<PostDocument>) {}

  async createPost(input: CreatePostDto, authorId?: string) {
    const created = new this.postModel({ ...input, authorId });
    return created.save();
  }

  async findAllPosts() {
    return this.postModel.find().sort({ createdAt: -1 }).lean();
  }

  async findPostById(id: string) {
    const post = await this.postModel.findById(id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }

  async updatePost(id: string, input: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate(id, input, { new: true });
  }

  async removePost(id: string) {
    return this.postModel.findByIdAndDelete(id);
  }
}
