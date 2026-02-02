import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriberDocument = Subscriber & Document;

@Schema({ timestamps: true })
export class Subscriber {
  @Prop({ required: true, unique: true })
  email: string;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
