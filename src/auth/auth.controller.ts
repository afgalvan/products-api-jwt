import {
  BadRequestException,
  Body,
  Controller,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { RequestError } from '../shared/errors/RequestError';
import { AuthService, Token } from './auth.service';
import { LoginUser } from './dto/login.request';
import { CreateUser } from './dto/signup.request';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
@Injectable()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiCreatedResponse({
    description: 'Register a user',
    type: Token,
  })
  @ApiBadRequestResponse({
    description: 'User credentials are incomplete or already exists',
    type: RequestError,
  })
  async signup(@Body() user: CreateUser): Promise<Token> {
    if (!user.email || !user.password || !user.username) {
      throw new BadRequestException(
        'An email, username, and password are required',
      );
    }
    const response = await this.authService.signup(user);
    if (!response) {
      throw new BadRequestException('Username or email already in use');
    }

    return response;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({
    description: 'Log in a user',
    type: Token,
  })
  @ApiBadRequestResponse({
    description: 'User credentials are incomplete',
    type: RequestError,
  })
  async login(@Body() user: LoginUser): Promise<Token> {
    if (!user.usernameOrEmail || !user.password) {
      throw new BadRequestException(
        'An email or username, and a password are required',
      );
    }
    return this.authService.login(user);
  }
}
