import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe implements PipeTransform<string> {
  transform(value: string) {
    const id = value.trim();

    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Mongo ObjectId');
    }

    return id;
  }
}