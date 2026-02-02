import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from 'src/common/enums/role.enums';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  // @Prop({ type: Types.ObjectId, required: true, unique: true })
  _id: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({type: String, enum: UserRole, defaultValue: UserRole.USER })
  role: UserRole;

  @Prop({ default: 'local' })
  provider: string;

  @Prop({type: String})
  hashedRefreshToken: string;
  
  @Prop({ type: Boolean, default: false })
  isLoggedIn: boolean;

  @Prop()
  name?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
