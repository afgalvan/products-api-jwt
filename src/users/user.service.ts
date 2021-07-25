import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserByNameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return await this.userModel
      .findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      })
      .exec();
  }

  async saveUser(user: User): Promise<User | null> {
    if (
      await this.userModel.findOne({
        $or: [{ email: user.email }, { username: user.username }],
      })
    ) {
      return null;
    }
    const model = new this.userModel(user);
    return await model.save();
  }
}
