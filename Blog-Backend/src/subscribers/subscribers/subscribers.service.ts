import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscriber, SubscriberDocument } from './entities/subscriber.entity';


@Injectable()
export class SubscribersService {
  constructor(@InjectModel(Subscriber.name) private subModel: Model<SubscriberDocument>) {}

  async subscribe(email: string) {
    const existingUser = await this.subModel.findOne({ email });
    if (existingUser) throw new BadRequestException('User already subscribed!');
    return new this.subModel({ email }).save();
  }

  findAllSubscribers() {
    return this.subModel.find();
  }
}