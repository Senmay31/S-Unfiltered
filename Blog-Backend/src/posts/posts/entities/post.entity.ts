import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;
  
  @Prop({ required: true })
  content: string;

  @Prop()
  excerpt?: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId : Types.ObjectId;

  @Prop([String])
  tags?: string[];

  @Prop({ default: 0 })
  views?: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);