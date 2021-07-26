import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiProperty } from '@nestjs/swagger';
import bcrypt from 'bcrypt';

import { UserResponse } from '../shared/dto/user.response';
import { UserService } from '../users/user.service';
import { LoginUser } from './dto/login.request';
import { CreateUser } from './dto/signup.request';

export interface Token {
  token: string;
}

export class Token implements Token {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzpXVCJ9.eyJpZCI6I.SUHwia5WwlcoNOkmG8uiJTBiXA',
  })
  token!: string;
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
    if (user && bcrypt.compare(user.password, password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...response } = user;
      return response;
    }

    return null;
  }

  generateToken(id?: string): Token {
    const payload = { id: id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async login(user: LoginUser): Promise<Token> {
    const foundUser = await this.userService.getUserByNameOrEmail(
      user.usernameOrEmail,
    );
    return this.generateToken(foundUser?._id);
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async signup(user: CreateUser): Promise<Token | null> {
    user.password = await this.encryptPassword(user.password);
    const savedUser = await this.userService.saveUser(user);
    if (!savedUser) {
      return null;
    }

    return this.generateToken(savedUser._id);
  }
}
