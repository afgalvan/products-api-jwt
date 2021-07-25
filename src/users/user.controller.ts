/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Injectable, Req, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponse } from './response/user.response';

@Injectable()
@Controller()
@ApiTags('Users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'Current logged user data',
    type: UserResponse,
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProfile(@Req() req: any): UserResponse {
    return req.user;
  }
}
