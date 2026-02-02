import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  createComment(input: CreateCommentDto) {
    const comment = new this.commentModel(input);
    return comment.save();
  }

  findByPost(postId: string) {
    return this.commentModel.find({ postId }).sort({ createdAt: 1 });
  }

  removeComment(id: string) {
    return this.commentModel.findByIdAndDelete(id);
  }
}
