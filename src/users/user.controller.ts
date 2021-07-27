import {
  Controller,
  Get,
  Injectable,
  NotFoundException,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from '../shared/dto/user.response';
import { RequestError } from '../shared/errors/RequestError';
import { User } from './domain/user';
import { UserService } from './user.service';

interface IdRequest {
  userId: string;
}

interface ProfileRequest {
  user: IdRequest;
}

@Injectable()
@ApiBearerAuth()
@Controller('profile')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({
    description: 'Current logged user data',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'The user requested was not found',
    type: RequestError,
  })
  @ApiUnauthorizedResponse({
    description: 'The user does not have access to the profile',
    type: RequestError,
  })
  async getProfile(@Req() req: ProfileRequest): Promise<User> {
    const user = await this.userService.getUserProfile(req.user.userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
