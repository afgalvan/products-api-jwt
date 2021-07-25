import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserResponse } from './../users/response/user.response';
import { AuthService, Session } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginUser } from './request/login.request';
import { CreateUser } from './request/signup.request';

@Controller('auth')
@ApiTags('Auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: 'Register a user',
  })
  async signup(@Body() user: CreateUser): Promise<UserResponse> {
    if (!user.email || !user.password || !user.username) {
      throw new BadRequestException(
        'An email, username, and password are required',
      );
    }
    const response = await this.authService.userService.saveUser(user);
    if (!response) {
      throw new BadRequestException('Username Email already in use');
    }

    return { username: response.username, email: response.email };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Log in a user',
  })
  async login(@Body() user: LoginUser): Promise<Session> {
    if (!user.usernameOrEmail || !user.password) {
      throw new BadRequestException(
        'An email or username, and a password are required',
      );
    }
    return this.authService.login(user);
  }
}
