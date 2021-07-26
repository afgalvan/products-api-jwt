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
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from '../shared/dto/user.response';
import { RequestError } from '../shared/errors/RequestError';
import { User } from './entities/user.entity';
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
  @ApiCreatedResponse({
    description: 'Current logged user data',
    type: UserResponse,
  })
  @ApiNotFoundResponse({
    description: 'The user requested was not found',
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
