import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(input: CreateUserDto) {
    const user = new this.userModel(input);
    return user.save();
  }

  async findById(userId: string) {
    return await this.userModel.findById(userId).select('-password').exec();
  }

  async findAllUsers() {
    return await this.userModel.find().select('-password').exec();
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findUserById(userId: string): Promise<UserDocument> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new NotFoundException('Invalid user ID');
    }
    const user = await this.userModel.findById(userId).select('-password');
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateUser(userId: string, input: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { new: true },
      {
        ...input,
      },
    );
    return updatedUser;
  }

  async clearUserSession(userId: string) {
    await this.userModel.updateOne(
      { _id: userId },
      {
        isLoggedIn: false,
        hashedRefreshToken: null,
      },
    );
    return { userId };
  }

  async clearAllUserSessions(): Promise<number> {
    const updatedUsers = await this.userModel.updateMany(
      {},
      {
        isLoggedIn: false,
        hashedRefreshToken: null,
      },
    );
    return updatedUsers.modifiedCount;
  }

  // async clearRefreshToken(userId: string) {
  //   const loggedOutUser = await this.userModel.findByIdAndUpdate(userId, {
  //     $unset: { hashedRefreshToken: null },
  //     isLoggedIn: false,
  //   });
  //   return { userId: loggedOutUser?._id.toString() };
  // }
}
