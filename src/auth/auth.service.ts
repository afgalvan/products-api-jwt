import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../users/user.service';
import { UserResponse } from './../users/response/user.response';
import { LoginUser } from './request/login.request';

export interface Session {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    readonly userService: UserService,
  ) {}

  async validateUser(
    usernameOrEmail: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.userService.getUserByNameOrEmail(usernameOrEmail);
    console.log(user);
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...response } = user;
      return response;
    }

    return null;
  }

  async login(user: LoginUser): Promise<Session> {
    const payload = { username: user.usernameOrEmail };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
