import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserResponse } from '../shared/dto/user.response';
import { User } from './domain/user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async getUserByNameOrEmail(usernameOrEmail: string): Promise<User | null> {
    return await this.userModel.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
  }

  async getUserProfile(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId, { password: 0 });
  }
  async saveUser(user: User): Promise<UserResponse | null> {
    if (
      await this.userModel.findOne({
        $or: [{ email: user.email }, { username: user.username }],
      })
    ) {
      return null;
    }
    const model = new this.userModel(user);
    return (await model.save()) as UserResponse;
  }
}
